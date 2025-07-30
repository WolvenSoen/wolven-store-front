import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    // {
    //   path: 'dashboard',
    //   loadComponent: () =>
    //   import('./dashboard/dashboard.component').then(
    //     (m) => m.DashboardComponent
    //   ),
    // },
  ];