package org.luncert.lstrace.syslog.server;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.socket.DatagramPacket;
import lombok.RequiredArgsConstructor;
import org.luncert.lstrace.model.SyslogEvent;
import org.luncert.lstrace.model.mapper.SyslogEventMapper;
import org.luncert.lstrace.syslog.rfc5424.IRfc5424SyslogParser;
import org.luncert.lstrace.syslog.rfc5424.Rfc5424SyslogEvent;
import org.luncert.lstrace.syslog.rfc5424.Rfc5425ByteBufSyslogParser;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SyslogProcessingHandler
  extends ChannelInboundHandlerAdapter {

  private final IRfc5424SyslogParser<ByteBuf> parser = new Rfc5425ByteBufSyslogParser();
  private final ApplicationEventPublisher applicationEventPublisher;
  private final SyslogEventMapper syslogEventMapper;

  @Override
  public void channelRead(ChannelHandlerContext ctx, Object msg) {
    DatagramPacket m = (DatagramPacket) msg;
    Rfc5424SyslogEvent source = parser.parse(m.content());
    m.release();

    SyslogEvent syslogEvent = syslogEventMapper.toSyslogEvent(source);
    applicationEventPublisher.publishEvent(new SyslogServerEvent(syslogEvent));
  }
}
