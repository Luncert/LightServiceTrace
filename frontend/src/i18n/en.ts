
export default ({
  title: "Service Trace",
  menu: {
    "log-explorer": "Explore",
    "log-streaming": "Streaming",
    "configuration": "Configuration"
  },
  labels: {
    filter: "Filter",
    connect: "Connect",
    clear: "Clear",
    disconnect: "Disconnect",
    showSourceSwitch: "Show Source",
    hideSourceSwitch: "Hide Source",
    total: "Total",
    themeSwitch: "Use dark theme",
    loggingFormat: "Logging Format",
    validate: "Validate"
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
  },
  "filter-settings": {
    title: "Filter Settings",
    tabs: {
      "column-control": "Column Control",
      "sorts": "Sorts"
    },
    sorts: {
      "field-name": "Column",
      order: "Order",
      active: "Active"
    },
    "column-control": {
      "field-name": "Column",
      visible: "Visible"
    }
  },
  configuration: {
    general: {
      sync: "Sync"
    },
    streaming: {
      deserializeJsonMessageCheckbox: "Deserialize JSON message",
      loggingFormat: {
        title: "Logging Formatter Script",
        conditionField: "Host",
        script: "Script",
        format: "Format"
      }
    }
  }
});