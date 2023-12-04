package org.luncert.lstrace.service.storage;

import org.apache.commons.io.FileUtils;

public class Utils {

  public static long toByteCount(String size) {
    if (size == null || size.isEmpty()) {
      throw new IllegalArgumentException("empty size string: " + size);
    }

    int i = 0;
    while (i < size.length()) {
      if (!Character.isDigit(size.charAt(i))) {
        break;
      }
      i++;
    }

    if (i == 0 || i == size.length()) {
      throw new IllegalArgumentException("invalid size string: " + size);
    }

    long value = Long.parseLong(size.substring(0, i));
    String unit = size.substring(i).toUpperCase();
    switch (unit) {
      case "EB":
        value *= FileUtils.ONE_EB;
        break;
      case "PB":
        value *= FileUtils.ONE_PB;
        break;
      case "TB":
        value *= FileUtils.ONE_TB;
        break;
      case "GB":
        value *= FileUtils.ONE_GB;
        break;
      case "MB":
        value *= FileUtils.ONE_MB;
        break;
      case "KB":
        value *= FileUtils.ONE_KB;
        break;
      case "B":
        break;
      default:
        throw new IllegalArgumentException("invalid size unit in: " + size);
    }

    return value;
  }
}
