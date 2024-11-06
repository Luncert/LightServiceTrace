package org.luncert.lstrace.service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.io.IOException;
import java.util.function.Consumer;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.IntPoint;
import org.apache.lucene.document.LongPoint;
import org.apache.lucene.document.NumericDocValuesField;
import org.apache.lucene.document.StoredField;
import org.apache.lucene.document.StringField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.luncert.filtersquery.luceneimpl.LuceneFiltersQueryOrmEngine;
import org.luncert.lstrace.model.GetSyslogResponse;
import org.luncert.lstrace.model.Page;
import org.luncert.lstrace.model.PageImpl;
import org.luncert.lstrace.model.SyslogEvent;
import org.luncert.lstrace.syslog.server.SyslogServerEvent;
import org.modelmapper.ModelMapper;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class LogPersistenceService extends LuceneFiltersQueryOrmEngine<SyslogEvent>
    implements ApplicationListener<SyslogServerEvent>, ILogQueryService {

  private final Directory luceneDirectory;
  private final IndexWriterConfig indexWriterConfig;
  private final ModelMapper modelMapper;
  private IndexWriter writer;

  @PostConstruct
  public void init() throws IOException {
    writer = new IndexWriter(luceneDirectory, indexWriterConfig);
  }

  @PreDestroy
  public void destroy() throws IOException {
    writer.close();
  }

  @Override
  public void onApplicationEvent(SyslogServerEvent event) {
    SyslogEvent source = (SyslogEvent) event.getSource();

    Document document = new Document();
    document.add(new IntPoint("facility", source.getFacility()));
    document.add(new NumericDocValuesField("facility", source.getFacility()));
    document.add(new StoredField("facility", source.getFacility()));

    document.add(new IntPoint("level", source.getLevel()));
    document.add(new NumericDocValuesField("level", source.getLevel()));
    document.add(new StoredField("level", source.getLevel()));

    document.add(new IntPoint("version", source.getVersion()));
    document.add(new NumericDocValuesField("version", source.getVersion()));
    document.add(new StoredField("version", source.getVersion()));

    document.add(new LongPoint("timestamp", source.getTimestamp()));
    document.add(new NumericDocValuesField("timestamp", source.getTimestamp()));
    document.add(new StoredField("timestamp", source.getTimestamp()));

    whenNotEmpty(source.getHost(), v ->
        document.add(new StringField("host", v, Field.Store.YES)));
    whenNotEmpty(source.getAppName(), v ->
        document.add(new StringField("appName", v, Field.Store.YES)));
    whenNotEmpty(source.getProcId(), v ->
        document.add(new StringField("procId", v, Field.Store.YES)));
    whenNotEmpty(source.getMsgId(), v ->
        document.add(new StringField("msgId", v, Field.Store.YES)));
    //whenNotEmpty(source.getStructuredData(), v ->
    //    document.add(new StringField("structuredData", v, Field.Store.YES)));
    whenNotEmpty(source.getMessage(), v ->
        document.add(new StringField("message", v, Field.Store.YES)));

    try {
      writer.addDocument(document);
      writer.flush();
    } catch (IOException e) {
      // release indexes
      releaseOldDocuments(writer);
      try {
        writer.addDocument(document);
        writer.flush();
      } catch (IOException ex) {
        throw new RuntimeException(ex);
      }
    }
  }

  private void releaseOldDocuments(IndexWriter writer) {
    try {
      // drop all index
      destroy();
      init();
      //int toDelete = writer.numDocs() / 3;
      //FiltersQueryBuilderLuceneImpl.ResultImpl result = buildQuery(
      //    "filter by () sort by timestamp asc offset 0 limit " + toDelete, SyslogEvent.class);
      //writer.deleteDocuments(result.getQuery());
      //writer.commit();
      //writer.forceMergeDeletes();
    } catch (IOException e) {
      log.info("failed to release old documents", e);
      throw new RuntimeException(e);
    }
  }

  private void whenNotEmpty(String value, Consumer<String> then) {
    if (StringUtils.isNotEmpty(value)) {
      then.accept(value);
    }
  }

  @Override
  public Page<GetSyslogResponse> search(String query) throws IOException {
    try (IndexReader reader = DirectoryReader.open(writer)) {
      long total = count(reader, query);
      return PageImpl.of(total, search(reader, query).stream()
          .map(item -> modelMapper.map(item, GetSyslogResponse.class))
          .collect(Collectors.toList()));
    }
  }
}
