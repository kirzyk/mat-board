export interface IOrder {
  id: string;
  productName: string;
  category: string;
  quantity: number;
  dueDate: string;
  accepted: boolean;
  createdAt: string;
}

export interface IValueLabel<T> {
  value: T;
  label: string;
}
