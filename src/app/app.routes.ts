import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { loggedInGuard } from './auth/guards/logged-in.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
    canActivate: [loggedInGuard],
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./orders/orders.component').then((m) => m.OrdersComponent),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
