import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
} from '@angular/core';

@Directive({
  selector: '[skClickBackdrop]',
  standalone: true,
})
export class ClickBackdropDirective {
  private readonly dialogElementRef = inject<ElementRef>(ElementRef);

  clickedBackdrop = output<void>();

  @HostListener('click', ['$event'])
  onDocumentClick(event: PointerEvent): void {
    const dialogNativeElement = this.dialogElementRef.nativeElement;
    if (dialogNativeElement === event.target) {
      this.clickedBackdrop.emit();
    }
  }
}
