import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ListComponent,
  ListItemActiveDirective,
  ListItemComponent,
  ListProviderDirective,
} from '@qupaya/sketch';
import { RouterOutlet } from '@angular/router';
import { SAMPLE_DATA } from '../list-sample.data';
import { query, transition, trigger } from '@angular/animations';
import { slideFadeAnimationFactory } from '../../../animations/slide.animation';

@Component({
  selector: 'app-with-style',
  standalone: true,
  imports: [
    CommonModule,
    ListItemActiveDirective,
    ListItemComponent,
    ListComponent,
    RouterOutlet,
    ListProviderDirective,
  ],
  templateUrl: './with-style.component.html',
  styleUrl: './with-style.component.css',
  animations: [
    trigger('skListAnimation', [
      transition(':enter', [
        query(':enter', slideFadeAnimationFactory(), { optional: true }),
      ]),
    ]),
  ],
})
export class WithStyleComponent {
  readonly rootActiveId = signal<string | undefined>(undefined);
  readonly childActiveId = signal<string | undefined>(undefined);
  readonly grandChildActiveId = signal<string | undefined>(undefined);
  readonly items = signal(SAMPLE_DATA, {
    equal: (a, b) => a.length === b.length,
  });
}
