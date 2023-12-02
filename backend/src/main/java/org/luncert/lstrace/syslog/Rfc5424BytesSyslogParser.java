package org.luncert.lstrace.syslog;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class Rfc5424BytesSyslogParser implements IRfc5424SyslogParser<byte[]> {

  private final ThreadLocal<BytesParserData> dataThreadLocal = new ThreadLocal<>();

  private static class BytesParserData {

    private int cursor = 0;
    private final byte[] raw;

    public BytesParserData(byte[] raw) {
      this.raw = raw;
    }
  }

  public Rfc5424SyslogEvent parse(byte[] raw) {
    Rfc5424SyslogEvent.Rfc5424SyslogEventBuilder builder = Rfc5424SyslogEvent.builder();
    BytesParserData parserData = new BytesParserData(raw);
    dataThreadLocal.set(parserData);

    String prioVersion = token(SP);
    if (prioVersion == null) {
      throw new Rfc5424SyslogException("prioVersion missing");
    }
    builder.raw(raw)
        .prioVersion(prioVersion)
        .timestamp(token(' '))
        .host(token(' '))
        .appName(token(' '))
        .procId(token(' '))
        .msgId(token(' '));

    if (parserData.raw[parserData.cursor] == '[') {
      builder.structuredData(token(']'));
      parserData.cursor += 1;
    } else {
      builder.structuredData(token(' '));
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

  private String token(char c) {
    BytesParserData parserData = dataThreadLocal.get();
    for (int i = parserData.cursor; i < parserData.raw.length; i++) {
      if (parserData.raw[i] == c) {
        int cursor = parserData.cursor;
        parserData.cursor = i + 1;
        return new String(Arrays.copyOfRange(parserData.raw, cursor, i),
            StandardCharsets.UTF_8);
      }
    }
    parserData.cursor = parserData.raw.length;
    return null;
  }

  private boolean match(int len, byte[] pattern) {
    BytesParserData parserData = dataThreadLocal.get();
    int j = 0;
    for (int i = parserData.cursor; i < parserData.raw.length && i < len; i++, j++) {
      if (parserData.raw[i] != pattern[j]) {
        break;
      }
    }
    return j == pattern.length;
  }
}
