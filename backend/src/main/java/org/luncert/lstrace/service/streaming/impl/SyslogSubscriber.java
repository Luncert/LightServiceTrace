package org.luncert.lstrace.service.streaming.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.ZonedDateTime;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.productivity.java.syslog4j.server.SyslogServerEventIF;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

@Slf4j
public abstract class SyslogSubscriber implements Subscriber<SyslogServerEventIF> {

  private static final ObjectMapper objectMapper = new ObjectMapper();
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
  
  @Override
  @SneakyThrows
  public void onNext(SyslogServerEventIF event) {
    process(objectMapper.writeValueAsString(event));
  }
  
  abstract void process(String log);
}