import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { debounceTime, fromEvent, merge } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export const DEFAULT_POSITIONS: ConnectedPosition[] = [
  { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
];

@Directive({
  selector: '[skCdkOverlay]',
  standalone: true,
})
export class CdkOverlayDirective {
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly window = inject(DOCUMENT)?.defaultView;

  private readonly windowResize = this.window
    ? toSignal(fromEvent(this.window, 'resize').pipe(debounceTime(500)))
    : undefined;

  portal = input<CdkPortal | undefined>(undefined, { alias: 'skCdkOverlay' });
  showOverlay = input(false, { alias: 'skCdkOverlayShow' });
  connectedPositions = input(DEFAULT_POSITIONS, {
    alias: 'skCdkOverlayPositions',
  });
  disposeDelay = input(0, { alias: 'skCdkOverlayDisposeDelay' });
  relativeTo = input<HTMLElement | undefined>(undefined, {
    alias: 'skCdkOverlayRelativeTo',
  });
  backdropClass = input<string>('cdk-overlay-transparent-backdrop', {
    alias: 'skCdkOverlayBackdropClass',
  });
  panelClass = input<string>('cdk-overlay-panel', {
    alias: 'skCdkOverlayPanelClass',
  });
  offsetX = input<number>(0, {
    alias: 'skCdkOverlayOffsetX',
  });
  offsetY = input<number>(0, {
    alias: 'skCdkOverlayOffsetY',
  });
  visible = output<boolean>({ alias: 'skCdkOverlayVisible' });

  private _overlayRef?: OverlayRef;
  private _relatedElement?: HTMLElement =
    this.relativeTo() || this.elementRef.nativeElement;

  protected readonly detectVisibleChange = effect(() => {
    if (this._relatedElement) {
      if (this.showOverlay()) {
        this.createOverlay();
      } else {
        this.hide();
      }
    }
  });

  protected readonly updateOverlayPortal = effect(() => {
    if (this.windowResize && this.windowResize()) {
      this.syncOverlayWidth();
    }
  });

  private createOverlay(): void {
    if (!this._relatedElement) {
      return;
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this._relatedElement)
      .withPositions(this.connectedPositions())
      .withPush(true)
      .withDefaultOffsetX(this.offsetX())
      .withDefaultOffsetY(this.offsetY())
      .withFlexibleDimensions(false);

    this._overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: this.backdropClass(),
      panelClass: this.panelClass(),
      positionStrategy,
    });

    this.syncOverlayWidth();

    this._overlayRef.attach(this.portal());
    merge(
      this._overlayRef.backdropClick(),
      this._overlayRef.detachments()
    ).subscribe(() => this.hide());
  }

  private hide(): void {
    this.visible.emit(false);
    setTimeout(() => this._overlayRef?.dispose(), this.disposeDelay());
  }

  private syncOverlayWidth(): void {
    this._overlayRef?.updateSize({
      width: this._relatedElement?.getBoundingClientRect().width,
    });
  }
}
