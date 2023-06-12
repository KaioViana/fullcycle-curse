interface ICheckStockInputDto {
  productId: string;
}

interface ICheckStockOutputDto extends ICheckStockInputDto {
  stock: number;
}

export { ICheckStockInputDto, ICheckStockOutputDto };
