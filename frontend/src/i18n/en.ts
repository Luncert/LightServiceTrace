
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
  streaming: {
    customFilter: "Custom Filter"
  },
  configuration: {
    general: {
      sync: "Sync"
    },
    streaming: {
      enableCustomFilter: "Enable custom filter",
      enableCustomFilterTips: "Enable custom filter in Streaming view, and consume filter value in your formatter",
      enableCustomLoggingFormatter: "Enable custom logging formatter",
      enableCustomLoggingFormatterTips: "Enable custom logging formatter in Streaming view",
      loggingColorSchema: "Logging Color Schema",
      loggingFormatter: "Logging Formatter Script",
      resetLoggingFormatter: "Reset to template"
    }
  }
});