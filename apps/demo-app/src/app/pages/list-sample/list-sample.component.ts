import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ListComponent,
  ListItemActiveDirective,
  ListItemComponent,
} from '@qupaya/sketch';
import { SAMPLE_DATA } from './list-sample.data';
import { query, transition, trigger } from '@angular/animations';
import { slideFadeAnimationFactory } from '../../animations/slide.animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list-sample',
  standalone: true,
  imports: [
    CommonModule,
    ListItemActiveDirective,
    ListComponent,
    ListItemComponent,
    RouterOutlet,
  ],
  templateUrl: './list-sample.component.html',
  styleUrl: './list-sample.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('skListAnimation', [
      transition(':enter', [
        query(':enter', slideFadeAnimationFactory(), { optional: true }),
      ]),
    ]),
  ],
})
export class ListSampleComponent {
  readonly rootActiveId = signal<string | undefined>(undefined);
  readonly childActiveId = signal<string | undefined>(undefined);
  readonly grandChildActiveId = signal<string | undefined>(undefined);
  readonly items = signal(SAMPLE_DATA, {
    equal: (a, b) => a.length === b.length,
  });
}
