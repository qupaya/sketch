import {
  Component,
  Injectable,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from '../list-item/list-item.component';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  readonly items = signal<{ id: string; parentId?: string; active: boolean }[]>(
    []
  );

  registerItem(id: string, parentId?: string): void {
    const item = this.items().find((item) => item.id === id);
    if (!item && !this.items().find((item) => item.id === id)) {
      console.log('registerItem', id, parentId);
      this.items.update((items) => [...items, { id, parentId, active: false }]);
    }
  }

  setActive(id: string): void {
    const ids = this.getActiveIds(id);
    this.items.update((items) =>
      items.map((item) => ({
        ...item,
        active: ids.includes(item.id),
      }))
    );
  }

  isParentActive(id: string): boolean {
    const currentItem = this.items().find((item) => item.id === id);
    const parent = this.items().find(
      (item) => item.id === currentItem?.parentId
    );
    return parent?.active ?? false;
  }

  private getActiveIds(id: string): string[] {
    const items: string[] = [];
    items.push(id);
    const currentItem = this.items().find((item) => item.id === id);
    if (currentItem?.parentId) {
      items.push(...this.getActiveIds(currentItem.parentId));
    }
    return items;
  }
}

@Component({
  selector: 'sk-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ListComponent {
  private readonly activeItemId = signal<string | undefined>(undefined);
  activeIdChanged = output<string>();

  activateItem(id: string): void {
    this.activeItemId.update(() => id);
    this.activeIdChanged.emit(id);
  }
}
