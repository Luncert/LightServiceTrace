package org.luncert.lstrace.base;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import org.luncert.lstrace.syslog.rfc5424.Rfc5424SyslogEvent;

public class GoRouterMessageParser extends AbstractBytesParser implements IMessageParser {

  public void postProcess(Rfc5424SyslogEvent syslog) {
    BytesParserData parserData = new BytesParserData(
        syslog.getMessage().getBytes(StandardCharsets.UTF_8));
    init(parserData);

    var attrs = new HashMap<String, String>();
    syslog.setAttrs(attrs);

    var host = token(' ');
    skip('[');
    var timestamp = token(']');
    if (timestamp.matches("\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{9}Z")) {
      timestamp = timestamp.substring(0, 23) + "Z";
    }
    syslog.setTimestamp(timestamp);

    skip('"');
    var httpHeader = token('"');
    skip(' ');
    syslog.setMessage(host + " - " + httpHeader);
    attrs.put("statusCode", token(' '));

    skip('"');
    attrs.put("Host", token('"'));
    skip('"');
    attrs.put("Browser", token('"'));
    skip('"');
    attrs.put("Source Address", token('"'));
    skip('"');
    attrs.put("Target Address", token('"'));

    skip(' ');
    while (hasNext()) {
      var name = token(':');
      if (next() == '"') {
        skip('"');
        var value = token('"');
        if (!value.equals("-")) {
          attrs.put(name, value);
        }
        skip(' ');
      } else {
        attrs.put(name, token(' '));
      }
    }
  }
}
