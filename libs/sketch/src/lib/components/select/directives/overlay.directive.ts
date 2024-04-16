import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { fromEvent, merge, Subject, takeUntil } from 'rxjs';

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
export class CdkOverlayDirective implements OnInit, OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly window = inject(DOCUMENT).defaultView;
  private readonly destroy$$ = new Subject<void>();

  portal = input<CdkPortal | undefined>(undefined, { alias: 'skCdkOverlay' });
  showOverlay = input(false, { alias: 'skCdkOverlayShow' });
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

  protected detectVisibleChange = effect(() => {
    if (this._relatedElement) {
      if (this.showOverlay()) {
        this.show();
      } else {
        this.hide();
      }
    }
  });

  public ngOnInit(): void {
    this._relatedElement = this.relativeTo() || this.elementRef.nativeElement;
    if (this.window) {
      fromEvent(this.window, 'resize')
        .pipe(takeUntil(this.destroy$$))
        .subscribe(() => this._syncOverlayWidth());
    }
  }

  public ngOnDestroy(): void {
    this.hide();
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  private show(): void {
    this.createOverlay();
  }

  private hide(): void {
    this.showChange.emit(false);
    this.window?.setTimeout(
      () => this._overlayRef?.dispose(),
      this.disposeDelay()
    );
  }

  private createOverlay(): void {
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

    this._syncOverlayWidth();

    this._overlayRef.attach(this.portal());
    merge(
      this._overlayRef.backdropClick(),
      this._overlayRef.detachments()
    ).subscribe(() => this.hide());
  }

  private _syncOverlayWidth(): void {
    this._overlayRef?.updateSize({
      width: this._relatedElement?.getBoundingClientRect().width,
    });
  }
}
