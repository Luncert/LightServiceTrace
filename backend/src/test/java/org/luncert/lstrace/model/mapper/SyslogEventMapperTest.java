package org.luncert.lstrace.model.mapper;

import org.junit.Assert;
import org.junit.Test;
import org.luncert.lstrace.syslog.rfc5424.Rfc5424SyslogEvent;

public class SyslogEventMapperTest {

  private final SyslogEventMapper mapper = new SyslogEventMapper();

  @Test
  public void test() {
    var src = Rfc5424SyslogEvent.builder()
        .timestamp("2024-11-06T07:19:15.665Z")
        .build();
    var target = mapper.toSyslogEvent(src);
    Assert.assertEquals(1730877555665L, target.getTimestamp());
  }
}
