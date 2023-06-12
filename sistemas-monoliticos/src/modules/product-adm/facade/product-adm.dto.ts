interface AddProductFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

interface CheckStockFacadeInputDto {
  productId: string;
}

interface CheckStockFacadeOutputDto extends CheckStockFacadeInputDto {
  stock: number;
}

export {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
}
