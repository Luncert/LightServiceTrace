package org.luncert.lstrace.service.streaming.impl;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import lombok.extern.slf4j.Slf4j;
import org.luncert.lstrace.model.SyslogDto;
import org.reactivestreams.Publisher;
import org.reactivestreams.Subscriber;
import org.springframework.lang.Nullable;

/**
 * LogStream is the container of distribution channels.
 * And each channel represents a subscription of live stream.
 * The channel implements reactivestreams api and can be subscribed for stream data process.
 */
@Slf4j
class LogStream implements Publisher<SyslogDto> {

  private static final long LOG_STREAM_TTL = TimeUnit.HOURS.toMillis(24);

  private final LogStreamCleaner cleaner;

  private boolean enabled;

  private long lastPublish;

  private final Map<String, LogStreamDistributionChannel> channelMap;

  public LogStream() {
    this(null);
  }

  /**
   * Create new LogStream.
   * @param cleaner LogStream will call cleaner to clean itself
   *               when the LogStream isn't active and there is
   *                no subscription from web socket client
   */
  LogStream(@Nullable LogStreamCleaner cleaner) {
    this(cleaner, false);
  }

  /**
   * Create new LogStream.
   * @param cleaner LogStream will call cleaner to clean itself
   *               when the LogStream isn't active and there is
   *                no subscription from web socket client
   * @param createdOnSubscription if true, this stream will be marked as disabled
   *                              until the publish method is invoked
   */
  LogStream(@Nullable LogStreamCleaner cleaner, boolean createdOnSubscription) {
    this.cleaner = cleaner;
    lastPublish = System.currentTimeMillis();
    channelMap = new ConcurrentHashMap<>();
    enabled = !createdOnSubscription;
  }

  void publish(SyslogDto event) {
    lastPublish = System.currentTimeMillis();
    enabled = true;
    channelMap.values().forEach(channel -> channel.publish(event));
  }

  @Override
  public void subscribe(Subscriber<? super SyslogDto> subscriber) {
    String channelId = UUID.randomUUID().toString();
    LogStreamDistributionChannel channel = new LogStreamDistributionChannel(subscriber,
        () -> unsubscribe(channelId));
    channelMap.put(channelId, channel);

    subscriber.onSubscribe(channel);
  }

  private void unsubscribe(String channelId) {
    channelMap.remove(channelId);

    if (cleaner != null && channelMap.isEmpty() && !isActive()) {
      cleaner.run();
    }
  }

  boolean isActive() {
    return System.currentTimeMillis() - lastPublish < LOG_STREAM_TTL;
  }

  long getLastPublish() {
    return lastPublish;
  }

  boolean isEnabled() {
    return enabled;
  }
}
