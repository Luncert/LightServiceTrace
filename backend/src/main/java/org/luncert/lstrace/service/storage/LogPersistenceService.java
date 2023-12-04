package org.luncert.lstrace.service.storage;

import lombok.RequiredArgsConstructor;
import org.luncert.lstrace.model.SyslogEvent;
import org.luncert.lstrace.syslog.server.SyslogServerEvent;
import org.modelmapper.ModelMapper;
import org.productivity.java.syslog4j.server.SyslogServerEventIF;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogPersistenceService implements ApplicationListener<SyslogServerEvent> {

  private final LogStorage logStorage = new LogStorage();
  private final ModelMapper modelMapper;

  @Override
  public void onApplicationEvent(SyslogServerEvent event) {
    SyslogEvent source = (SyslogEvent) event.getSource();
    LogRecord logRecord = modelMapper.map(source, LogRecord.class);
    logStorage.append(logRecord);
  }
}
