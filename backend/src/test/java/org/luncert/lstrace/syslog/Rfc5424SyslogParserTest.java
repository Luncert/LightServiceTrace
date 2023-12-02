package org.luncert.lstrace.syslog;

import org.junit.Assert;
import org.junit.Test;

public class Rfc5424SyslogParserTest {

  public final Rfc5424BytesSyslogParser parser = new Rfc5424BytesSyslogParser();

  @Test
  public void test() {
    String source = "<14>1 2021-01-22T07:52:37.98708+08:00 Billingacceptance.acceptance.billing-businesslog d1ceed06-7d53-4b6a-87ed-2637db2dbc27 [RTR/5] - [tags@47450 __v1_type=\"LogMessage\" app_id=\"d1ceed06-7d53-4b6a-87ed-2637db2dbc27\" app_name=\"selfbilling-businesslog\" component=\"route-emitter\" deployment=\"cf\" index=\"2d717c7d-a342-4bd2-9474-58fd4045ca23\" instance_id=\"0\" ip=\"10.0.129.10\" job=\"router\" organization_id=\"6fa944c8-5f1f-46f8-8956-044c325b2b26\" organization_name=\"LoB Sales Self-Billing_acceptance\" origin=\"gorouter\" process_id=\"d1ceed06-7d53-4b6a-87ed-2637db2dbc27\" process_instance_id=\"6ebd538c-496d-401d-6004-0c7f\" process_type=\"web\" source_type=\"APP/PROC/WEB\" space_id=\"5afb789f-b8c9-4f50-b85f-80c045ad4509\" space_name=\"acceptance\"] selfbilling-businesslog.cfapps.sap.hana.ondemand.com - [2021-01-22T07:52:37.962348813Z] \"GET /v1/logs?page=0&size=16&lastNHours=1&tenant=4b34dcf4-4336-47e1-9ab7-27820ca7d7bf HTTP/1.1\" 200 0 229283 \"https://selfbilling-businesslog-ui.cfapps.sap.hana.ondemand.com/\" \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36\" \"-\" \"10.0.73.121:61230\" x_forwarded_for:\"-\" x_forwarded_proto:\"https\" vcap_request_id:\"fba6ae99-bf95-4dcb-76d0-951fbb2f1c56\" response_time:0.024618 gorouter_time:0.000123 app_id:\"d1ceed06-7d53-4b6a-87ed-2637db2dbc27\" app_index:\"0\" x_cf_routererror:\"-\" x_correlationid:\"-\" tenantid:\"-\" sap_passport:\"-\" x_scp_request_id:\"744769bc-900f-4579-8da4-eacfc0c9e0a9-600A8445-3A7B5\" x_cf_app_instance:\"-\" x_b3_traceid:\"e87a03522372656d\" x_b3_spanid:\"e87a03522372656d\" x_b3_parentspanid:\"-\" b3:\"e87a03522372656d-e87a03522372656d\"";
    Rfc5424SyslogEvent syslogEvent = parser.parse(source.getBytes());
    System.out.println(syslogEvent);
    Assert.assertNotNull(syslogEvent);
  }
}
