import {
  Component,
  HostBinding,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
  OnDestroy,
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
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DialogComponent implements OnDestroy {
  public static readonly defaultBackgroundClass = 'bg-[#00070ba1]';

  private readonly dialogService = inject(DialogService);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly dialogContentTemplate = signal<TemplateRef<unknown> | undefined>(
    undefined
  );

  @HostBinding('attr.data-dialog-tag')
  private _dialogId!: string;

  open = input(false);

  backdropClass = input<string[]>([DialogComponent.defaultBackgroundClass]);

  contentTemplate = input<TemplateRef<unknown> | null>(null);

  /**
   * Whether the CDK directive cdkTrapFocusAutoCapture should automatically move focus into the trapped region upon initialization and return focus to the previous activeElement upon destruction.
   *
   * This can not be desired when the popup is really long and the first button is not visible at start, otherwise the popup will scroll to the first button position!
   */
  readonly focusAutoCapture = input<boolean>(true);

  /**
   * Useful when you want to control how your content is scrolled.
   */
  readonly preventContentScrolling = input<boolean>(false);

  /**
   * It will be appended to the rendered overlay in this way:
   * ```
   * [dialogId]="my-tag-name"
   *
   * <div data-q-dialog-tag="my-tag-name">
   * ```
   */
  readonly dialogId = input('');

  readonly contentShadow = input<boolean>(true);

  readonly showCloseButton = input<boolean>(true);

  readonly fullscreen = input<boolean>(false);

  readonly closeRequested = output<void>();

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
}
