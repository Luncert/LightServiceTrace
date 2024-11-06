package org.luncert.lstrace.base;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class AbstractBytesParser {

  private final ThreadLocal<BytesParserData> dataThreadLocal = new ThreadLocal<>();

  protected static class BytesParserData {

    public int cursor = 0;
    public final byte[] raw;

    public BytesParserData(byte[] raw) {
      this.raw = raw;
    }
  }

  protected void init(BytesParserData data) {
    dataThreadLocal.set(data);
  }

  protected boolean hasNext() {
    BytesParserData parserData = dataThreadLocal.get();
    return parserData.cursor < parserData.raw.length;
  }

  protected char next() {
    BytesParserData parserData = dataThreadLocal.get();
    return (char) parserData.raw[parserData.cursor];
  }

  protected String token(char c) {
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

  protected void skip(char c) {
    BytesParserData parserData = dataThreadLocal.get();
    for (int i = parserData.cursor; i < parserData.raw.length; i++) {
      if (parserData.raw[i] == c) {
        parserData.cursor = i + 1;
        return;
      }
    }

    parserData.cursor = parserData.raw.length;
  }

  protected boolean match(int len, byte[] pattern) {
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
