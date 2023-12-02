package org.luncert.lstrace.syslog.rfc5424;

public interface IRfc5424SyslogParser<I> {

  char SP = ' ';
  byte[] UTF_8_BOM = {(byte) 0xef, (byte) 0xbb, (byte) 0xbf};

  Rfc5424SyslogEvent parse(I input);
}
