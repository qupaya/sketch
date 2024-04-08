import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./pages/overview/overview.component').then(
        (m) => m.OverviewComponent
      ),
  },
  // TODO: Add routes for the other samples
];
