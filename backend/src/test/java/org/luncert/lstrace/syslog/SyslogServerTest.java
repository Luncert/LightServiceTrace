package org.luncert.lstrace.syslog;

import lombok.extern.slf4j.Slf4j;
import org.junit.Test;

@Slf4j
public class SyslogServerTest {

  @Test
  public void test() {
    for (int i = 0; i < 10; i++) {
      log.info("SyslogServerTest {}", i);
    }
  }
}
