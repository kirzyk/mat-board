import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrder } from '../interfaces/orders.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private ordersSubject = new BehaviorSubject<IOrder[]>([]);

  constructor() {}

  public getOrders(): Observable<IOrder[]> {
    return this.ordersSubject.asObservable();
  }

  public addOrder(order: IOrder): void {
    const currentOrders = this.ordersSubject.value;
    const updatedOrders = [order, ...currentOrders];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    this.ordersSubject.next(updatedOrders);
  }

  public deleteOrder(id: string): void {
    const currentOrders = this.ordersSubject.value.filter(
      (order) => order.id !== id
    );
    localStorage.setItem('orders', JSON.stringify(currentOrders));
    this.ordersSubject.next(currentOrders);
  }

  public loadOrders(): void {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    this.ordersSubject.next(orders);
  }

  public refreshOrders(): void {
    this.loadOrders();
  }
}
