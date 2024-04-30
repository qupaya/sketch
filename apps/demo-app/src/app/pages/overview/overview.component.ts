import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { SAMPLE_DATA } from '../list-sample/list-sample.data';
import { DialogComponent } from '@qupaya/sketch';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent, DialogComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  readonly listviewLinks = [
    {
      route: this.randomListSampleRoute(),
      label: 'List Sample with routing',
    },
    {
      route: '/list-sample',
      label: 'List Sample Headless Default',
    },
  ];

  readonly selectRoutes = [
    {
      route: '/select/with-style',
      label: 'Select Sample with styling',
    },
    {
      route: '/select',
      label: 'Select Sample Headless Default',
    },
  ];

  readonly widgetLinks = [
    {
      route: '/widget-sample',
      label: 'Widget Sample',
    },
  ];

  readonly dialogLinks = [
    {
      route: '/dialog-sample',
      label: 'Dialog Sample',
    },
  ];

  private randomListSampleRoute(): string {
    let route = 'list-sample/with-styles';
    let random = Math.floor(Math.random() * SAMPLE_DATA.length);
    const item = SAMPLE_DATA[random];
    if (item.children?.length) {
      route = item.route;
      random = Math.floor(Math.random() * item.children.length);
      const child = item.children[random];
      if (child.children?.length) {
        route = child.route;
        random = Math.floor(Math.random() * child.children.length);
        const grandChild = child.children[random];
        if (grandChild.route) {
          route = grandChild.route;
        }
      }
    }
    return route === '/list-sample/with-styles'
      ? route
      : `/list-sample/with-styles/${route}`;
  }
}
