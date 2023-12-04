package org.luncert.lstrace.service.storage.io;

import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ByteBufferWriteOperator implements WriteOperator {

  private final ByteBuffer buffer;

  // little endian

  public void appendLong(long value) {
    buffer.put((byte)(value & 255));
    buffer.put((byte) ((value = value >> 8) & 255));
    buffer.put((byte) ((value = value >> 8) & 255));
    buffer.put((byte) ((value = value >> 8) & 255));
    buffer.put((byte) ((value = value >> 8) & 255));
    buffer.put((byte) ((value = value >> 8) & 255));
    buffer.put((byte) ((value = value >> 8) & 255));
    buffer.put((byte) (value >> 8 & 255));
  }

  public void appendInt(int value) {
    buffer.put((byte)(value & 255));
    buffer.put((byte)((value = value >> 8) & 255));
    buffer.put((byte)((value = value >> 8) & 255));
    buffer.put((byte)(value >> 8 & 255));
  }

  public void appendString(String str) {
    appendString(str, Charset.defaultCharset());
  }

  public void appendString(String str, Charset charset) {
    appendBytes(str.getBytes(charset));
  }

  public void appendBytes(byte[] bytes) {
    appendInt(bytes.length);
    buffer.put(bytes);
  }

  public void appendByte(byte b) {
    buffer.put(b);
  }
}
