package org.luncert.lstrace.http;

import org.lks.filtersquery.api.exception.FiltersQueryException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler {

  @ExceptionHandler(FiltersQueryException.class)
  public ResponseEntity<String> handleParseException(FiltersQueryException ex) {
    return ResponseEntity.badRequest().body(ex.getMessage());
  }
}
