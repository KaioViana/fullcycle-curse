interface AddClientInputDto {
  id?: string;
  name: string;
  email: string;
  address: string;
}

interface AddClientOutputDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export { AddClientOutputDto, AddClientInputDto };
