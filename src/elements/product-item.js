import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {Dispatcher, handle} from 'aurelia-flux';

@inject(Dispatcher)
export class ProductItem {
  @bindable product = null;

  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  addToCart() {
    this.dispatcher.dispatch('ve_add_to_cart', this.product);
  }
}
