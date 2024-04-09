import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  readonly items = signal<{ id: string; parentId?: string; active: boolean }[]>(
    []
  );

  registerItem(id: string, parentId?: string): void {
    const item = this.items().find((item) => item.id === id);
    if (!item) {
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
