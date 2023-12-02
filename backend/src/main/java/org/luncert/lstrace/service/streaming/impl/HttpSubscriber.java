package org.luncert.lstrace.service.streaming.impl;

import java.util.Timer;
import java.util.TimerTask;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
class HttpSubscriber extends SyslogSubscriber {

  public static final long LOG_TRANSPORT_INTERVAL = 50;

  private final SseEmitter emitter;
  private final String streamingChannel;
  private final Timer timer;
  private int counter;
  private SseEmitter.SseEventBuilder eventBuilder;
  private int eventBuilderSize;

  HttpSubscriber(String streamingChannel, SseEmitter emitter) {
    this.streamingChannel = streamingChannel;
    this.emitter = emitter;

    resetEventBuilder();

    timer = new Timer();
    timer.schedule(new TimerTask() {
      @SneakyThrows
      @Override
      public void run() {
        synchronized (HttpSubscriber.this) {
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
  
  @SneakyThrows
  @Override
  void process(String log) {
    synchronized (this) {
      // buffering to avoid taking up too much network resources
      eventBuilderSize++;
      eventBuilder.data(log);
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
