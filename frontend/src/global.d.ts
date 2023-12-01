
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

  interface User {
    id: number;
    wxid: string;
    name: string;
    realName: string;
    phone: number;
    gender: string;
    level: string;
    status: string;
    registeredAt: number;
    lastSignInAt: number;
  }

  interface Order {
    id: number;
    createdBy: string;
    createdAt: number;
    productId: number;
    sku: number;
    amount: number;
    status: string;
  }

  interface Product {
    id: number;
    description: string;
    type: string;
    /**
     * Product image url.
     */
    image: string;
    brand: string;
    cost: number;
    price: number;
    /**
     * Set by product manager.
     */
    discountPrice: number;
    commission1: number;
    commission2: number;
    commission3: number;
    validityPeriod: number; // TODO: number?
    purchaseRestrictedAreas: string[];
    purchaseLimitPerOrder: number;
    purchaseLimitPerUser: number;
    lastModifiedAt: number;
  }

  interface Brand {
    name: string;
    logo?: string;
    description?: string;
  }

  interface TotalSalesReport {
    date: string;
    netValue: number;
  }

  interface RoleCollection {
    name: string;
    description: string;
    roles: string[];
    users: string[];
  }

  interface Role {
    name: string;
    description: string;
  }

  interface Log {
    id: number;
    operator: string;
    createdAt: number;
    behavior: string;
    dataField1: string;
    dataField2: string;
    dataField3: string;
    extraData: string;
  }
}