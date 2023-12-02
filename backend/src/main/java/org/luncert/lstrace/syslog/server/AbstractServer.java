package org.luncert.lstrace.syslog.server;

public abstract class AbstractServer {

  protected final SyslogServerConfig config;

  protected AbstractServer(SyslogServerConfig config) {
    this.config = config;
  }
}
