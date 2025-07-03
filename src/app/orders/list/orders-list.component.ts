import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  combineLatest,
  startWith,
  debounceTime,
  map,
  Observable,
  BehaviorSubject,
} from 'rxjs';
import { OrdersService } from '../services/orders.service';
import { IOrder } from '../interfaces/orders.interface';

@Component({
  selector: 'orders-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  public searchControl: FormControl = new FormControl('');
  public orders$!: Observable<IOrder[]>;
  public filteredOrders$!: Observable<IOrder[]>;
  public pagedOrders$!: Observable<IOrder[]>;
  public tableHeaders: string[] = [
    'productName',
    'category',
    'quantity',
    'dueDate',
    'createdAt',
    'actions',
  ];
  public pageSize = 5;
  public pageIndex = 0;
  public length = 0;
  private pageChange$ = new BehaviorSubject<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 0, pageSize: 5 });

  constructor(private readonly ordersService: OrdersService) {}

  public ngOnInit(): void {
    this.ordersService.loadOrders();
    this.orders$ = this.ordersService.getOrders();
    this.filteredOrders$ = combineLatest([
      this.orders$,
      this.searchControl.valueChanges.pipe(startWith(''), debounceTime(300)),
    ]).pipe(
      map(([orders, search]) => {
        const term = (search || '').toLowerCase();
        return orders.filter(
          (order: IOrder) =>
            order.productName.toLowerCase().includes(term) ||
            order.category.toLowerCase().includes(term)
        );
      })
    );
    this.pagedOrders$ = combineLatest([
      this.filteredOrders$,
      this.pageChange$,
    ]).pipe(
      map(([orders, page]) => {
        this.length = orders.length;
        const start = page.pageIndex * page.pageSize;
        return orders.slice(start, start + page.pageSize);
      })
    );
  }

  public onPage(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pageChange$.next({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    });
  }

  public deleteOrder(id: string): void {
    this.ordersService.deleteOrder(id);
  }
}
