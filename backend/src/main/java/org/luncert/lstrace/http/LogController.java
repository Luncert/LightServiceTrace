package org.luncert.lstrace.http;

import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.lucene.queryparser.classic.ParseException;
import org.luncert.lstrace.model.GetSyslogResponse;
import org.luncert.lstrace.service.ILogQueryService;
import org.luncert.lstrace.service.streaming.ILogStreamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/v1/logs")
@RequiredArgsConstructor
public class LogController {

  private static final String ANONYMOUS_CHANNEL = "anonymous";

  private final ILogStreamService logStreamService;
  private final ILogQueryService logQueryService;

  @GetMapping
  public List<GetSyslogResponse> getLogs(@RequestParam String criteria)
      throws IOException, ParseException {
    return logQueryService.search(criteria);
  }

  @GetMapping("/streaming")
  public ResponseEntity<SseEmitter> streaming(@RequestParam String channel) throws IOException {
    SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

    String streamId = logStreamService.subscribe(channel, emitter);
    emitter.onCompletion(() -> logStreamService.unsubscribe(streamId));
    // send empty event to let client receive response header immediately
    emitter.send(SseEmitter.event().name(ANONYMOUS_CHANNEL).data(""));

    return ResponseEntity.ok().body(emitter);
  }
}
