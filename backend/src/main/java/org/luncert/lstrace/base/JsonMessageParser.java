package org.luncert.lstrace.base;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import java.util.HashMap;
import java.util.Map;
import java.util.function.BiConsumer;
import lombok.RequiredArgsConstructor;
import org.luncert.lstrace.syslog.rfc5424.Rfc5424SyslogEvent;

@RequiredArgsConstructor
public class JsonMessageParser implements IMessageParser {

  private final ObjectMapper objectMapper;

  private final Map<String, Integer> levelMappings = ImmutableMap.of(
      "TRACE", 5,
      "DEBUG", 7,
      "INFO", 6,
      "WARN", 1,
      "ERROR", 0
  );

  private final Map<String, BiConsumer<Rfc5424SyslogEvent, String>> fieldMappers = ImmutableMap
      .<String, BiConsumer<Rfc5424SyslogEvent, String>>builder()
      .put("written_ts", this::convertTimestamp)
      .put("level", this::convertLevel)
      .put("thread", this::convertThread)
      .put("logger", this::convertLogger)
      .put("msg", this::convertMessage)
      .build();

  @Override
  public void postProcess(Rfc5424SyslogEvent syslog) throws JsonProcessingException {
    var attrs = new HashMap<String, String>();
    syslog.setAttrs(attrs);

    var msg = objectMapper.readValue(syslog.getMessage(), new TypeReference<Map<String, String>>() {
    });
    msg.forEach((k, v) -> {
      var mapper = fieldMappers.get(k);
      if (mapper != null) {
        mapper.accept(syslog, v);
      } else {
        attrs.put(k, v);
      }
    });
  }

  private void convertTimestamp(Rfc5424SyslogEvent event, String raw) {
    var t = Long.valueOf(raw);
    while (t > 1_0000_0000_0000_000L) {
      t /= 1000;
    }
    event.setTimestamp(String.valueOf(t));
  }

  private void convertLevel(Rfc5424SyslogEvent event, String raw) {
    event.setLevel(levelMappings.get(raw));
  }

  private void convertThread(Rfc5424SyslogEvent event, String raw) {
    event.setThread(raw);
  }

  private void convertLogger(Rfc5424SyslogEvent event, String raw) {
    event.setLogger(raw);
  }

  private void convertMessage(Rfc5424SyslogEvent event, String raw) {
    event.setMessage(raw);
  }
}
