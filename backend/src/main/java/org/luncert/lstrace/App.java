package org.luncert.lstrace;

import org.luncert.lstrace.server.SyslogUdpServer;

public class App {

  public static void main(String[] args) throws Exception {
    int port = args.length > 0 ? Integer.parseInt(args[0]) : 6000;
    new SyslogUdpServer(port).run();
  }
}
