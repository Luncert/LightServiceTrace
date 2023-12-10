package org.luncert.lstrace.http;

import java.nio.charset.StandardCharsets;
import java.util.Map;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class PostLogController {

  private final IRfc5424SyslogParser<byte[]> parser = new Rfc5424BytesSyslogParser();
  private final SyslogEventMapper syslogEventMapper;
  private final ApplicationEventPublisher applicationEventPublisher;

  @PostMapping("/")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public void postLog(@RequestHeader Map<String, Object> headers, @RequestBody String payload) {
    Rfc5424SyslogEvent source = parser.parse(payload.getBytes(StandardCharsets.UTF_8));
    SyslogEvent syslogEvent = syslogEventMapper.toSyslogEvent(source);
    applicationEventPublisher.publishEvent(new SyslogServerEvent(syslogEvent));
  }
}
