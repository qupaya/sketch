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

@Component({
  selector: 'sk-dialog[dialogId]',
  standalone: true,
  imports: [ClickBackdropDirective],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DialogComponent {
  public static readonly defaultBackgroundClass = 'bg-[#00070ba1]';

  open = model(false);

  //backdropClass = input<string[]>([DialogComponent.defaultBackgroundClass]);

  /**
   * It will be appended to the rendered overlay in this way:
   * ```
   * [dialogId]="my-tag-name"
   *
   * <div data-q-dialog-tag="my-tag-name">
   * ```
   */
  dialogId = input('');

  // contentShadow = input<boolean>(true);

  showCloseButton = input<boolean>(true);

  //fullscreen = input<boolean>(false);

  closeRequested = output<void>();

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
