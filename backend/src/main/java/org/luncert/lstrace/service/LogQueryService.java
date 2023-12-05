package org.luncert.lstrace.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.luncert.lstrace.model.GetSyslogResponse;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogQueryService {

  private final Directory memoryIndex;

  public List<GetSyslogResponse> search(String inField, String queryString) throws IOException {
    Query query = new QueryParser(inField, analyzer)
        .parse(queryString);

    IndexReader indexReader = DirectoryReader.open(memoryIndex);
    IndexSearcher searcher = new IndexSearcher(indexReader);
    TopDocs topDocs = searcher.search(query, 10);
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
