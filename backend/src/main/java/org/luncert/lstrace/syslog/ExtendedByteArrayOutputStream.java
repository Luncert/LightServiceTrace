package org.luncert.lstrace.syslog;

import java.io.ByteArrayOutputStream;
import java.util.Arrays;

public class ExtendedByteArrayOutputStream extends ByteArrayOutputStream {

  public byte[] getBuffer() {
    return buf;
  }

  public byte[] splice(int start, int end) {
    return Arrays.copyOfRange(buf, start, end);
  }
}
