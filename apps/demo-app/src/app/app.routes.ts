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
  {
    path: 'widget',
    loadComponent: () =>
      import('./pages/widget-sample/widget-sample.component').then(
        (m) => m.WidgetSampleComponent
      ),
  },
];
