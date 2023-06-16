import {
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
} from "./store-catalog.facade.dto"

interface IStoreCatalogFacade {
  find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>
}

export { IStoreCatalogFacade }
