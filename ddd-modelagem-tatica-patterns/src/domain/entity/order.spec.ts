import Order from "./order"
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("Customer id is required");
  });

  it("should throw error when orders is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("A order expects a least one item")
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "item 1", 100, "p1", 2);
    const item2 = new OrderItem("2", "item 2", 100, "p2", 2);
    const order = new Order("1", "1", [item]);
    const order2 = new Order("2", "2", [item, item2]);

    const totalOrder1 = order.total();
    const totalOrder2 = order2.total();

    expect(totalOrder1).toBe(200);
    expect(totalOrder2).toBe(400);
  });

  it("should throw if the item quantity is greater than zero", () => {
    expect(() => {
      const item = new OrderItem("123", "item 1", 100, "123", 0);
      const order = new Order("123", "123", [item]);
    }).toThrowError("Quantity must be greater than zero");
  })
})
