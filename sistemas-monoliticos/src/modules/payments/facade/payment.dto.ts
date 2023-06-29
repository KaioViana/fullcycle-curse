interface ProcessPaymentOutputDto {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProcessPaymentInputDto {
  orderId: string;
  amount: number;
}

export { ProcessPaymentOutputDto, ProcessPaymentInputDto }
