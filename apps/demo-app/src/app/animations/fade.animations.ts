import { animate, AnimationMetadata, style } from '@angular/animations';

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
