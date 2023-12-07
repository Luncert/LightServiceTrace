package org.luncert.lstrace.config;

import java.io.IOException;
import java.nio.file.Path;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.store.RAMDirectory;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

@Configuration
public class BeanConfig {

  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }

  @Bean
  public Directory luceneDirectory() throws IOException {
//    return FSDirectory.open(Path.of(new ClassPathResource("indexing").getPath()));
    return new RAMDirectory();
  }

  @Bean
  public StandardAnalyzer standardAnalyzer() {
    return new StandardAnalyzer();
  }

  @Bean
  public IndexWriterConfig indexWriterConfig(StandardAnalyzer analyzer) {
    IndexWriterConfig indexWriterConfig = new IndexWriterConfig(analyzer);
    indexWriterConfig.setOpenMode(IndexWriterConfig.OpenMode.CREATE_OR_APPEND);
    return indexWriterConfig;
  }
}
