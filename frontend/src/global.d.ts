
export { }

declare global {

  interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    empty: false;
    pageable: Pageable;
  }

  interface Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  }

  interface MessageNotification {
    [name: string]: number;
  }

  interface Log {
    timestamp: number;
    host: string;
    appName: string;
    processId: string;
    messageId: string;
    structuredData: string;
    message: string;
  }

  interface LogbackMessage {
    written_at: string;
    written_ts: number;
    component_name: string;
    component_id: string;
    organization_name: string;
    organization_id: string;
    space_name: string;
    space_id: string;
    container_id: string;
    type: string;
    logger: string;
    thread: string;
    level: string;
    categories: string[];
    msg: string;
  }

  interface TerminalStyle {
    foreground?: string;
    background?: string;
    fontStyle?: string;
  }

  interface Syslog {
    prioVersion: string;
    facility: number;
    level: number;
    version: number;
    timestamp: number;
    host: string;
    appName: string;
    procId: string;
    msgId: string;
    structuredData: string
    message: string;
  }
}