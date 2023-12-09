package org.luncert.lstrace.service.streaming.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Timer;
import java.util.TimerTask;
import java.util.function.Predicate;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.lks.filtersquery.predicateimpl.PredicateFiltersQueryEngine;
import org.luncert.lstrace.model.SyslogEvent;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
class HttpStreamingSubscriber extends SyslogStreamingSubscriber {

  private static final ObjectMapper objectMapper = new ObjectMapper();

  public static final long LOG_TRANSPORT_INTERVAL = 50;

  private final SseEmitter emitter;
  private final String streamingChannel;
  private final Timer timer;
  private int counter;
  private SseEmitter.SseEventBuilder eventBuilder;
  private int eventBuilderSize;
  private final Predicate<SyslogEvent> filter;

  HttpStreamingSubscriber(String streamingChannel, SseEmitter emitter, String criteria) {
    this.streamingChannel = streamingChannel;
    this.emitter = emitter;
    filter = PredicateFiltersQueryEngine.buildQuery(criteria, SyslogEvent.class);

    resetEventBuilder();

    timer = new Timer();
    timer.schedule(new TimerTask() {
      @SneakyThrows
      @Override
      public void run() {
        synchronized (HttpStreamingSubscriber.this) {
          if (eventBuilderSize > 0) {
            emitter.send(eventBuilder);
            resetEventBuilder();
          }
        }
      }
    }, LOG_TRANSPORT_INTERVAL, LOG_TRANSPORT_INTERVAL);
  }

  private void resetEventBuilder() {
    eventBuilderSize = 0;
    eventBuilder = SseEmitter.event().id(String.valueOf(counter++)).name(streamingChannel);
  }

  @Override
  @SneakyThrows
  public void onNext(SyslogEvent event) {
    if (filter.test(event)) {
      synchronized (this) {
        String log = objectMapper.writeValueAsString(event);
        // buffering to avoid taking up too much network resources
        eventBuilderSize++;
        eventBuilder.data(log);
      }
    }
  }

  @Override
  public void onError(Throwable t) {
    emitter.completeWithError(t);
    timer.cancel();
  }

  @Override
  public void onComplete() {
    emitter.complete();
    timer.cancel();
  }
  
  @Override
  void cancel() {
    super.cancel();
    onComplete();
  }
}
