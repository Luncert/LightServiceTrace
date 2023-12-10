
export default ({
  title: "Service Trace",
  menu: {
    "log-explorer": "Explore",
    "log-streaming": "Streaming"
  },
  labels: {
    filter: "Filter",
    connect: "Connect",
    disconnect: "Disconnect",
    showSourceSwitch: "Show Source",
    hideSourceSwitch: "Hide Source",
    total: "Total",
    lightTheme: "Light",
    darkTheme: "Dark",
  },
  model: {
    log: {
      timestamp: "Timestamp",
      host: "Host",
      appName: "App Name",
      processId: "Process ID",
      messageId: "Message ID",
      structuredData: "Structured Data",
      message: "Message",
    }
  },
  message: {
    streaming: {
      on: "streaming started",
      off: "streaming stoped"
    }
  }
});