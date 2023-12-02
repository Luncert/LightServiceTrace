package org.luncert.lstrace.service.streaming.impl;

public interface LogStreamCleaner {
  
  /**
   * Allow a LogStream to remove itself from LogStream container (LogStreamServiceImpl).
   */
  void run();
}
