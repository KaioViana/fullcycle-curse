interface IAddProductInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number
}

interface IAddProductOutputDto extends IAddProductInputDto {
  id?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export { IAddProductInputDto, IAddProductOutputDto };
