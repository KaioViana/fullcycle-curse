import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { ProductEntity } from "../../domain/product.entity";
import { IInvoiceGateway } from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "./find.usecase.dto";

class FindUseCase implements IUseCase {
  constructor(
    private readonly invoiceRepository: IInvoiceGateway,
  ) { }

  async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {
    const invoice = await this.invoiceRepository.find(input.id);

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map((item: ProductEntity) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
      createdAt: invoice.createdAt,
    }
  }
}

export { FindUseCase }
