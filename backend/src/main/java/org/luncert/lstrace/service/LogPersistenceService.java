package org.luncert.lstrace.service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.NumericDocValuesField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.luncert.lstrace.model.GetSyslogResponse;
import org.luncert.lstrace.model.SyslogEvent;
import org.luncert.lstrace.syslog.server.SyslogServerEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogPersistenceService implements ApplicationListener<SyslogServerEvent>, ILogQueryService {

  private final Directory luceneDirectory;
  private final IndexWriterConfig indexWriterConfig;
  private final StandardAnalyzer analyzer;
  private IndexWriter writer;
//  private IndexReader reader;
  private QueryParser queryParser;

  @PostConstruct
  public void init() throws IOException {
    writer = new IndexWriter(luceneDirectory, indexWriterConfig);
    queryParser = new QueryParser("id", analyzer);
  }

  @PreDestroy
  public void destroy() throws IOException {
    writer.close();
  }

  @Override
  public void onApplicationEvent(SyslogServerEvent event) {
    SyslogEvent source = (SyslogEvent) event.getSource();

    Document document = new Document();
    document.add(new NumericDocValuesField("id", 0L));
    document.add(new NumericDocValuesField("facility", source.getFacility()));
    document.add(new NumericDocValuesField("level", source.getLevel()));
    document.add(new NumericDocValuesField("version", source.getVersion()));
    document.add(new NumericDocValuesField("timestamp", source.getTimestamp()));
    whenNotEmpty(source.getHost(), v ->
        document.add(new TextField("host", v, Field.Store.YES)));
    whenNotEmpty(source.getAppName(), v ->
        document.add(new TextField("appName", v, Field.Store.YES)));
    whenNotEmpty(source.getProcId(), v ->
        document.add(new TextField("procId", v, Field.Store.YES)));
    whenNotEmpty(source.getMsgId(), v ->
        document.add(new TextField("msgId", v, Field.Store.YES)));
    whenNotEmpty(source.getStructuredData(), v ->
        document.add(new TextField("structuredData", v, Field.Store.YES)));
    whenNotEmpty(source.getMessage(), v ->
        document.add(new TextField("message", v, Field.Store.YES)));

    try {
      writer.addDocument(document);
      writer.flush();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  private void whenNotEmpty(String value, Consumer<String> then) {
    if (StringUtils.isNotEmpty(value)) {
      then.accept(value);
    }
  }

  @Override
  public List<GetSyslogResponse> search(String queryString) throws IOException, ParseException {
    try (IndexReader reader = DirectoryReader.open(writer)) {
      IndexSearcher searcher = new IndexSearcher(reader);

      TopDocs topDocs = searcher.search(queryParser.parse(queryString), 10);
      List<Document> documents = new ArrayList<>();
      for (ScoreDoc scoreDoc : topDocs.scoreDocs) {
        documents.add(searcher.doc(scoreDoc.doc));
      }

      return documents.stream().map(doc ->
              GetSyslogResponse.builder()
                  .facility(doc.getField("facility").numericValue().intValue())
                  .level(doc.getField("level").numericValue().intValue())
                  .version(doc.getField("version").numericValue().intValue())
                  .timestamp(doc.getField("timestamp").numericValue().intValue())
                  .host(doc.get("host"))
                  .appName(doc.get("appName"))
                  .procId(doc.get("procId"))
                  .msgId(doc.get("msgId"))
                  .structuredData(doc.get("structuredData"))
                  .message(doc.get("message"))
                  .build())
          .collect(Collectors.toList());
    }
  }
}
