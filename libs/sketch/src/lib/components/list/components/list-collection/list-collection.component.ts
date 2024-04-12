import { Component, output, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'sk-list-collection',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: './list-collection.component.html',
  styleUrl: './list-collection.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ListCollectionComponent {
  private readonly activeItemId = signal<string | undefined>(undefined);
  activeIdChanged = output<string>();

  activateItem(id: string): void {
    this.activeItemId.update(() => id);
    this.activeIdChanged.emit(id);
  }
}
