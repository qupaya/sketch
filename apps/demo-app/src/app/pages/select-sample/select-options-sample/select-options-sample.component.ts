import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectOptionComponent } from '@qupaya/sketch';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-select-options-sample',
  standalone: true,
  imports: [CommonModule, SelectOptionComponent],
  templateUrl: './select-options-sample.component.html',
  styleUrl: './select-options-sample.component.css',
  animations: [
    trigger('options', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-1.5rem)', scale: 0.8 }),
          stagger('80ms', [
            animate(
              '350ms cubic-bezier(0.05, 0.7, 0.1, 1)',
              style({ opacity: 1, transform: 'translateY(0)', scale: 1 })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class SelectOptionsSampleComponent {
  @HostBinding('@options') overlayAnimation = true;
}
