import { Component, effect, HostBinding, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  AnimationMetadata,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SelectOptionComponent } from '@qupaya/sketch';

export const slideDeleteAnimation = (): AnimationMetadata => {
  return stagger('80ms', [
    sequence([
      animate(
        `200ms cubic-bezier(0.3, 0, 0.8, 0.15)`,
        style({
          transform: `translateX(-200%)`,
        })
      ),
      animate(
        `200ms ease`,
        style({
          height: 0,
        })
      ),
    ]),
  ]);
};

export const slideFadeAnimationFactory = (): AnimationMetadata[] => {
  return [
    style({ opacity: 0, transform: 'translateY(-1.5rem)', scale: 0.8 }),
    stagger('80ms', [
      animate(
        '350ms cubic-bezier(0.05, 0.7, 0.1, 1)',
        style({ opacity: 1, transform: 'translateY(0)', scale: 1 })
      ),
    ]),
  ];
};

export const fadeFactory = (
  from: number,
  to: number,
  duration = '200ms'
): AnimationMetadata[] => {
  return [
    style({ opacity: from }),
    animate(`${duration} ease`, style({ opacity: to })),
  ];
};

export const zoomFactory = (
  from: number,
  to: number,
  duration = '500ms'
): AnimationMetadata[] => {
  return [
    style({ opacity: from, scale: from }),
    animate(
      `${duration} cubic-bezier(0.05, 0.7, 0.1, 1)`,
      style({ opacity: to, scale: to })
    ),
  ];
};

@Component({
  selector: 'app-select-options-sample',
  standalone: true,
  imports: [CommonModule, SelectOptionComponent],
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
        query('sk-select-option', slideDeleteAnimation(), {
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
  @HostBinding('@animation') animateOptions = 'hidden';

  show = input.required<boolean>();

  protected readonly toggleShow = effect(() => {
    this.animateOptions = this.show() ? 'visible' : 'hidden';
  });
}
