import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';
import { OrdersService } from '../services/orders.service';
import { IValueLabel } from '../interfaces/orders.interface';

@Component({
  selector: 'add-order-dialog',
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
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss'],
})
export class AddOrderDialogComponent implements OnInit {
  public orderForm!: FormGroup;
  public readonly categories: IValueLabel<string>[] = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'books', label: 'Books' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'toys', label: 'Toys' },
    { value: 'home', label: 'Home' },
    { value: 'garden', label: 'Garden' },
    { value: 'sports', label: 'Sports' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'other', label: 'Other' },
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ordersService: OrdersService,
    private readonly snack: MatSnackBar,
    private readonly dialogRef: MatDialogRef<AddOrderDialogComponent>
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  public save(): void {
    if (this.orderForm.invalid) {
      this.snack.open('Please fill out all required fields.', 'OK', {
        duration: 2500,
      });
      return;
    }
    const order = {
      id: uuidv4(),
      ...this.orderForm.value,
      createdAt: new Date().toISOString(),
    };
    this.ordersService.addOrder(order);
    this.snack.open('Order saved successfully!', 'OK', { duration: 2000 });
    this.dialogRef.close(true);
  }

  public close(): void {
    this.dialogRef.close(true);
  }

  private createForm(): void {
    this.orderForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      dueDate: ['', Validators.required],
      accepted: [false, Validators.requiredTrue],
    });
  }
}
