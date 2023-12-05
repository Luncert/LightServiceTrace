package org.luncert.lstrace.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetSyslogResponse {

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
}
