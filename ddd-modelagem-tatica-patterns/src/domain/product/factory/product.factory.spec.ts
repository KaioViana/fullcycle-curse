import { ProductFactory } from "./product.factory";

describe('Product factory unit test', () => {
  it('should create a product type a', async () => {
    const product = ProductFactory.create('a', 'Product A', 1);
    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product A');
    expect(product.constructor.name).toBe('Product');
  });
});
