package org.luncert.lstrace.syslog.server;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.socket.DatagramPacket;
import lombok.RequiredArgsConstructor;
import org.luncert.lstrace.model.SyslogEvent;
import org.luncert.lstrace.syslog.rfc5424.IRfc5424SyslogParser;
import org.luncert.lstrace.syslog.rfc5424.Rfc5424SyslogEvent;
import org.luncert.lstrace.syslog.rfc5424.Rfc5425ByteBufSyslogParser;
import org.modelmapper.ModelMapper;
import org.productivity.java.syslog4j.server.SyslogServerEventIF;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SyslogProcessingHandler
  extends ChannelInboundHandlerAdapter {

  private final IRfc5424SyslogParser<ByteBuf> parser = new Rfc5425ByteBufSyslogParser();
  private final ApplicationEventPublisher applicationEventPublisher;
  private final ModelMapper modelMapper;

  @Override
  public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
    DatagramPacket m = (DatagramPacket) msg;
    Rfc5424SyslogEvent source = parser.parse(m.content());
    m.release();

    SyslogEvent syslogEvent = modelMapper.typeMap(SyslogServerEventIF.class, SyslogEvent.class)
        .setPreConverter(mappingContext -> {
          long timestamp = mappingContext.getSource().getDate().getTime();
          mappingContext.getDestination().setTimestamp(timestamp);
          //foldMessage(mappingContext.getSource(), mappingContext.getDestination());
          return mappingContext.getDestination();
        })
        .map(source);
    applicationEventPublisher.publishEvent(new SyslogServerEvent(syslogEvent));
  }

  private void foldMessage(SyslogServerEventIF source, SyslogEvent destination) {
//    char[] chars = source.getMessage().toCharArray();
    // TODO:
  }
}
