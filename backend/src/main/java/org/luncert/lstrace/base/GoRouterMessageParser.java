package org.luncert.lstrace.base;

import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import org.luncert.lstrace.syslog.rfc5424.Rfc5424SyslogEvent;

public class GoRouterMessageParser extends AbstractBytesParser implements IMessageParser {

  private final SimpleDateFormat timestampFormat = new SimpleDateFormat(("yyyy-MM-dd'T'hh:mm:ss.SSSSSSSSS'Z'"));

  public void postProcess(Rfc5424SyslogEvent syslog) {
    BytesParserData parserData = new BytesParserData(
        syslog.getMessage().getBytes(StandardCharsets.UTF_8));
    init(parserData);

    var attrs = new HashMap<String, String>();
    syslog.setAttrs(attrs);

    var host = token(' ');
    skip('[');
    var timestamp = token(']');
    try {
      syslog.setTimestamp(String.valueOf(timestampFormat.parse(timestamp).getTime()));
    } catch (ParseException e) {
      // ignore
    }

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
