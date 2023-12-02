package org.luncert.lstrace.syslog.rfc5424;

public class Rfc5424SyslogException extends RuntimeException {

  public Rfc5424SyslogException(String message) {
    super(message);
  }

  public Rfc5424SyslogException(Throwable cause) {
    super(cause);
  }
}
