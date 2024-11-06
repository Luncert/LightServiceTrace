package org.luncert.lstrace.model.mapper;

import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.luncert.lstrace.model.SyslogEvent;
import org.luncert.lstrace.syslog.rfc5424.Rfc5424SyslogEvent;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SyslogEventMapper {

  public SyslogEvent toSyslogEvent(Rfc5424SyslogEvent source) {
    return SyslogEvent.builder()
        .facility(source.getFacility())
        .level(source.getLevel())
        .version(source.getVersion())
        .timestamp(Instant.parse(source.getTimestamp()).toEpochMilli())
        .host(source.getHost())
        .appName(source.getAppName())
        .procId(source.getProcId())
        .msgId(source.getMsgId())
        .message(source.getMessage())
        .thread(source.getThread())
        .logger(source.getLogger())
        .attrs(source.getAttrs())
        .build();
    //return modelMapper.typeMap(Rfc5424SyslogEvent.class, SyslogEvent.class)
    //    .setPreConverter(mappingContext -> {
    //      var timestamp = mappingContext.getSource().getTimestamp();
    //      mappingContext.getDestination().setTimestamp(Instant.parse(timestamp).getNano());
    //      //foldMessage(mappingContext.getSource(), mappingContext.getDestination());
    //      return mappingContext.getDestination();
    //    })
    //    .map(source);
  }
}
