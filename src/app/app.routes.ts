import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { NotFoundComponent } from './core/components/shared/not-found/not-found.component';
import { homeRoutes } from './features/home/home.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: AUTH_ROUTES,
  },
  {
    path: 'home',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: homeRoutes,
  },
  { path: '**', component: NotFoundComponent },
];
