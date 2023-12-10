package org.luncert.lstrace;

import com.google.common.collect.ImmutableMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;
import org.luncert.lstrace.exception.InvalidUsageOfOptionException;
import org.luncert.lstrace.exception.UnrecognizedOptionException;
import org.luncert.lstrace.syslog.server.Protocol;
import org.luncert.lstrace.syslog.server.SyslogProcessingHandler;
import org.luncert.lstrace.syslog.server.SyslogServerConfig;
import org.luncert.lstrace.syslog.server.SyslogServerConfig.SyslogServerConfigBuilder;
import org.luncert.lstrace.syslog.server.SyslogUdpServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App implements ApplicationRunner {

  @Autowired
  private SyslogProcessingHandler syslogProcessingHandler;

  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
  }

  @Override
  public void run(ApplicationArguments args) throws Exception {
    SyslogServerConfig config = createConfig(args);
    //new SyslogUdpServer(config, syslogProcessingHandler).run();
  }

  private final Map<String, BiConsumer<SyslogServerConfigBuilder, List<String>>>
      handlers = ImmutableMap.<String, BiConsumer<SyslogServerConfigBuilder, List<String>>>builder()
      .put("protocol", this::processProtocol)
      .put("host", this::processHost)
      .put("port", this::processPort)
      .build();

  private SyslogServerConfig createConfig(ApplicationArguments args) {
    SyslogServerConfigBuilder builder = SyslogServerConfig.builder();
    for (String optionName : args.getOptionNames()) {
      BiConsumer<SyslogServerConfigBuilder, List<String>> handler = handlers.get(optionName);
      if (handler == null) {
        throw new UnrecognizedOptionException(optionName);
      }
      List<String> values = args.getOptionValues(optionName);
      handler.accept(builder, values);
    }
    return builder.build();
  }

  private void processProtocol(SyslogServerConfigBuilder builder, List<String> values) {
    if (values.size() != 1) {
      throw new InvalidUsageOfOptionException("protocol");
    }
    try {
      builder.protocol(Protocol.valueOf(values.get(0).toUpperCase()));
    } catch (IllegalArgumentException e) {
      throw new InvalidUsageOfOptionException("protocol");
    }
  }

  private void processHost(SyslogServerConfigBuilder builder, List<String> values) {
    if (values.size() != 1) {
      throw new InvalidUsageOfOptionException("host");
    }
    builder.host(values.get(0));
  }

  private void processPort(SyslogServerConfigBuilder builder, List<String> values) {
    if (values.size() != 1) {
      throw new InvalidUsageOfOptionException("port");
    }
    try {
      builder.port(Integer.parseInt(values.get(0)));
    } catch (IllegalArgumentException e) {
      throw new InvalidUsageOfOptionException("port");
    }
  }
}
