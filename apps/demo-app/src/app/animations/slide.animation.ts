import {
  animate,
  AnimationMetadata,
  stagger,
  style,
} from '@angular/animations';

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
