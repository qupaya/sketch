import {
  Component,
  effect,
  HostBinding,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../../select.component';

@Component({
  selector: 'sk-select-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.css',
})
export class SelectOptionComponent<T> {
  private readonly parent = inject(SelectComponent);
  private tabIndexValue = 1;
  value = input.required<T>();
  tabIndex = input<number>();

  @HostBinding('tabindex')
  get tabindex(): number {
    return this.tabIndexValue;
  }

  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  @HostListener('click', ['$event'])
  selectItem(): void {
    this.parent.selectionChanged(this.value());
  }

  // WORKAROUND: This is a workaround until the HostBinding can also use as signal
  protected readonly updateTabIndex = effect(() => {
    this.tabIndexValue = this.tabIndex() ?? 1;
  });
}
