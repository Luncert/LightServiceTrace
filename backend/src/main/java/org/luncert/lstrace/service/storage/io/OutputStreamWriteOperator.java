package org.luncert.lstrace.service.storage.io;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class OutputStreamWriteOperator implements WriteOperator {

  private final OutputStream outputStream;

  // little endian

  public void appendLong(long value) throws IOException {
    outputStream.write((byte) (value & 255));
    outputStream.write((byte) ((value = value >> 8) & 255));
    outputStream.write((byte) ((value = value >> 8) & 255));
    outputStream.write((byte) ((value = value >> 8) & 255));
    outputStream.write((byte) ((value = value >> 8) & 255));
    outputStream.write((byte) ((value = value >> 8) & 255));
    outputStream.write((byte) ((value = value >> 8) & 255));
    outputStream.write((byte) (value >> 8 & 255));
  }

  public void appendInt(int value) throws IOException {
    outputStream.write((byte) (value & 255));
    outputStream.write((byte) ((value = value >> 8) & 255));
    outputStream.write((byte) ((value = value >> 8) & 255));
    outputStream.write((byte) (value >> 8 & 255));
  }

  public void appendString(String str) throws IOException {
    appendString(str, Charset.defaultCharset());
  }

  public void appendString(String str, Charset charset) throws IOException {
    appendBytes(str.getBytes(charset));
  }

  public void appendBytes(byte[] bytes) throws IOException {
    appendInt(bytes.length);
    outputStream.write(bytes);
  }

  public void appendByte(byte b) throws IOException {
    outputStream.write(b);
  }
}