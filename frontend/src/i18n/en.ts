
export default ({
  title: "Service Trace",
  menu: {
    "log-explorer": "Explore",
    "log-streaming": "Streaming"
  },
  labels: {
  },
  model: {
    log: {
      id: "Id",
      timestamp: "Timestamp",
      host: "Host",
      appName: "App Name",
      processId: "Process ID",
      messageId: "Message ID",
      structuredData: "Structured Data",
      message: "Message",
    }
  }
});