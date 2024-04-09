import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { SAMPLE_DATA } from '../list-sample/list-sample.data';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  private readonly router = inject(Router);

  async openListSample(): Promise<boolean> {
    let link = 'list-sample';
    let random = Math.floor(Math.random() * SAMPLE_DATA.length);
    const item = SAMPLE_DATA[random];
    if (item.children?.length) {
      link = item.link;
      random = Math.floor(Math.random() * item.children.length);
      const child = item.children[random];
      if (child.children?.length) {
        link = child.link;
        random = Math.floor(Math.random() * child.children.length);
        const grandChild = child.children[random];
        if (grandChild.link) {
          link = grandChild.link;
        }
      }
    }
    link = link === 'list-sample' ? link : `list-sample/${link}`;
    return await this.router.navigate([`${link}`]);
  }
}
