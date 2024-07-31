import {
  Component,
  effect,
  input,
  output,
  viewChild,
  model,
  untracked,
  ElementRef,
} from '@angular/core';
import { ClickBackdropDirective } from './directive/click-backdrop.directive';
import { NgClass } from '@angular/common';

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

      if (this.open()) {
        dialog.nativeElement.showModal();
      } else {
        dialog.nativeElement.close();
      }
    },
    { allowSignalWrites: true }
  );
}
