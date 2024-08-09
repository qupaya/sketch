import {
  Component,
  input,
  output,
  viewChild,
  model,
  ElementRef,
  effect,
  untracked,
  inject,
} from '@angular/core';
import { ClickBackdropDirective } from './directive/click-backdrop.directive';
import { NgClass } from '@angular/common';
import { SkOverlayContainer } from '../overlay/overlay-container';

export enum CloseButtonPosition {
  Left = 'left',
  Right = 'right',
}

@Component({
  selector: 'sk-dialog',
  standalone: true,
  imports: [ClickBackdropDirective, NgClass],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  private readonly overlayContainer = inject(SkOverlayContainer);
  private readonly dialogOverlayContainerRef = viewChild.required<
    ElementRef<HTMLDivElement>
  >('dialogOverlayContainer');

  readonly open = model(false);

  readonly showCloseButton = input<boolean>(false);

  readonly innerCloseButton = input<boolean>(false);

  readonly closeButtonPosition = input<CloseButtonPosition>(
    CloseButtonPosition.Right
  );

  readonly fullscreen = input<boolean>(false);

  readonly contentShadow = input<boolean>(false);

  readonly CloseButtonPosition = CloseButtonPosition;

  readonly close = output<void>();

  private readonly dialogElement =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialogElement');

  protected readonly openEvents = effect(
    () => {
      const dialog = untracked(this.dialogElement);
      const containerRef = untracked(this.dialogOverlayContainerRef);

      if (this.open()) {
        dialog.nativeElement.showModal();
        this.overlayContainer.addContainer(containerRef.nativeElement);
      } else {
        dialog.nativeElement.close();
        this.overlayContainer.removeContainer();
      }
    },
    { allowSignalWrites: true }
  );
}
