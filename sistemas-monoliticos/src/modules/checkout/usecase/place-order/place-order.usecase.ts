import { Address } from "../../../@shared/domain/value-object/address.value-object";
import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { IClientFacade } from "../../../client-adm/facade/client.facade.interface";
import { IInvoiceFacade } from "../../../invoice/facade/invoice.facade.interface";
import { IPaymentFacade } from "../../../payments/facade/payment.facade.interface";
import { IProductAdmFacade } from "../../../product-adm/facade/product-adm.facade.interface";
import { IStoreCatalogFacade } from "../../../store-catalog/facade/store-catalog.facade.interface";
import { ClientEntity } from "../../domain/client.entity";
import { OrderEntity } from "../../domain/order.entity";
import { ProductEntity } from "../../domain/product.entity";
import { ICheckoutGateway } from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

class PlaceOrderUseCase implements IUseCase {
  constructor(
    private readonly clientFacade: IClientFacade,
    private readonly productFacade: IProductAdmFacade,
    private readonly catalogFacade: IStoreCatalogFacade,
    private readonly paymentFacade: IPaymentFacade,
    private readonly invoiceFacade: IInvoiceFacade,
    private readonly checkoutRepository: ICheckoutGateway,
  ) {

  }
  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this.clientFacade.find(input.clientId);

    if (!client) {
      throw new Error('Client not found.');
    }

    await this.validateProducts(input.products);

    const products = await Promise.all(
      input.products.map(product => this.getProduct(product.productId)),
    );

    const clientEntity = new ClientEntity({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address(client.address),
    });

    const order = new OrderEntity({
      client: clientEntity,
      products,
    });

    const payment = await this.paymentFacade.processPayment({
      orderId: order.id.id,
      amount: order.total,
    });

    const invoice = payment.status === "approved" ?
      await this.invoiceFacade.generate({
        name: client.name,
        document: client.document,
        street: client.address.street,
        number: client.address.number,
        complement: client.address.complement,
        city: client.address.city,
        state: client.address.state,
        zipCode: client.address.zipCode,
        items: products.map(product => ({
          id: product.id.id,
          name: product.name,
          price: product.salesPrice
        }))
      }) : null;

    payment.status === "approved" && order.approve();
    await this.checkoutRepository.addOrder(order);

    return {
      id: order.id.id,
      invoiceId: payment.status === 'approved' ? invoice.id : null,
      status: order.status,
      total: order.total,
      products: products.map(product => ({ productId: product.id.id })),
    };
  }

  private async validateProducts(products: PlaceOrderInputDto['products']): Promise<void> {
    if (products.length === 0) {
      throw new Error('No products selected.');
    }

    for (const product of products) {
      const checkStock = await this.productFacade.checkStock({ productId: product.productId });
      if (checkStock.stock === 0) {
        throw new Error(`Product ${product.productId} is not available in stock.`);
      }
    }
  }

  private async getProduct(productId: string): Promise<ProductEntity> {
    const product = await this.catalogFacade.find({ id: productId });
    if (!product) {
      throw new Error('Product not found.');
    }

    return new ProductEntity({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }
}

export { PlaceOrderUseCase };
