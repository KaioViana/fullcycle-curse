interface FindProductInputDto {
  id: string;
}

interface FindProductOutpudDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export { FindProductInputDto, FindProductOutpudDto };
