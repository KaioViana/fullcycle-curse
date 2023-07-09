interface placeOrderInputDto {
  clientId: string;
  products: {
    productId: string;
  }[];
}

interface placeOrderOutputDto {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  products: {
    productId: string;
  }[]
}

export { placeOrderInputDto, placeOrderOutputDto };
