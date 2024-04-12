import { Component, effect, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MultipleDirective,
  SelectComponent,
  SelectOptionComponent,
} from '@qupaya/sketch';
import { FormsModule } from '@angular/forms';
import {
  SelectOptionsSampleComponent,
  slideDeleteAnimation,
  slideFadeAnimationFactory,
} from './select-options-sample/select-options-sample.component';
import {
  AnimationEvent,
  query,
  transition,
  trigger,
} from '@angular/animations';

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
  animations: [
    trigger('animation', [
      transition(
        'hidden => visible',
        query('.sk-option', slideFadeAnimationFactory(), {
          optional: true,
        })
      ),
      transition(
        'visible => hidden',
        query('.sk-option', slideDeleteAnimation(), {
          optional: true,
        })
      ),
    ]),
  ],
})
export class SelectSampleComponent {
  readonly showAnimation = signal(false);
  readonly animateOptions = signal<'hidden' | 'visible'>('hidden');
  readonly multiple = signal(false);
  readonly selectedValue = signal<
    { data: number } | { data: number }[] | undefined
  >(undefined);

  value: { data: number } | { data: number }[] | undefined;

  switchMultiple(event: Event): void {
    if ('checked' in event.target!) {
      this.multiple.set(event.target.checked as boolean);
    }
  }

  logAnimationData(event: AnimationEvent): void {
    console.log('animation event', event);
  }

  protected readonly runAnimation = effect(
    () => {
      this.animateOptions.set(this.showAnimation() ? 'visible' : 'hidden');
      console.log('runAnimation', untracked(this.animateOptions));
    },
    { allowSignalWrites: true }
  );

  protected readonly Array = Array;
}
