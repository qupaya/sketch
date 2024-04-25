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
  signal,
} from '@angular/core';
import { ClickBackdropDirective } from './directive/click-backdrop.directive';
import { NgClass } from '@angular/common';

interface CloseButtonStyles {
  buttonWidth?: number | string;
  buttonHeight?: number | string;
  borderRadius?: number;
  backgroundColor?: string;
  border?: string;
  iconWidth?: number | string;
  iconHeight?: number | string;
  padding?: string;
  margin?: string;
}

export interface CloseButtonProperties {
  title?: string;
  iconSrc?: string;
  styles?: CloseButtonStyles;
}

const initialButtonProperties: CloseButtonProperties = {
  title: 'Close',
  iconSrc: '../../../assets/cross.svg',
  styles: {
    iconWidth: 20,
    iconHeight: 20,
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0',
    margin: '0',
  },
};

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

  closeButtonProperties = input<CloseButtonProperties>();

  fullscreen = input<boolean>(false);

  contentShadow = input<boolean>(false);

  close = output<void>();

  private readonly dialogElement =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialogElement');

  readonly defaultCloseButtonProperties = signal<CloseButtonProperties>(
    initialButtonProperties
  );

  protected buttonPropsChanged = effect(
    () => {
      const newButtonProperties = this.closeButtonProperties();
      this.defaultCloseButtonProperties.update((defaultProps) => ({
        ...defaultProps,
        ...newButtonProperties,
      }));
    },
    { allowSignalWrites: true }
  );

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
