package org.luncert.lstrace.http;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PostLogController {

  @PostMapping("/")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public void postLog(@RequestHeader Map<String, Object> headers, @RequestBody String body) {
  }
}
