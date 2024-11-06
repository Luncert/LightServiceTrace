package org.luncert.lstrace.base;

import static org.junit.Assert.assertEquals;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.luncert.lstrace.syslog.rfc5424.Rfc5424SyslogEvent;

public class JsonMessageParserTest {

  @Test
  public void test() throws JsonProcessingException {
    var msg = "{\"msg\":\"[Consumer clientId=consumer-com.sap.cf.sales.self.billing.consumer.sbwap.journalEntryConfirmation-21, groupId=com.sap.cf.sales.self.billing.consumer.sbwap.journalEntryConfirmation] LeaveGroup request with Generation{generationId=378, memberId='consumer-com.sap.cf.sales.self.billing.consumer.sbwap.journalEntryConfirmation-21-8507e3ff-37a5-40f5-8290-53376d8a6c60', protocol='range'} failed with error: Group authorization failed.\",\"level\":\"ERROR\",\"written_ts\":\"1730880630722147405\",\"logger\":\"org.apache.kafka.clients.consumer.internals.ConsumerCoordinator\",\"written_at\":\"2024-11-06T08:10:30.722Z\",\"thread\":\"org.springframework.kafka.KafkaListenerEndpointContainer#4-2-C-1\",\"type\":\"log\"}\n";

    var parser = new JsonMessageParser(new ObjectMapper());
    var log = Rfc5424SyslogEvent.builder()
        .message(msg)
        .build();
    parser.postProcess(log);

    assertEquals(0, log.getLevel());
    assertEquals("1730880630722", log.getTimestamp());
    assertEquals("org.apache.kafka.clients.consumer.internals.ConsumerCoordinator", log.getLogger());
    assertEquals("[Consumer clientId=consumer-com.sap.cf.sales.self.billing.consumer.sbwap.journalEntryConfirmation-21, groupId=com.sap.cf.sales.self.billing.consumer.sbwap.journalEntryConfirmation] LeaveGroup request with Generation{generationId=378, memberId='consumer-com.sap.cf.sales.self.billing.consumer.sbwap.journalEntryConfirmation-21-8507e3ff-37a5-40f5-8290-53376d8a6c60', protocol='range'} failed with error: Group authorization failed.", log.getMessage());
  }
}
