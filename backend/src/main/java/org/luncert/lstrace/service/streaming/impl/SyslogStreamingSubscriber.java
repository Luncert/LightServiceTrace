package org.luncert.lstrace.service.streaming.impl;

import java.time.ZonedDateTime;
import lombok.extern.slf4j.Slf4j;
import org.luncert.lstrace.model.SyslogEvent;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

@Slf4j
public abstract class SyslogStreamingSubscriber implements Subscriber<SyslogEvent> {

  private Subscription subscription;

  private String getTime() {
    ZonedDateTime time = ZonedDateTime.now();
    return time.toLocalDateTime().toString() + time.getOffset().toString();
  }
  
  void poll(long n) {
    subscription.request(n);
  }
  
  void cancel() {
    subscription.cancel();
  }
  
  @Override
  public void onSubscribe(Subscription s) {
    subscription = s;
  }
}
