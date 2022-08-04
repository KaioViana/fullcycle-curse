import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

// agregado
let customer = new Customer('123', 'KaioViana');
const address = new Address('Ruaadois', 2, '12345-678', 'São Paulo');
customer.Address = address;

customer.activate();

// agregado
const item1 = new OrderItem('1', 'item 1', 10, "p1", 1);
const item2 = new OrderItem('2', 'item 2', 15, "p2", 2);
const item3 = new OrderItem('3', 'item 3', 20, "p3", 1);
const order = new Order('1', '123', [item1, item2, item3]);
