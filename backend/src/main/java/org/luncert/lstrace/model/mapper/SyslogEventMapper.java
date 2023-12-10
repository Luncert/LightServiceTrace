package org.luncert.lstrace.model.mapper;

import lombok.RequiredArgsConstructor;
import org.luncert.lstrace.model.SyslogEvent;
import org.luncert.lstrace.syslog.rfc5424.Rfc5424SyslogEvent;
import org.modelmapper.ModelMapper;
import org.productivity.java.syslog4j.server.SyslogServerEventIF;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SyslogEventMapper {

  private final ModelMapper modelMapper;

  public SyslogEvent toSyslogEvent(Rfc5424SyslogEvent source) {
    return modelMapper.typeMap(SyslogServerEventIF.class, SyslogEvent.class)
        .setPreConverter(mappingContext -> {
          long timestamp = mappingContext.getSource().getDate().getTime();
          mappingContext.getDestination().setTimestamp(timestamp);
          //foldMessage(mappingContext.getSource(), mappingContext.getDestination());
          return mappingContext.getDestination();
        })
        .map(source);
  }
}
