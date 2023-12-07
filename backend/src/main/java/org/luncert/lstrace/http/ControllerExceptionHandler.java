package org.luncert.lstrace.http;

import org.apache.lucene.queryparser.classic.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler {

  @ExceptionHandler(ParseException.class)
  public ResponseEntity<String> handleParseException(ParseException ex) {
    return ResponseEntity.badRequest().body(ex.getMessage());
  }
}
