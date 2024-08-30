import { ElementRef, signal } from '@angular/core';

/**
 * Listens for changes of ng-classes on form controls. Provide the <code>ElementRef</code> of your form control
 * component (component that implements <code>ControlValueAccessor</code>).
 */
export class FormControlStatusObserver {
  private readonly mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.nodeType !== Node.ELEMENT_NODE) {
        return;
      }
      const classList = (mutation.target as HTMLElement).classList;

      this.isTouched.set(classList.contains('ng-touched'));
      this.isValid.set(classList.contains('ng-valid'));
      this.isDirty.set(classList.contains('ng-dirty'));
      this.isPending.set(classList.contains('ng-pending'));
    });
  });

  readonly isTouched = signal(false);
  readonly isValid = signal(false);
  readonly isDirty = signal(false);
  readonly isPending = signal(false);

  constructor(elementRef: ElementRef) {
    this.mutationObserver.observe(elementRef.nativeElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }
}
