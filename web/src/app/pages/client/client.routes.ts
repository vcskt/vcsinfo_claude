import { Route } from '@angular/router';

export const CLIENT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./client.component').then(m => m.ClientComponent),
  },
];
