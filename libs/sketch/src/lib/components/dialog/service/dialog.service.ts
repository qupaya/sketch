import {
  Injectable,
  Optional,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

interface OpenDialogParams {
  template: TemplateRef<unknown>;
  viewContainerRef: ViewContainerRef;
  backdropClass: string[];
  tag: string;
}

@Injectable()
export class DialogService {
  static dialogIdName = 'data-dialog-tag';

  constructor(
    @Optional() private readonly overlay: Overlay,
    private readonly scrollStrategyOptions: ScrollStrategyOptions
  ) {
    if (!overlay) {
      throw new Error(
        'The Dialog service needs that you inject OverlayModule into your (Lazy load module)'
      );
    }
  }

  private readonly overlaysMap = new Map<string, OverlayRef>();

  open(params: OpenDialogParams): void {
    if (this.overlaysMap.has(params.tag)) {
      throw Error(
        `The Dialog service has already an overlay with the same tag "${params.tag}"`
      );
    }

    const positionStrategy = this.overlay
      .position()
      .global()
      .centerVertically()
      .centerHorizontally();

    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: params.backdropClass,
      width: '100%',
      height: '100%',
      disposeOnNavigation: true,
      positionStrategy,
      scrollStrategy: this.scrollStrategyOptions.block(),
    });
    const dialogPortal = new TemplatePortal(
      params.template,
      params.viewContainerRef
    );
    overlayRef.attach(dialogPortal);
    overlayRef.hostElement.setAttribute(DialogService.dialogIdName, params.tag);
    this.overlaysMap.set(params.tag, overlayRef);
  }

  close(tag: string): void {
    if (this.overlaysMap.size > 0) {
      if (this.overlaysMap.has(tag)) {
        const overlay = this.overlaysMap.get(tag);
        if (overlay) {
          overlay.detach();
          overlay.dispose();
          this.overlaysMap.delete(tag);
        }
      }
    }
  }
}
