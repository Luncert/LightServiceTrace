package org.luncert.lstrace.syslog.rfc5424;

import io.netty.buffer.ByteBuf;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

public class Rfc5425ByteBufSyslogParser implements IRfc5424SyslogParser<ByteBuf> {

  private final ThreadLocal<ByteBufParserData> dataThreadLocal = new ThreadLocal<>();
  private final SimpleDateFormat sdfParse = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX");
  private final SimpleDateFormat sdfFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  public Rfc5425ByteBufSyslogParser() {
    sdfFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
  }

  private static class ByteBufParserData {

    private int cursor = 0;
    private final ByteBuf byteBuf;
    private final ExtendedByteArrayOutputStream outputStream = new ExtendedByteArrayOutputStream();

    public ByteBufParserData(ByteBuf byteBuf) {
      this.byteBuf = byteBuf;
    }
  }

  @Override
  public Rfc5424SyslogEvent parse(ByteBuf buf) {
    Rfc5424SyslogEvent.Rfc5424SyslogEventBuilder builder = Rfc5424SyslogEvent.builder();
    ByteBufParserData parserData = new ByteBufParserData(buf);
    dataThreadLocal.set(parserData);

    String prioVersion = token(SP);
    if (prioVersion == null) {
      throw new Rfc5424SyslogException("prioVersion missing");
    }
    builder
        .prioVersion(prioVersion)
        .timestamp(cleanTimestamp(token(' ')))
        .host(token(' '))
        .appName(token(' '))
        .procId(token(' '))
        .msgId(token(' '));

    if (nextByte() == '[') {
      token(']');
      //builder.structuredData(token(']'));
      parserData.cursor += 2;
    } else {
      token(' ');
      //builder.structuredData(token(' '));
      parserData.cursor += 1;
    }

    if (parserData.byteBuf.readableBytes() > 0) {
      if (match(3, UTF_8_BOM)) {
        parserData.cursor += 3;
      }
      builder.message(new String(readAll(), StandardCharsets.UTF_8));
    }

    builder.raw(parserData.outputStream.toByteArray());

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
    ts = ts.substring(0, 23) + ts.substring(26);
    try {
      return sdfFormat.format(sdfParse.parse(ts));
    } catch (ParseException e) {
      return ts;
    }
  }

  private String token(char c) {
    ByteBufParserData parserData = dataThreadLocal.get();
    byte b;
    int i = parserData.cursor;
    while ((b = nextByte()) != -1) {
      if (b == c) {
        int cursor = parserData.cursor;
        parserData.cursor = i + 1;
        return new String(parserData.outputStream.splice(cursor, i), StandardCharsets.UTF_8);
      }
      i++;
    }
    parserData.cursor = i;
    return null;
  }

  private boolean match(int len, byte[] pattern) {
    ByteBufParserData parserData = dataThreadLocal.get();
    byte b;
    int i = parserData.cursor;
    int j = 0;
    while (i < len && (b = nextByte()) != -1) {
      if (b != pattern[j]) {
        break;
      }
      i++;
      j++;
    }
    return j == pattern.length;
  }

  private byte nextByte() {
    ByteBufParserData parserData = dataThreadLocal.get();
    if (parserData.byteBuf.readableBytes() > 0) {
      byte b = parserData.byteBuf.readByte();
      parserData.outputStream.write(b);
      return b;
    }
    return -1;
  }

  private byte[] readAll() {
    ByteBufParserData parserData = dataThreadLocal.get();
    int cursor = parserData.cursor;
    while (nextByte() != -1);
    return parserData.outputStream.splice(cursor, parserData.outputStream.size());
  }
}
