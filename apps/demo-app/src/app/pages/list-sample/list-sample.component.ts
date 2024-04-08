import {
  ChangeDetectionStrategy,
  Component,
  effect,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ItemActiveLinkDirective,
  ListComponent,
  ListItemComponent,
} from '@qupaya/sketch';
import { data } from './list-sample.data';
import { query, transition, trigger } from '@angular/animations';
import { slideFadeAnimationFactory } from '../../animations/slide.animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list-sample',
  standalone: true,
  imports: [
    CommonModule,
    ItemActiveLinkDirective,
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
export class ListSampleComponent implements OnDestroy {
  readonly rootActiveId = signal<string | undefined>(undefined);
  readonly childActiveId = signal<string | undefined>(undefined);
  readonly grandChildActiveId = signal<string | undefined>(undefined);
  readonly items = signal(data, { equal: (a, b) => a.length === b.length });

  protected readonly test = effect(
    () => {
      console.log('ListSampleComponent.items', this.items());
    },
    { allowSignalWrites: true }
  );

  ngOnDestroy(): void {
    console.log('ListSampleComponent.ngOnDestroy');
  }
}
