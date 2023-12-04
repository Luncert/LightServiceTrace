package org.luncert.lstrace.service.streaming.impl;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.luncert.lstrace.model.SyslogEvent;
import org.luncert.lstrace.service.streaming.ILogStreamService;
import org.luncert.lstrace.syslog.server.SyslogServerEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
public class LogStreamServiceImpl implements ILogStreamService, ApplicationListener<SyslogServerEvent> {

  private final LogStream logStream = new LogStream();
  private final Map<String, SyslogStreamingSubscriber> subscribers = new ConcurrentHashMap<>();

  @Override
  public String subscribe(String streamingChannel, @NonNull SseEmitter emitter) {
    String subscriptionId = UUID.randomUUID().toString();
    SyslogStreamingSubscriber subscriber = new HttpStreamingSubscriber(streamingChannel, emitter);
    logStream.subscribe(subscriber);
    subscribers.put(subscriptionId, subscriber);
    return subscriptionId;
  }

  @Override
  public boolean unsubscribe(String subscriptionId) {
    SyslogStreamingSubscriber subscriber = subscribers.remove(subscriptionId);

    if (subscriber != null) {
      subscriber.cancel();
      return true;
    }

    return false;
  }

  @Override
  public void onApplicationEvent(SyslogServerEvent event) {
    logStream.publish((SyslogEvent) event.getSource());
  }
}
