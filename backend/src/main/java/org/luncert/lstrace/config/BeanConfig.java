package org.luncert.lstrace.config;

import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.RAMDirectory;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }

  @Bean
  public Directory memoryIndex() {
    return new RAMDirectory();
  }

  @Bean
  public IndexWriterConfig indexWriterConfig() {
    StandardAnalyzer analyzer = new StandardAnalyzer();
    return new IndexWriterConfig(analyzer);
  }
}
