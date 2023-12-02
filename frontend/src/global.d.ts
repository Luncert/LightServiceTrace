
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
    id: number;
    timestamp: number;
    host: string;
    appName: string;
    processId: string;
    messageId: string;
    structuredData: string;
    message: string;
  }
}