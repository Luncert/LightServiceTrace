package org.luncert.lstrace.service.streaming.impl;

import lombok.extern.slf4j.Slf4j;
import org.productivity.java.syslog4j.server.SyslogServerEventIF;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

@Slf4j
class LogStreamDistributionChannel implements Subscription {
  
  private final Subscriber<? super SyslogServerEventIF> subscriber;
  
  private final ResourceCleaner cleaner;
  
  LogStreamDistributionChannel(Subscriber<? super SyslogServerEventIF> subscriber, ResourceCleaner cleaner) {
    this.subscriber = subscriber;
    this.cleaner = cleaner;
  }
  
  void publish(SyslogServerEventIF event) {
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
