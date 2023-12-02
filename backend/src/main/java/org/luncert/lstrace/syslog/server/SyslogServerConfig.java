package org.luncert.lstrace.syslog.server;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SyslogServerConfig {

  private Protocol protocol;

  private String host;

  @Builder.Default
  private int port = 6000;
}
