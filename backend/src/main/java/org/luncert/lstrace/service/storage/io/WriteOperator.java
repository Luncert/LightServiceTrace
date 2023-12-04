package org.luncert.lstrace.service.storage.io;

import java.io.IOException;
import java.nio.charset.Charset;

public interface WriteOperator {

  // little endian

  void appendLong(long value) throws IOException;

  void appendInt(int value) throws IOException;

  void appendString(String str) throws IOException;

  void appendString(String str, Charset charset) throws IOException;

  void appendBytes(byte[] bytes) throws IOException;

  void appendByte(byte b) throws IOException;
}
