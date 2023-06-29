import { Address } from "../../../@shared/domain/value-object/address.value-object";
import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { InvoiceEntity } from "../../domain/invoice.entity";
import { ProductEntity } from "../../domain/product.entity";
import { FindUseCase } from "./find.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    generate: jest.fn(),
  }
}

describe('Find usecase unit test', () => {
  it('should find a invoice', async () => {
    const mockInvoiceId = new Id();
    const mockCreatedAt = new Date();
    const mockInvoice = new InvoiceEntity({
      id: mockInvoiceId,
      name: 'name',
      document: 'document',
      address: new Address({
        street: 'street',
        number: '123a',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zipcode',
      }),
      items: [
        new ProductEntity({
          price: 100,
          name: 'name',
        }),
        new ProductEntity({
          price: 100,
          name: 'name',
        }),
      ],
      createdAt: mockCreatedAt,
    })
    const repository = MockRepository();
    const usecase = new FindUseCase(repository);
    repository.find.mockResolvedValue(mockInvoice);

    const result = await usecase.execute({ id: mockInvoiceId.id });

    expect(repository.find).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual({
      id: mockInvoice.id.id,
      name: mockInvoice.name,
      document: mockInvoice.document,
      address: {
        street: mockInvoice.address.street,
        number: mockInvoice.address.number,
        complement: mockInvoice.address.complement,
        city: mockInvoice.address.city,
        state: mockInvoice.address.state,
        zipCode: mockInvoice.address.zipCode,
      },
      items: mockInvoice.items.map((item: ProductEntity) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: 200,
      createdAt: mockInvoice.createdAt,
    });
  });
});
