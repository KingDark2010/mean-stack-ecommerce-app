import { Injectable } from '@angular/core';
import { cartItem } from '@ntig9/orders';
import { BehaviorSubject } from 'rxjs';

const cartName = 'cart'
@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cart$: BehaviorSubject<cartItem[]> = new BehaviorSubject(this.getCartItem());

  setCart(content: cartItem): void {
    let data =  this.getCartItem();
    if(data) {
      //check if content.productID is part of the cart
      const index = data.findIndex((item: { productID: string; }) => item.productID === content.productID);
      console.log(index);
      if(index > -1) {
        data[index].quantity += content.quantity;
      } else {
        data.push(content);
      }
    } else {
      data = [content];
    }
    this.cart$.next(data);
    return localStorage.setItem(cartName, JSON.stringify(data));
  }

  getCartItem() {
    const cart = localStorage.getItem(cartName)
    if (cart) {
      return JSON.parse(cart)
    }else {
      return [];
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
    }else {
      return;
    }
  }

  // update cart item
  updateCart(data: cartItem[]): void {
    localStorage.setItem(cartName, JSON.stringify(data));
  }

}
