import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'sk-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  private readonly activeItemId = signal<string | undefined>(undefined);
  activeIdChanged = output<string>();

  activateItem(id: string): void {
    this.activeItemId.update(() => id);
    this.activeIdChanged.emit(id);
  }
}
