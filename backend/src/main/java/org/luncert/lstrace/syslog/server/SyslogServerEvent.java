package org.luncert.lstrace.syslog.server;

import org.luncert.lstrace.model.SyslogEvent;
import org.productivity.java.syslog4j.server.SyslogServerEventIF;
import org.springframework.context.ApplicationEvent;

public class SyslogServerEvent extends ApplicationEvent {

  public SyslogServerEvent(SyslogEvent source) {
    super(source);
  }
}
