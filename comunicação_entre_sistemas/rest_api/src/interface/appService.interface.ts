interface AppServiceInterface {
  getCustomers(): any;
  getCustomerById(id: string): any;
  getProducts(): any;
  getItems(): any;
  getOrders(): any;
}

export { AppServiceInterface }
