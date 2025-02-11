import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Output,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent, merge, NEVER } from 'rxjs';

export const DEFAULT_POSITIONS: ConnectedPosition[] = [
  { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
];

@Directive({
  selector: '[skCdkOverlay]',
  standalone: true,
})
export class CdkOverlayDirective implements OnInit {
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly window = inject(DOCUMENT)?.defaultView;

  private readonly windowResize$ = this.window
    ? fromEvent(this.window, 'resize').pipe(debounceTime(500))
    : NEVER;

  readonly portal = input<CdkPortal | undefined>(undefined, {
    alias: 'skCdkOverlay',
  });
  readonly showOverlay = input(false, { alias: 'skCdkOverlayShow' });
  readonly showOverlay$ = toObservable(this.showOverlay);
  readonly connectedPositions = input(DEFAULT_POSITIONS, {
    alias: 'skCdkOverlayPositions',
  });
  readonly disposeDelay = input(0, { alias: 'skCdkOverlayDisposeDelay' });
  readonly relativeTo = input<HTMLElement | undefined>(undefined, {
    alias: 'skCdkOverlayRelativeTo',
  });
  readonly backdropClass = input<string>('cdk-overlay-transparent-backdrop', {
    alias: 'skCdkOverlayBackdropClass',
  });
  readonly panelClass = input<string>('cdk-overlay-panel', {
    alias: 'skCdkOverlayPanelClass',
  });
  readonly offsetX = input<number>(0, {
    alias: 'skCdkOverlayOffsetX',
  });
  readonly offsetY = input<number>(0, {
    alias: 'skCdkOverlayOffsetY',
  });
  @Output('skCdkOverlayVisible')
  readonly visible = new EventEmitter<boolean>();

  private _overlayRef?: OverlayRef;
  private _relatedElement?: HTMLElement =
    this.relativeTo() || this.elementRef.nativeElement;

  ngOnInit(): void {
    this.changeVisibility();
    this.updateOverlayPortalWidth();
  }

  private updateOverlayPortalWidth(): void {
    this.windowResize$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.syncOverlayWidth());
  }

  private changeVisibility(): void {
    this.showOverlay$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((showOverlay) => {
        if (this._relatedElement) {
          if (showOverlay) {
            this.createOverlay();
          } else {
            this.hide();
          }
        }
      });
  }

  private createOverlay(): void {
    if (!this._relatedElement) {
      return;
    }

    if (this._overlayRef?.hasAttached()) {
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

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    this._overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: this.backdropClass(),
      panelClass: this.panelClass(),
      positionStrategy,
      scrollStrategy,
    });

    this.syncOverlayWidth();

    this._overlayRef
      .attachments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.visible.emit(true));

    merge(this._overlayRef.backdropClick(), this._overlayRef.detachments())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.hide());

    this._overlayRef.attach(this.portal());
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
