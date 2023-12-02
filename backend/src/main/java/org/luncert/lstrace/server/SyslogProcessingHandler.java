package org.luncert.lstrace.server;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import org.luncert.lstrace.syslog.IRfc5424SyslogParser;
import org.luncert.lstrace.syslog.Rfc5424SyslogEvent;
import org.luncert.lstrace.syslog.Rfc5425ByteBufSyslogParser;

public class SyslogProcessingHandler
  extends ChannelInboundHandlerAdapter {

  private final IRfc5424SyslogParser<ByteBuf> parser = new Rfc5425ByteBufSyslogParser();

  @Override
  public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
    ByteBuf m = (ByteBuf) msg;
    Rfc5424SyslogEvent syslogEvent = parser.parse(m);
    m.release();
  }
}
