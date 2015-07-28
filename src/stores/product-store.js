import {inject} from 'aurelia-framework';
import {Dispatcher, handle} from 'aurelia-flux';

@inject(Dispatcher)
export class ProductStore {
  products = [
    {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2, "image": "img/ipad-mini.png"},
    {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10, "image": "img/t-shirt.png"},
    {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5, "image": "img/sucker.png"}
  ];

  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  @handle('ve_add_to_cart')
  addToCart(action, product) {
    this.products.some(function(p) {
      if (p.id === product.id) {
        p.inventory = p.inventory > 0 ? p.inventory - 1 : 0
        return true;
      }
    });

    this.dispatcher.dispatch('se_products_changed', this.products);
  }

  @handle('ve_product_list_init')
  productListInit(action) {
    this.dispatcher.dispatch('se_products_changed', this.products);
  }
}
