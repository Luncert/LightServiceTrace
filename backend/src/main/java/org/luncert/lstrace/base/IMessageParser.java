package org.luncert.lstrace.base;

import java.io.IOException;
import org.luncert.lstrace.syslog.rfc5424.Rfc5424SyslogEvent;

public interface IMessageParser {

  void postProcess(Rfc5424SyslogEvent syslog) throws IOException;
}
