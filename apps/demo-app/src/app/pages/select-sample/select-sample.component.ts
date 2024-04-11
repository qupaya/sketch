import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MultipleDirective,
  SelectComponent,
  SelectOptionComponent,
} from '@qupaya/sketch';
import { FormsModule } from '@angular/forms';
import { SelectOptionsSampleComponent } from './select-options-sample/select-options-sample.component';

@Component({
  selector: 'app-select-sample',
  standalone: true,
  imports: [
    CommonModule,
    SelectComponent,
    SelectOptionComponent,
    MultipleDirective,
    FormsModule,
    SelectOptionsSampleComponent,
  ],
  templateUrl: './select-sample.component.html',
  styleUrl: './select-sample.component.css',
})
export class SelectSampleComponent {
  multiple = signal(false);
  value: { data: number } | { data: number }[] | undefined;
  selectedValue = signal<{ data: number } | { data: number }[] | undefined>(
    undefined
  );

  switchMultiple(event: Event): void {
    if ('checked' in event.target!) {
      this.multiple.set(event.target.checked as boolean);
    }
  }

  protected readonly Array = Array;
}
