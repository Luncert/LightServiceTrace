package org.luncert.lstrace.syslog.rfc5424;

import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.TimeZone;
import org.luncert.lstrace.base.AbstractBytesParser;

public class Rfc5424BytesSyslogParser extends AbstractBytesParser implements IRfc5424SyslogParser<byte[]> {

  private final SimpleDateFormat sdfParse = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX");
  private final SimpleDateFormat sdfFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  public Rfc5424BytesSyslogParser() {
    sdfFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
  }

  public Rfc5424SyslogEvent parse(byte[] raw) {
    Rfc5424SyslogEvent.Rfc5424SyslogEventBuilder builder = Rfc5424SyslogEvent.builder();
    BytesParserData parserData = new BytesParserData(raw);
    init(parserData);

    String prioVersion = token(SP);
    if (prioVersion == null) {
      throw new Rfc5424SyslogException("prioVersion missing");
    }
    builder.raw(raw)
        .prioVersion(prioVersion)
        .timestamp(cleanTimestamp(token(' ')))
        .host(token(' '))
        .appName(token(' '))
        .procId(token(' '))
        .msgId(token(' '));

    if (parserData.raw[parserData.cursor] == '[') {
      token(']');
      //builder.structuredData(token(']'));
      parserData.cursor += 1;
    } else {
      token(' ');
      //builder.structuredData(token(' '));
    }

    if (parserData.cursor < raw.length) {
      if (match(3, UTF_8_BOM)) {
        parserData.cursor += 3;
      }
      builder.message(new String(Arrays.copyOfRange(
          parserData.raw, parserData.cursor, parserData.raw.length), StandardCharsets.UTF_8));
    }

    // parse priority and version
    int i = prioVersion.indexOf(">");
    final String priorityStr = prioVersion.substring(1, i);
    int priority;
    try {
      priority = Integer.parseInt(priorityStr);
    } catch (NumberFormatException nfe) {
      throw new Rfc5424SyslogException("failed to parse priority: " + priorityStr);
    }

    int level = priority & 7;
    builder.level(level)
        .facility((priority - level) >> 3);
    i++;

    if (i < prioVersion.length()) {
      try {
        builder.version(Integer.parseInt(prioVersion.substring(i)));
      } catch (NumberFormatException nfe) {
        throw new Rfc5424SyslogException("failed to parse version: " + prioVersion.substring(i));
      }
    }

    return builder.build();
  }

  private String cleanTimestamp(String ts) {
    ts = ts.substring(0, 23) + ts.substring(25);
    try {
      return sdfFormat.format(sdfParse.parse(ts));
    } catch (ParseException e) {
      return ts;
    }
  }
}
