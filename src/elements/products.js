import {inject} from 'aurelia-framework';
import {Dispatcher, handle} from 'aurelia-flux';
import {ProductStore} from '../stores/product-store';

@inject(Dispatcher, ProductStore)
export class Products {
  products = [];

  constructor(dispatcher, store) {
    this.dispatcher = dispatcher;
    this.store = store;

    this.dispatcher.dispatch('ve_product_list_init');
  }

  @handle('se_products_changed')
   cartChanged(action, products) {
    this.products = products;
  }
}
