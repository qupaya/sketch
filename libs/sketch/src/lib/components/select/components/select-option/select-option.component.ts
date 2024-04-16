import {
  Component,
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
  value = input.required<T>();

  @HostBinding('tabindex')
  get tabindex(): number {
    return 1;
  }

  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  enterItem(): void {
    this.parent.selectionChanged(this.value(), true);
  }

  @HostListener('click', ['$event'])
  selectItem(): void {
    this.parent.selectionChanged(this.value());
  }
}
