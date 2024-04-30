import { animate, AnimationMetadata, style } from '@angular/animations';

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
