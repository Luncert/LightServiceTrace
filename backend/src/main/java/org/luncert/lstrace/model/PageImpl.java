package org.luncert.lstrace.model;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PageImpl<T> implements Page<T> {

  private final long totalElements;
  private final List<T> content;

  public static <T> Page<T> of(long totalElements, List<T> content) {
    return new PageImpl<>(totalElements, content);
  }
}
