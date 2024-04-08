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
    path: 'list-sample',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/list-sample/list-sample.component').then(
            (m) => m.ListSampleComponent
          ),
      },
      {
        path: ':rootId',
        loadComponent: () =>
          import('./pages/list-sample/list-sample.component').then(
            (m) => m.ListSampleComponent
          ),
      },
      {
        path: ':rootId/:parentId',
        loadComponent: () =>
          import('./pages/list-sample/list-sample.component').then(
            (m) => m.ListSampleComponent
          ),
      },
      {
        path: ':rootId/:parentId/:childId',
        loadComponent: () =>
          import('./pages/list-sample/list-sample.component').then(
            (m) => m.ListSampleComponent
          ),
      },
    ],
  },
];
