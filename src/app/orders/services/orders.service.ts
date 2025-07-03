import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrder } from '../interfaces/orders.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private orders$ = new BehaviorSubject<IOrder[]>([]);

  public getOrders(): Observable<IOrder[]> {
    return this.orders$.asObservable();
  }

  public addOrder(order: IOrder): void {
    const currentOrders = this.orders$.value;
    const updatedOrders = [order, ...currentOrders];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    this.orders$.next(updatedOrders);
  }

  public deleteOrder(id: string): void {
    const currentOrders = this.orders$.value.filter((order) => order.id !== id);
    localStorage.setItem('orders', JSON.stringify(currentOrders));
    this.orders$.next(currentOrders);
  }

  public loadOrders(): void {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    this.orders$.next(orders);
  }
}
