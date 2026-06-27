import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./pages/projects/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/blog-post/blog-post.component').then(m => m.BlogPostComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/signup/signup.component').then(m => m.SignupComponent),
  },
  {
    path: 'client',
    loadChildren: () => import('./pages/client/client.routes').then(m => m.CLIENT_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
