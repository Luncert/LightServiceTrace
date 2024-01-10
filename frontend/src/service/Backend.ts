import Axios from 'axios';
import config from './config';
import { Mod, styledString } from '../view/xterm/Colors';
import Xterm from '../view/xterm/Xterm';
import { t } from 'i18next';

const axios = Axios.create({
  baseURL: config.backend.endpoint
});

const colors = {
  streamOpened: 'rgb(63, 62, 77)',
  streamClosed: 'rgb(63, 62, 77)',
  streamingError: 'rgb(189, 69, 65)',
  bg: undefined,
};

class Backend {

  public async getLogs(criteria: string): Promise<Page<Log>> {
    return axios.get(`/v1/logs?criteria=${criteria}`)
      .then((rep) => {
        return rep.data;
      });
  }

  public streaming(criteria: string, term: Xterm, onReceivedLog: (log: Syslog) => void): StreamConnection {
    const streamConnection = new EventSource(
      `${config.backend.endpoint}/v1/logs/streaming?channel=streaming&criteria=${criteria}`
    );

    streamConnection.onopen = () => {
      term.writeln(
        styledString(
          '> ' + t("message.streaming.on"),
          colors.streamOpened,
          colors.bg,
          Mod.Bold
        )
      );
      x.forEach(onReceivedLog);
    };
    streamConnection.onmessage = (evt) => {
      console.warn('received unexpected event', evt);
    };
    streamConnection.addEventListener('streaming', (evt) => {
      const { data } = evt as any;
      
      for (const raw of data.split('\n')) {
        if (!raw) {
          continue;
        }

        const log = JSON.parse(raw) as Syslog;
        onReceivedLog(log);
      }
    });
    streamConnection.onerror = () => {
      console.log('error occured, session terminated');
      term.writeln(
        styledString(
          '> error occured, session terminated',
          colors.streamingError,
          colors.bg,
          Mod.Bold | Mod.Italic,
        )
      );
    };

    return ({
      close: () => {
        term.writeln(styledString('> ' + t("message.streaming.off"), colors.streamClosed, colors.bg, Mod.Bold));
        if (streamConnection.readyState !== streamConnection.CLOSED) {
          streamConnection.close();
        }
      }
    });
  }
}

export interface StreamConnection {
  close(): void;
}

let instance: Backend;

export default function getBackend() {
  if (!instance) {
    instance = new Backend();
  }
  return instance;
}

