import { Injectable } from '@angular/core';
import { cartItem} from '@ntig9/orders';

const cartName = 'cart'
@Injectable({
  providedIn: 'root'
})
export class CartServiceService {


  setCart(content: cartItem): void {
    const data =  this.getCartItem();
    if(data) {
      const index = data.indexOf((item: cartItem) => item.productID === item.productID);
      if (index > -1) {
        data[index].quantity += content.quantity;
      } else {
        data.push(content);
      }
      localStorage.setItem(cartName, JSON.stringify(data))
    }else {
      localStorage.setItem(cartName, JSON.stringify([content]));
    }
  }


  getCartItem() {
    const cart = localStorage.getItem(cartName)
    if (cart) {
      return JSON.parse(cart)
    }
  }

  emptyCart(): void {
    localStorage.removeItem(cartName);
  }

  // delete single item from cart
  deleteItem(id: string): void {
    const data = this.getCartItem();
    if (data) {
      const newData = data.filter((item: cartItem) => item.productID !== id);
      localStorage.setItem(cartName, JSON.stringify(newData));
    }
  }

}
