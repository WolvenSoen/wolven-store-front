import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { NotFoundComponent } from './core/components/shared/not-found/not-found.component';
import { homeRoutes } from './features/home/home.routes';
import { MyCartComponent } from './features/my-cart/my-cart.component';
import { HomeComponent } from './features/home/home.component';
import { BuyWizzardComponent } from './features/buy-wizzard/buy-wizzard.component';

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
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'my-cart',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MyCartComponent
      }
    ]
  },
    {
    path: 'buy-wizzard',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: BuyWizzardComponent
      }
    ]
  },
  { path: '**', component: NotFoundComponent },
];
