import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let product = new Product("", "Product1", 100);
    }).toThrowError('Id is required');
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let product = new Product("123", "", 100);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is less or equal than zero", () => {
    expect(() => {
      let product = new Product("123", "Product2", -100);
    }).toThrowError("Price must be an positive value greater than zero.");
  });

  it("should change name", () => {
    let product = new Product("123", "Product3", 100);
    product.changeName("new Product name");
    expect(product.name).toBe("new Product name");
  });

  it("should change price", () => {
    let product = new Product("123", "Product4", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});