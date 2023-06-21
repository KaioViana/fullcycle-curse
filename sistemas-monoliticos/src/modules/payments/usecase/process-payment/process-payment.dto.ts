interface ProcessPaymentInputDto {
  orderId: string;
  amount: number;
}

interface ProcessPaymentOutputDto {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export { ProcessPaymentInputDto, ProcessPaymentOutputDto };
