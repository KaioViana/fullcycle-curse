interface AddProductInputDto {
  name: string;
  description: string;
  purchasePrice: number;
  stock: number
}

interface AddProductOutputDto extends AddProductInputDto {
  id?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export { AddProductInputDto, AddProductOutputDto };
