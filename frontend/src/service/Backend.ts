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
      onReceivedLog(x as Syslog);
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

const x = {
  "facility": 1,
  "level": 6,
  "version": 0,
  "timestamp": 1704684652036,
  "host": "selfbilling-paas-eu10.selfbilling-dev-eu10.selfbilling-customizing-service-018c6201-ff19-00ed-ee43-681adfd",
  "appName": null,
  "procId": null,
  "msgId": null,
  "structuredData": null,
  "message": "{ \"written_at\":\"2024-01-08T03:17:09.822Z\",\"written_ts\":1704683829822126000,\"component_id\":\"bc73d9d8-f9c4-4e10-a78e-18fe9c079a7a\",\"space_name\":\"selfbilling-dev-eu10\",\"component_name\":\"selfbilling-customizing-service-018c6201-ff19-00ed-ee43-681adfd52cdb\",\"organization_id\":\"37b90951-2e2d-40af-9055-249fe90d05d9\",\"organization_name\":\"selfbilling-paas-eu10\",\"space_id\":\"9f386d19-3ab4-4ce8-b961-f456dde1cc0a\",\"container_id\":\"10.36.133.7\",\"type\":\"log\",\"logger\":\"org.apache.catalina.core.ContainerBase.[Tomcat].[localhost].[/].[dispatcherServlet]\",\"thread\":\"http-nio-8080-exec-10\",\"level\":\"ERROR\",\"categories\":[],\"msg\":\"Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is java.lang.NullPointerException: Cannot invoke \\\"java.util.List.iterator()\\\" because \\\"params\\\" is null] with root cause\",\"stacktrace\":[\"java.lang.NullPointerException: Cannot invoke \\\"java.util.List.iterator()\\\" because \\\"params\\\" is null\",\"\\tat selfbilling.customizing.service.impl.ActivationExtensionParameterServiceImpl.update(ActivationExtensionParameterServiceImpl.java:73)\",\"\\tat selfbilling.customizing.service.impl.ActivationExtensionParameterServiceImpl$$FastClassBySpringCGLIB$$b51b966d.invoke(<generated>)\",\"\\tat org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218)\",\"\\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.invokeJoinpoint(CglibAopProxy.java:792)\",\"\\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)\",\"\\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:762)\",\"\\tat org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:123)\",\"\\tat org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:388)\",\"\\tat org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119)\",\"\\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\",\"\\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:762)\",\"\\tat org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:707)\",\"\\tat selfbilling.customizing.service.impl.ActivationExtensionParameterServiceImpl$$EnhancerBySpringCGLIB$$abc21288.update(<generated>)\",\"\\tat selfbilling.customizing.controller.ExtensionParameterController.updateAll(ExtensionParameterController.java:57)\",\"\\tat java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\",\"\\tat java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(Unknown Source)\",\"\\tat java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(Unknown Source)\",\"\\tat java.base/java.lang.reflect.Method.invoke(Unknown Source)\",\"\\tat org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:205)\",\"\\tat org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:150)\",\"\\tat org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:117)\",\"\\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:895)\",\"\\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:808)\",\"\\tat org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)\",\"\\tat org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1072)\",\"\\tat org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:965)\",\"\\tat org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1006)\",\"\\tat org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:909)\",\"\\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:665)\",\"\\tat org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:883)\",\"\\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:750)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:209)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:153)\",\"\\tat org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:178)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:153)\",\"\\tat com.sap.dwc.util.mauth.tls.filter.SpringMvcTlsMAuthRequestFilter.doFilterInternal(SpringMvcTlsMAuthRequestFilter.java:38)\",\"\\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:117)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:178)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:153)\",\"\\tat com.sap.cf.sales.self.billing.common.servicecommon.component.httpinterceptor.HttpInterceptorFilter.doFilter(HttpInterceptorFilter.java:42)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:178)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:153)\",\"\\tat com.sap.dwc.util.headers.http.DwcHeaderRequestFilter.doFilterInternal(DwcHeaderRequestFilter.java:43)\",\"\\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:117)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:178)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:153)\",\"\\tat org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)\",\"\\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:117)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:178)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:153)\",\"\\tat org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)\",\"\\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:117)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:178)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:153)\",\"\\tat org.springframework.boot.actuate.metrics.web.servlet.WebMvcMetricsFilter.doFilterInternal(WebMvcMetricsFilter.java:96)\",\"\\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:117)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:178)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:153)\",\"\\tat org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)\",\"\\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:117)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:178)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:153)\",\"\\tat org.cloudfoundry.router.ClientCertificateMapper.doFilter(ClientCertificateMapper.java:79)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:178)\",\"\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:153)\",\"\\tat org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:168)\",\"\\tat org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:90)\",\"\\tat org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:481)\",\"\\tat org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:130)\",\"\\tat org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:93)\",\"\\tat org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:74)\",\"\\tat org.apache.catalina.valves.RemoteIpValve.invoke(RemoteIpValve.java:765)\",\"\\tat org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342)\",\"\\tat org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:390)\",\"\\tat org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63)\",\"\\tat org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:928)\",\"\\tat org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1794)\",\"\\tat org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52)\",\"\\tat org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1191)\",\"\\tat org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:659)\",\"\\tat org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)\",\"\\tat java.base/java.lang.Thread.run(Unknown Source)\"] }\n"
}