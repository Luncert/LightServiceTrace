package org.luncert.lstrace.service.streaming.impl;

import lombok.extern.slf4j.Slf4j;
import org.luncert.lstrace.model.SyslogDto;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

@Slf4j
class LogStreamDistributionChannel implements Subscription {
  
  private final Subscriber<? super SyslogDto> subscriber;
  
  private final ResourceCleaner cleaner;
  
  LogStreamDistributionChannel(Subscriber<? super SyslogDto> subscriber, ResourceCleaner cleaner) {
    this.subscriber = subscriber;
    this.cleaner = cleaner;
  }
  
  void publish(SyslogDto event) {
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