const x: Syslog[] = [
  {
    "facility": 1,
    "level": 1,
    "version": 0,
    "timestamp": 1704869331767,
    "host": "selfbilling-paas-eu10.selfbilling-performance-eu10.selfbilling-customizing-service-018ca423-03ac-dc74-ed98-ef5c2db",
    "appName": null,
    "procId": null,
    "msgId": null,
    "structuredData": null,
    "message": "test 你好"
  },
  {
    "facility": 1,
    "level": 2,
    "version": 0,
    "timestamp": 1704869331767,
    "host": "selfbilling-paas-eu10.selfbilling-performance-eu10.selfbilling-customizing-service-018ca423-03ac-dc74-ed98-ef5c2db",
    "appName": null,
    "procId": null,
    "msgId": null,
    "structuredData": null,
    "message": "test"
  },
  {
    "facility": 1,
    "level": 3,
    "version": 0,
    "timestamp": 1704869331767,
    "host": "selfbilling-paas-eu10.selfbilling-performance-eu10.selfbilling-customizing-service-018ca423-03ac-dc74-ed98-ef5c2db",
    "appName": null,
    "procId": null,
    "msgId": null,
    "structuredData": null,
    "message": "test"
  },
  {
    "facility": 1,
    "level": 4,
    "version": 0,
    "timestamp": 1704869331767,
    "host": "selfbilling-paas-eu10.selfbilling-performance-eu10.selfbilling-customizing-service-018ca423-03ac-dc74-ed98-ef5c2db",
    "appName": null,
    "procId": null,
    "msgId": null,
    "structuredData": null,
    "message": "test"
  },
  {
    "facility": 1,
    "level": 5,
    "version": 0,
    "timestamp": 1704869331767,
    "host": "selfbilling-paas-eu10.selfbilling-performance-eu10.selfbilling-customizing-service-018ca423-03ac-dc74-ed98-ef5c2db",
    "appName": null,
    "procId": null,
    "msgId": null,
    "structuredData": null,
    "message": "test"
  },
  {
    "facility": 1,
    "level": 6,
    "version": 0,
    "timestamp": 1704869331767,
    "host": "selfbilling-paas-eu10.selfbilling-performance-eu10.selfbilling-customizing-service-018ca423-03ac-dc74-ed98-ef5c2db",
    "appName": null,
    "procId": null,
    "msgId": null,
    "structuredData": null,
    "message": "selfbilling-customizing-service-NJTHVL6VGVFWM6QQ.cert.cfapps.eu10.hana.ondemand.com - [2024-01-10T06:33:54.808763709Z] \"GET /internal/extensionParameter/newOpenItem HTTP/1.1\" 200 0 2 \"-\" \"Apache-HttpClient/4.5.13 (Java/11.0.21)\" \"10.0.72.15:19612\" \"10.36.128.5:61208\" x_forwarded_for:\"3.126.95.250, 10.0.72.15\" x_forwarded_proto:\"https\" vcap_request_id:\"821a54bb-98b1-4127-7325-7682d2db65b0\" response_time:0.088923 gorouter_time:0.000073 app_id:\"300420dd-716b-49e4-8434-d02ef480b100\" app_index:\"0\" instance_id:\"c02c71be-05b4-4502-6979-1357\" failed_attempts:0 failed_attempts_time:\"-\" dns_time:0.000000 dial_time:0.000844 tls_time:0.007792 backend_time:0.088850 x_cf_routererror:\"-\" x_correlationid:\"bf3d38b4-b034-4caf-48d8-3b842e0aa737\" tenantid:\"-\" sap_passport:\"-\" x_scp_request_id:\"d7dd3da0-9cb2-4f71-895f-7a6cf8f853d7-659E3A52-332FA5\" x_cf_app_instance:\"-\" x_forwarded_host:\"-\" x_custom_host:\"-\" x_ssl_client:\"1\" x_ssl_client_session_id:\"F6E741E64F5A09798BF3718B78569257666647403CC3D3637A4C9661D87AEBFE\" x_ssl_client_verify:\"0\" x_ssl_client_subject_dn:\"L09VPWFwcDo2ZjUxYWNmNy02YThlLTQyNmYtOWQ2YS0yNzc0ZDI5ZGRmYjQvT1U9c3BhY2U6NGUzNzBlNDYtM2U4Ni00YTNlLTk5ZjItZmZlYjc1ZWFhMzg1L09VPW9yZ2FuaXphdGlvbjozN2I5MDk1MS0yZTJkLTQwYWYtOTA1NS0yNDlmZTkwZDA1ZDkvQ049YWQ4MGRjN2YtMmZmZS00OTgxLTYwNGYtNjhjNA==\" x_ssl_client_subject_cn:\"YWQ4MGRjN2YtMmZmZS00OTgxLTYwNGYtNjhjNA==\" x_ssl_client_issuer_dn:\"L0M9VVNBL089Q2xvdWQgRm91bmRyeS9DTj1pbnN0YW5jZUlkZW50aXR5Q0E=\" x_ssl_client_notbefore:\"240110031811Z\" x_ssl_client_notafter:\"240111031811Z\" x_cf_forwarded_url:\"-\" traceparent:\"00-f90c5d1375921f02ab129e6ae85af9cc-0f4c876210bbc7de-01\" x_b3_traceid:\"821a54bb98b1412773257682d2db65b0\" x_b3_spanid:\"73257682d2db65b0\" x_b3_parentspanid:\"-\" b3:\"821a54bb98b1412773257682d2db65b0-73257682d2db65b0\"\n"
  }
]