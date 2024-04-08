import { Component, inject, Injectable, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ItemActiveLinkDirective,
  ListComponent,
  ListItemComponent,
} from '@qupaya/sketch';

interface DemoItem {
  label: string;
  link: string;
  children?: DemoItem[];
}

@Injectable({
  providedIn: 'root',
})
export class DemoListService {
  readonly items = signal<DemoItem[]>([]);

  constructor() {
    this.items.set(this.generateRandomList());
  }

  private generateRandomList(): DemoItem[] {
    const items = Array.of<DemoItem>();
    for (let i = 1; i <= 10; i++) {
      const item = {
        label: `Item ${i}`,
        link: `item-${i}`,
        children: Array.of<DemoItem>(),
      };
      const random = Math.floor(Math.random() * (1 - 10 + 1) + 1) * -1;
      for (let j = 1; j <= random; j++) {
        const child: DemoItem = {
          label: `Child ${j}`,
          link: `${item.link}/child-${j}`,
          children: Array.of<DemoItem>(),
        };
        const subRandom = Math.floor(Math.random() * (1 - 5 + 1) + 1) * -1;
        for (let k = 1; k <= subRandom; k++) {
          const subChild: DemoItem = {
            label: `Sub Child ${k}`,
            link: `${child.link}/sub-child-${k}`,
          };
          child.children?.push(subChild);
        }
        item.children.push(child);
      }
      items.push(item);
    }
    console.log('items', items);
    return items;
  }
}

@Component({
  selector: 'app-list-sample',
  standalone: true,
  imports: [
    CommonModule,
    ItemActiveLinkDirective,
    ListComponent,
    ListItemComponent,
  ],
  templateUrl: './list-sample.component.html',
  styleUrl: './list-sample.component.css',
})
export class ListSampleComponent implements OnInit {
  private readonly demoService = inject(DemoListService);
  readonly rootActiveId = signal<string | undefined>(undefined);
  readonly childActiveId = signal<string | undefined>(undefined);
  readonly grandChildActiveId = signal<string | undefined>(undefined);
  readonly items = signal<DemoItem[]>([]);

  ngOnInit(): void {
    if (this.items().length === 0) {
      this.items.set(this.demoService.items());
    }
  }
}
