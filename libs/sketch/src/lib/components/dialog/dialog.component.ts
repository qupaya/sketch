import {
  Component,
  effect,
  input,
  output,
  viewChild,
  model,
  ViewEncapsulation,
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
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DialogComponent {
  open = model(false);

  showCloseButton = input<boolean>(false);

  innerCloseButton = input<boolean>(false);

  closeButtonPosition = input<CloseButtonPosition>(CloseButtonPosition.Right);

  fullscreen = input<boolean>(false);

  contentShadow = input<boolean>(false);

  readonly CloseButtonPosition = CloseButtonPosition;

  close = output<void>();

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
