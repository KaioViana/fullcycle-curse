import { Address } from "../../../@shared/domain/value-object/address.value-object";
import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { InvoiceEntity } from "../../domain/invoice.entity";
import { ProductEntity } from "../../domain/product.entity";
import { IInvoiceGateway } from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate.usecase.dto";

class GenerateUseCase implements IUseCase {
  constructor(
    private readonly invoiceRepository: IInvoiceGateway,
  ) { }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address({
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
    });
    const items = input.items.map(item => new ProductEntity({
      id: new Id(item.id),
      name: item.name,
      price: item.price,
    }))
    const invoice = new InvoiceEntity({
      name: input.name,
      document: input.document,
      address,
      items,
    });

    await this.invoiceRepository.generate(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      })),
      total: invoice.total,
    }
  }
}

export { GenerateUseCase };
