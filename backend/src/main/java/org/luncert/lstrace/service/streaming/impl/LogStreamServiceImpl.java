package org.luncert.lstrace.service.streaming.impl;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.luncert.lstrace.service.streaming.ILogStreamService;
import org.luncert.lstrace.syslog.server.SyslogServerEvent;
import org.productivity.java.syslog4j.server.SyslogServerEventIF;
import org.springframework.context.ApplicationListener;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
public class LogStreamServiceImpl implements ILogStreamService, ApplicationListener<SyslogServerEvent> {

  private final LogStream logStream = new LogStream();
  private final Map<String, SyslogSubscriber> subscribers = new ConcurrentHashMap<>();

  @Override
  public String subscribe(String streamingChannel, @NonNull SseEmitter emitter) {
    String subscriptionId = UUID.randomUUID().toString();
    SyslogSubscriber subscriber = new HttpSubscriber(streamingChannel, emitter);
    logStream.subscribe(subscriber);
    subscribers.put(subscriptionId, subscriber);
    return subscriptionId;
  }

  @Override
  public boolean unsubscribe(String subscriptionId) {
    SyslogSubscriber subscriber = subscribers.remove(subscriptionId);

    if (subscriber != null) {
      subscriber.cancel();
      return true;
    }

    return false;
  }

  @Override
  public void onApplicationEvent(SyslogServerEvent event) {
    SyslogServerEventIF source = (SyslogServerEventIF) event.getSource();
    logStream.publish(source);
  }
}
