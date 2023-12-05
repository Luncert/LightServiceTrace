package org.luncert.lstrace.service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.NumericDocValuesField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.luncert.lstrace.model.SyslogEvent;
import org.luncert.lstrace.syslog.server.SyslogServerEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogPersistenceService implements ApplicationListener<SyslogServerEvent> {

  private final Directory memoryIndex;
  private final IndexWriterConfig indexWriterConfig;
  private IndexWriter writter;

  @PostConstruct
  public void init() throws IOException {
    writter = new IndexWriter(memoryIndex, indexWriterConfig);
  }

  @PreDestroy
  public void destory() throws IOException {
    writter.close();
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
    document.add(new TextField("host", source.getHost(), Field.Store.YES));
    document.add(new TextField("appName", source.getHost(), Field.Store.YES));
    document.add(new TextField("procId", source.getHost(), Field.Store.YES));
    document.add(new TextField("msgId", source.getHost(), Field.Store.YES));
    document.add(new TextField("structuredData", source.getHost(), Field.Store.YES));
    document.add(new TextField("message", source.getHost(), Field.Store.YES));

    try {
      writter.addDocument(document);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
