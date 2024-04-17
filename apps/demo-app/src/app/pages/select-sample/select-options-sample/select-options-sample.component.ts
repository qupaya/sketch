import { Component, effect, HostBinding, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { query, transition, trigger } from '@angular/animations';
import { SelectOptionComponent } from '@qupaya/sketch';
import { slideFadeAnimationFactory } from '../../../animations/slide.animation';
import { fadeFactory } from '../../../animations/fade.animations';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { SelectDemoOption } from '../select-sample.component';

@Component({
  selector: 'app-select-options-sample',
  standalone: true,
  imports: [CommonModule, SelectOptionComponent, FaIconComponent],
  templateUrl: './select-options-sample.component.html',
  styleUrl: './select-options-sample.component.css',
  animations: [
    trigger('animation', [
      transition(
        '* => visible',
        query('sk-select-option', slideFadeAnimationFactory(), {
          optional: true,
        })
      ),
      transition(
        '* => hidden',
        query('sk-select-option', fadeFactory(1, 0, '350ms'), {
          optional: true,
        })
      ),
      transition(
        'visible => void',
        query('sk-select-option', fadeFactory(1, 0, '350ms'), {
          optional: true,
        })
      ),
    ]),
  ],
})
export class SelectOptionsSampleComponent {
  options = input.required<SelectDemoOption[]>();
  @HostBinding('@animation') animateOptions = 'hidden';

  show = input.required<boolean>();

  protected readonly toggleShow = effect(() => {
    this.animateOptions = this.show() ? 'visible' : 'hidden';
  });
}
