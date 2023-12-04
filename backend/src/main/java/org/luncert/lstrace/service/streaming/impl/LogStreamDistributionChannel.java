package org.luncert.lstrace.service.streaming.impl;

import lombok.extern.slf4j.Slf4j;
import org.luncert.lstrace.model.SyslogEvent;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

@Slf4j
class LogStreamDistributionChannel implements Subscription {
  
  private final Subscriber<? super SyslogEvent> subscriber;
  
  private final ResourceCleaner cleaner;
  
  LogStreamDistributionChannel(Subscriber<? super SyslogEvent> subscriber, ResourceCleaner cleaner) {
    this.subscriber = subscriber;
    this.cleaner = cleaner;
  }
  
  void publish(SyslogEvent event) {
    subscriber.onNext(event);
  }
  
  @Override
  public void request(long n) {
  }
  
  /**
   * Will be invoked by its subscriber.
   */
  @Override
  public void cancel() {
    cleaner.run();
  }
}
