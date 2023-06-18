interface AddClientFacadeInputDto {
  name: string;
  email: string;
  address: string;
}

interface FindClientFacadeOutputDto {
  id: string;
  name: string;
  email: string;
  address: string;
}

export { AddClientFacadeInputDto, FindClientFacadeOutputDto }
