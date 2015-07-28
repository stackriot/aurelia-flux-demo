import {inject} from 'aurelia-framework';
import {Dispatcher, handle} from 'aurelia-flux';

@inject(Dispatcher)
export class CartStore {
  productsInCart = [];

  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  @handle('ve_add_to_cart')
  addToCart(action, product) {
    var id = product.id;

    if (id in this.productsInCart) {
      this.productsInCart[id].quantity += 1;
    }
    else {
      this.productsInCart[id] = {
        "quantity": 1,
        "title": product.title,
        "price": product.price,
        "image": product.image,
        "id": id
      };
    }

    this.dispatcher.dispatch('se_cart_changed', this.productsInCart);
  }

  @handle('ve_checkout')
  checkout(action) {
    console.log('`You have purchased:', this.productsInCart);
    this.productsInCart = {};
    this.dispatcher.dispatch('se_cart_changed', this.productsInCart);
  }
}
