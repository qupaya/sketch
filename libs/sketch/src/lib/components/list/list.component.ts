import { Component, output, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './components/list-item/list-item.component';

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
