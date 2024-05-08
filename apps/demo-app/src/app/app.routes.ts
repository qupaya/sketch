import { Route } from '@angular/router';
import { SelectSampleComponent } from './pages/select-sample/select-sample.component';
import { SelectDefaultComponent } from './pages/select-sample/select-default/select-default.component';
import { SelectWithStyleComponent } from './pages/select-sample/select-with-style/select-with-style.component';

const UUID_REGEX = /^[a-z,0-9,-]{36,36}$/;

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
    path: 'select',
    component: SelectSampleComponent,
    children: [
      {
        path: '',
        component: SelectDefaultComponent,
      },
      {
        path: 'with-style',
        component: SelectWithStyleComponent,
      },
    ],
  },
  {
    path: 'list-sample',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './pages/list-sample/pure-headless/pure-headless.component'
          ).then((m) => m.PureHeadlessComponent),
      },
      {
        path: 'with-styles',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './pages/list-sample/with-style/with-style.component'
              ).then((m) => m.WithStyleComponent),
          },
          {
            matcher: (segments) =>
              segments.length && UUID_REGEX.test(segments[0].path)
                ? { consumed: segments }
                : null,
            loadComponent: () =>
              import(
                './pages/list-sample/with-style/with-style.component'
              ).then((m) => m.WithStyleComponent),
          },
        ],
      },
    ],
  },
  {
    path: 'dialog-sample',
    loadComponent: () =>
      import('./pages/dialog-sample/dialog-sample.component').then(
        (m) => m.DialogSampleComponent
      ),
  },
  // TODO: Add routes for the other samples
];
