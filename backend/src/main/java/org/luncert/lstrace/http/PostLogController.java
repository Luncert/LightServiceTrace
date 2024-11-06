package org.luncert.lstrace.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.luncert.lstrace.base.GoRouterMessageParser;
import org.luncert.lstrace.base.JsonMessageParser;
import org.luncert.lstrace.model.SyslogEvent;
import org.luncert.lstrace.model.mapper.SyslogEventMapper;
import org.luncert.lstrace.syslog.rfc5424.IRfc5424SyslogParser;
import org.luncert.lstrace.syslog.rfc5424.Rfc5424BytesSyslogParser;
import org.luncert.lstrace.syslog.rfc5424.Rfc5424SyslogEvent;
import org.luncert.lstrace.syslog.server.SyslogServerEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostLogController {

  private final IRfc5424SyslogParser<byte[]> parser = new Rfc5424BytesSyslogParser();
  private final GoRouterMessageParser goRouterMessageParser = new GoRouterMessageParser();
  private final JsonMessageParser jsonMessageParser;
  private final SyslogEventMapper syslogEventMapper;
  private final ApplicationEventPublisher applicationEventPublisher;

  public PostLogController(ObjectMapper objectMapper,
                           SyslogEventMapper syslogEventMapper,
                           ApplicationEventPublisher applicationEventPublisher) {
    this.syslogEventMapper = syslogEventMapper;
    this.applicationEventPublisher = applicationEventPublisher;
    jsonMessageParser = new JsonMessageParser(objectMapper);
  }

  @PostMapping("/")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public void postLog(@RequestHeader Map<String, Object> headers, @RequestBody String payload) {
    Rfc5424SyslogEvent source = parser.parse(payload.getBytes(StandardCharsets.UTF_8));
    postProcess(source);

    SyslogEvent syslogEvent = syslogEventMapper.toSyslogEvent(source);
    applicationEventPublisher.publishEvent(new SyslogServerEvent(syslogEvent));
  }

  private void postProcess(Rfc5424SyslogEvent syslogEvent) {
    var raw = syslogEvent.getMessage().trim();
    try {
      if (raw.startsWith("{") && raw.endsWith("}")) {
        jsonMessageParser.postProcess(syslogEvent);
      } else if (raw.contains("HTTP/1.1")) {
        goRouterMessageParser.postProcess(syslogEvent);
      }
    } catch (Exception e) {
      // ignore
    }
  }
}
