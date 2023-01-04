interface AppServiceInterface {
  getCustomers(): any;
  getCustomerById(id: string): any;
  getCustomerOrders(id: string): any;
  getProducts(): any;
  getItems(): any;
  getOrders(): any;
  getOrderById(id: string): any;
}

export { AppServiceInterface }
