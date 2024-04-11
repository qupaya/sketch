import { Component, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MultipleDirective,
  SelectComponent,
  SelectOptionComponent,
} from '@qupaya/sketch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-sample',
  standalone: true,
  imports: [
    CommonModule,
    SelectComponent,
    SelectOptionComponent,
    MultipleDirective,
    FormsModule,
  ],
  templateUrl: './select-sample.component.html',
  styleUrl: './select-sample.component.css',
})
export class SelectSampleComponent {
  test = model<string | string[]>();
  multiple = signal(false);

  switchMultiple(event: Event): void {
    console.log('event', event);
    if ('checked' in event.target!) {
      this.multiple.set(event.target.checked as boolean);
    }
  }
}
