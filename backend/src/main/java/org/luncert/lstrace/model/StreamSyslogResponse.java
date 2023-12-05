package org.luncert.lstrace.model;

import java.util.HashMap;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StreamSyslogResponse {

  private int facility;
  private int level;
  private int version;
  private long timestamp;
  private String host;
  private String appName;
  private String procId;
  private String msgId;
  private String structuredData;
  private String message;
  @Builder.Default
  private Map<String, String> foldedData = new HashMap<>();
}
