package org.luncert.lstrace;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class App {
  public static void main(String[] args) throws InterruptedException {
    for (int i = 0; i < 10; i++) {
      log.info("Syslog Test {}", i);
      Thread.sleep(10);
    }
    log.error("exception", new Exception("test"));
  }
}
