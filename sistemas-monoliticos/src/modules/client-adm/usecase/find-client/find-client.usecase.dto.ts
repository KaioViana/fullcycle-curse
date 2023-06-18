interface FindClientInputDto {
  id: string;
}

interface FindClientOutputDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export { FindClientInputDto, FindClientOutputDto };
