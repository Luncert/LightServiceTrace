package org.luncert.lstrace.base;

import static org.junit.Assert.assertEquals;

import org.junit.Assert;
import org.junit.Test;
import org.luncert.lstrace.syslog.rfc5424.Rfc5424SyslogEvent;

public class GoRouterMessageParserTest {

  @Test
  public void test() {
    var raw = "selfbilling-core-service-5ijd4fikhm7bwjzi.cert.cfapps.eu10.hana.ondemand.com - [2024-11-06T07:19:15.665422060Z] \"GET /odata/v2/CatalogService HTTP/1.1\" 200 0 200 \"https://sbi-allfeatures-cc3.dev-eu10.selfbilling.cloud.sap/launchpad\" \"Mozilla/5.0 (Macintosh;Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36\" \"10.0.200.1:28260\" \"10.36.194.7:61116\" x_forwarded_for:\"182.149.140.90, 10.0.200.7, 3.68.0.70, 10.0.200.1\" x_forwarded_proto:\"https\" vcap_request_id:\"a9e2abb2-599c-4ad0-5aaa-2150fda45825\" response_time:0.681420 gorouter_time:0.000088 app_id:\"4deedc1e-b769-42d2-8768-bc73be5734af\" app_index:\"0\" instance_id:\"ec23d142-9e26-4f2b-448e-59b4\" failed_attempts:0 failed_attempts_time:\"-\" dns_time:0.000000 dial_time:0.000889 tls_time:0.007050 backend_time:0.681332 x_cf_routererror:\"-\" x_correlationid:\"a9e2abb2-599c-4ad0-5aaa-2150fda45825\" tenantid:\"-\" sap_passport:\"-\" x_scp_request_id:\"3e5bacec-b578-4bad-bbfc-7a84ed06baa6-672B1873-DE868EC\" x_cf_app_instance:\"-\" x_forwarded_host:\"-\"x_custom_host:\"-\" x_ssl_client:\"1\" x_ssl_client_session_id:\"C12B73EEEF639DAF8508C3D230523852CD502B7517AC205A0A68E2199517EAE8\" x_ssl_client_verify:\"0\" x_ssl_client_subject_dn:\"L09VPWFwcDoxOWMwN2E4My0wYjZlLTQ3NzctOGNkNS1mYmYxYjE3NjFmYTYvT1U9c3BhY2U6MDA3ZjJlMmUtMmNjOC00NjkwLTk1NWYtYmFmM2EwNTJmZTk2L09VPW9yZ2FuaXphdGlvbjozN2I5MDk1MS0yZTJkLTQwYWYtOTA1NS0yNDlmZTkwZDA1ZDkvQ049NzIwYmE5NTktZmQ1Ni00OGRiLTZlY2ItYzAzMQ==\" x_ssl_client_subject_cn:\"NzIwYmE5NTktZmQ1Ni00OGRiLTZlY2ItYzAzMQ==\" x_ssl_client_issuer_dn:\"L0M9VVNBL089Q2xvdWQgRm91bmRyeS9DTj1pbnN0YW5jZUlkZW50aXR5Q0E=\" x_ssl_client_notbefore:\"241105165637Z\" x_ssl_client_notafter:\"241106165637Z\" x_cf_forwarded_url:\"-\" traceparent:\"00-58971ce1c4ed0252304737205a5a72c2-bab53f7bfaa07891-01\" true_client_ip:\"-\" x_request_id:\"-\" x_b3_traceid:\"a9e2abb2599c4ad05aaa2150fda45825\" x_b3_spanid:\"5aaa2150fda45825\" x_b3_parentspanid:\"-\" b3:\"a9e2abb2599c4ad05aaa2150fda45825-5aaa2150fda45825\"";

    var parser = new GoRouterMessageParser();
    var event = Rfc5424SyslogEvent.builder()
        .message(raw)
        .build();
    parser.postProcess(event);

    assertEquals("2024-11-06T07:19:15.665Z", event.getTimestamp());
    assertEquals("selfbilling-core-service-5ijd4fikhm7bwjzi.cert.cfapps.eu10.hana.ondemand.com - GET /odata/v2/CatalogService HTTP/1.1", event.getMessage());
    assertEquals(32, event.getAttrs().size());
  }
}
