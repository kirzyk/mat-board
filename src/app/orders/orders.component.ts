import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './list/orders-list.component';
import { OrdersService } from './services/orders.service';
import { Router } from '@angular/router';
import { AddOrderDialogComponent } from './add-order-dialog/add-order-dialog.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
    OrdersListComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public form!: FormGroup;
  public isModalVisible = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly snack: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly ordersService: OrdersService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  public addOrder(): void {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snack.open('Order added!', 'OK', { duration: 2000 });
      }
    });
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private createForm(): void {
    this.form = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      dueDate: ['', Validators.required],
      accepted: [false, Validators.requiredTrue],
    });
  }
}
