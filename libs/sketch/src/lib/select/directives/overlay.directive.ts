import {
  Directive,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';

export const DEFAULT_POSITIONS: ConnectedPosition[] = [
  { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
];

export const DEFAULT_DROPOUT_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
];

@Directive({
  selector: '[skCdkOverlay]',
  standalone: true,
})
export class CdkOverlayDirective implements OnChanges, OnInit, OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly window = inject(DOCUMENT).defaultView;

  portal = input<CdkPortal | undefined>(undefined, { alias: 'skCdkOverlay' });
  show = input(false, { alias: 'skCdkOverlayShow' });
  connectedPositions = input(DEFAULT_POSITIONS, {
    alias: 'skCdkOverlayPositions',
  });
  disposeDelay = input(0, { alias: 'skCdkOverlayDisposeDelay' });
  relativeTo = input<HTMLElement | undefined>(undefined, {
    alias: 'skCdkOverlayRelativeTo',
  });

  showChange = output<boolean>({ alias: 'skCdkOverlayShowChange' });

  private _overlayRef?: OverlayRef;
  private _relatedElement?: HTMLElement;

  public ngOnInit(): void {
    this._relatedElement = this.relativeTo() || this.elementRef.nativeElement;
  }

  public ngOnChanges(): void {
    if (this._relatedElement) {
      if (this.show()) {
        this._show();
      } else {
        this._hide();
      }
    }
  }

  public ngOnDestroy(): void {
    this._hide();
  }

  private _show(): void {
    this._createOverlay();
  }

  private _hide(): void {
    this.window?.setTimeout(
      () => this._overlayRef?.dispose(),
      this.disposeDelay()
    );
  }

  private _createOverlay(): void {
    if (!this._relatedElement) {
      return;
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this._relatedElement)
      .withPositions(this.connectedPositions())
      .withPush(true)
      .withFlexibleDimensions(false);

    this._overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition({
        autoClose: true,
      }),
    });

    this._overlayRef.attach(this.portal());
    this._overlayRef.detachments().subscribe(() => {
      this._hide();
      this.showChange.emit(false);
    });
    this._overlayRef.backdropClick().subscribe(() => {
      this._overlayRef?.detach();
    });
  }
}
