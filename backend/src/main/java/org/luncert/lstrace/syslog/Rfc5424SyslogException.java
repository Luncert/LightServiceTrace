package org.luncert.lstrace.syslog;

public class Rfc5424SyslogException extends RuntimeException {

  public Rfc5424SyslogException(String message) {
    super(message);
  }

  public Rfc5424SyslogException(Throwable cause) {
    super(cause);
  }
}
