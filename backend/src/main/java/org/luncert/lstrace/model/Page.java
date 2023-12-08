package org.luncert.lstrace.model;

import java.util.List;

public interface Page<T> {

  List<T> getContent();

  long getTotalElements();
}
