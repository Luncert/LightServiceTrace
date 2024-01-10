
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

  interface TerminalStyle {
    foreground?: string;
    background?: string;
    fontStyle?: string;
  }

  interface Syslog {
    prioVersion?: string;
    facility: number;
    level: number;
    version: number;
    timestamp: number;
    host: string;
    appName: string | null;
    procId: string | null;
    msgId: string | null;
    structuredData: string | null;
    message: string;
  }
}