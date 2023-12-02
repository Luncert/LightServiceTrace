package org.luncert.lstrace.syslog.server;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioDatagramChannel;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;

public class SyslogUdpServer extends AbstractServer {

  private final SyslogProcessingHandler syslogProcessingHandler;

  public SyslogUdpServer(SyslogServerConfig config,
                         SyslogProcessingHandler syslogProcessingHandler) {
    super(config);
    this.syslogProcessingHandler = syslogProcessingHandler;
  }

  public void run() throws Exception {
    EventLoopGroup group = new NioEventLoopGroup();
    try {
      Bootstrap b = new Bootstrap();
      b.group(group)
          .channel(NioDatagramChannel.class)
          .option(ChannelOption.SO_BROADCAST, true)
          .option(ChannelOption.SO_RCVBUF, 2048 * 1024)
          .option(ChannelOption.SO_SNDBUF, 1024 * 1024)
          .handler(new ChannelInitializer<NioDatagramChannel>() {
            @Override
            public void initChannel(NioDatagramChannel ch) throws Exception {
              ch.pipeline().addLast(
//                  new RequestDecoder(),
//                  new ResponseDataEncoder(),
                  new LoggingHandler(LogLevel.INFO),
                  syslogProcessingHandler);
            }
          });

      ChannelFuture f = b.bind(config.getPort()).sync();
      f.channel().closeFuture().sync();
    } finally {
      group.shutdownGracefully();
    }
  }
}
