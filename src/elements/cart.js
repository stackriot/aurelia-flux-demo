import {inject} from 'aurelia-framework';
import {Dispatcher, handle} from 'aurelia-flux';
import {CartStore} from '../stores/cart-store';

@inject(Dispatcher, CartStore)
export class Cart {
  products = [];

  constructor(dispatcher, store) {
    this.dispatcher = dispatcher;
    this.store = store;
  }

  get totalPrice() {
    var totalPrice = 0;

    this.products.forEach(function(p) {
      totalPrice += p.price * p.quantity;
    });

    return totalPrice.toFixed(2);
  }

  checkout(e) {
    this.dispatcher.dispatch('ve_checkout');
  }

  @handle('se_cart_changed')
  cartChanged(action, productsInCart) {
    this.products = Object.keys(productsInCart).map(function(key) {
      return productsInCart[key];
    });
  }
}
