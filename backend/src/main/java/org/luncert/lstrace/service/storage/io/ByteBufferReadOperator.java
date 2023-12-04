package org.luncert.lstrace.service.storage.io;

import java.io.EOFException;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@RequiredArgsConstructor
public class ByteBufferReadOperator implements ReadOperator {

  private final ByteBuffer buffer;
  private int readOffset;

  public long readLong() {
    long low = readInt();
    long high = readInt();
    return (high << 32) + (4294967295L & low);
  }

  @SneakyThrows
  public int readInt() {
    requireBytes(4);
    int value = rb() & 255;
    value += (rb() & 255) << 8;
    value += (rb() & 255) << 16;
    value += (rb() & 255) << 24;
    return value;
  }

  public String readString() {
    return readString(Charset.defaultCharset());
  }

  public String readString(Charset charset) {
    int size = readInt();
    byte[] payload = new byte[size];
    readBytes(payload);
    return new String(payload, charset);
  }

  @Override
  public byte[] readByteArray() {
    int size = readInt();
    byte[] r = new byte[size];
    readBytes(r);
    return r;
  }

  @SneakyThrows
  public void readBytes(byte[] buf) {
    requireBytes(buf.length);
    for (int i = 0; i < buf.length; i++) {
      buf[i] = rb();
    }
  }

  @SneakyThrows
  public byte readByte() {
    requireBytes(1);
    return rb();
  }

  private void requireBytes(final int n) throws EOFException {
    int readableCount = buffer.position() - readOffset;
    if (readableCount < n) {
      throw new EOFException();
    }
  }

  private byte rb() {
    return buffer.get(readOffset++);
  }
}
