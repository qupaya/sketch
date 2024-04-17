import {
  Component,
  HostBinding,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
  output,
  viewChild,
  OnDestroy,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogService } from './service/dialog.service';

@Component({
  selector: 'sk-dialog[dialogId]',
  standalone: true,
  imports: [CommonModule, CdkTrapFocus, OverlayModule],
  providers: [DialogService],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent implements OnDestroy {
  public static readonly defaultBackgroundClass = 'bg-[#00070ba1]';

  private readonly dialogService = inject(DialogService);
  private readonly viewContainerRef = inject(ViewContainerRef);

  @HostBinding('attr.data-dialog-tag')
  private _dialogId!: string;

  open = model(false);

  backdropClass = input<string[]>([DialogComponent.defaultBackgroundClass]);

  contentTemplate = input<TemplateRef<unknown> | null>(null);

  /**
   * Whether the CDK directive cdkTrapFocusAutoCapture should automatically move focus into the trapped region upon initialization and return focus to the previous activeElement upon destruction.
   *
   * This can not be desired when the popup is really long and the first button is not visible at start, otherwise the popup will scroll to the first button position!
   */
  focusAutoCapture = input<boolean>(true);

  /**
   * Useful when you want to control how your content is scrolled.
   */
  preventContentScrolling = input<boolean>(false);

  /**
   * It will be appended to the rendered overlay in this way:
   * ```
   * [dialogId]="my-tag-name"
   *
   * <div data-q-dialog-tag="my-tag-name">
   * ```
   */
  dialogId = input('');

  contentShadow = input<boolean>(true);

  showCloseButton = input<boolean>(true);

  fullscreen = input<boolean>(false);

  closeRequested = output<void>();

  private readonly contentWrapperTemplate = viewChild.required<
    TemplateRef<HTMLElement>
  >('contentWrapperTemplate');

  protected readonly updateDialogId = effect(
    () => (this._dialogId = this.dialogId())
  );

  protected readonly openEvents = effect(
    () => {
      if (this.open()) {
        this.dialogService.open({
          template: this.contentWrapperTemplate(),
          viewContainerRef: this.viewContainerRef,
          backdropClass: this.backdropClass(),
          tag: this.dialogId(),
        });
      } else {
        this.dialogService.close(this.dialogId());
      }
    },
    { allowSignalWrites: true }
  );

  ngOnDestroy(): void {
    this.dialogService.close(this._dialogId);
  }

  protected readonly console = console;
}
