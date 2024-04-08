import { Route, UrlSegment, UrlSegmentGroup } from '@angular/router';

export function htmlFiles(
  segments: UrlSegment[],
  group: UrlSegmentGroup,
  route: Route
) {
  console.log('htmlFiles', segments, group, route);
  if (!segments?.length) {
    return null;
  }
  return segments[0].path.indexOf('item-') > -1 ? { consumed: segments } : null;
}

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
        matcher: htmlFiles,
        loadComponent: () =>
          import('./pages/list-sample/list-sample.component').then(
            (m) => m.ListSampleComponent
          ),
      },
    ],
  },
];
