package org.luncert.lstrace.service.streaming;

import org.springframework.lang.NonNull;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface ILogStreamService {

  String subscribe(String streamingChannel, @NonNull SseEmitter emitter);

  boolean unsubscribe(String subscriptionId);
}
