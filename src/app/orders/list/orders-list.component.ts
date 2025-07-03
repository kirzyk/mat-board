import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { IOrder } from '../interfaces/orders.interface';
import { OrdersService } from '../services/orders.service';

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
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('deleteAnimation', [
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateX(-100%)' })
        ),
      ]),
    ]),
  ],
})
export class OrdersListComponent implements OnInit {
  public searchControl: FormControl = new FormControl('');
  public orders$!: Observable<IOrder[]>;
  public filteredOrders$!: Observable<IOrder[]>;
  public paginatedOrders$!: Observable<IOrder[]>;
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
    this.loadOrders();
    this.initFilters();
    this.initPagination();
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

  private loadOrders(): void {
    this.ordersService.loadOrders();
    this.orders$ = this.ordersService.getOrders();
  }

  private initFilters(): void {
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
  }

  private initPagination(): void {
    this.paginatedOrders$ = combineLatest([
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
}
