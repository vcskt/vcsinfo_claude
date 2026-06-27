import { Route } from '@angular/router';

export const ADMIN_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./admin.component').then(m => m.AdminComponent),
  },
];
