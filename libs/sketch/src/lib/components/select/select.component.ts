import {
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  forwardRef,
  HostListener,
  inject,
  input,
  output,
  signal,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkOverlayDirective } from '../overlay/overlay.directive';

@Component({
  selector: 'sk-select',
  standalone: true,
  imports: [CdkOverlayDirective, CdkPortal, CdkTrapFocus],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SelectComponent<T> implements ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  animationDelay = input(0);
  closeOnSelect = input(false);
  panelOffsetX = input(0);
  panelOffsetY = input(0);
  multiple = input(false, { transform: booleanAttribute });

  readonly autoFocus = signal(true);
  readonly selectedValue = signal<T | T[] | undefined>(undefined);
  readonly panelIsVisible = signal(false);
  readonly showPlaceholder = computed(() => {
    const selectedValue = this.selectedValue();
    const isArray = Array.isArray(selectedValue);
    return (
      (!isArray && !selectedValue) || (isArray && selectedValue.length <= 0)
    );
  });

  readonly open = output<boolean>();

  @HostListener('document:keydown.escape')
  closePanel(): void {
    if (this.panelIsVisible()) {
      this.togglePanel(false);
    }
  }

  protected readonly updateSelectionMode = effect(
    () => {
      const selectedValue = untracked(this.selectedValue);
      if (!this.multiple()) {
        this.selectedValue.set(
          Array.isArray(selectedValue) ? selectedValue[0] : selectedValue
        );
      } else {
        this.selectedValue.set(
          Array.isArray(selectedValue)
            ? selectedValue
            : selectedValue
            ? [selectedValue]
            : undefined
        );
      }
      this.onChange?.(this.selectedValue());
      this.onTouched?.();
    },
    { allowSignalWrites: true }
  );

  togglePanel(visible: boolean): void {
    this.panelIsVisible.set(visible);
    this.open.emit(visible);
  }

  selectionChanged(value: T): void {
    if (this.multiple()) {
      this.selectedValue.update((selected) => {
        if (Array.isArray(selected)) {
          return selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value];
        }
        return [value];
      });
    } else {
      this.selectedValue.set(
        this.selectedValue() === value ? undefined : value
      );
    }

    this.onChange?.(this.selectedValue());
    this.onTouched?.();

    if (this.closeOnSelect()) {
      this.togglePanel(false);
    }
  }

  keyArrowUp({ target }: Event): void {
    if (target instanceof HTMLElement) {
      if (target.previousElementSibling instanceof HTMLElement) {
        target.previousElementSibling.focus();
      }
    }
  }

  keyArrowDown({ target }: Event): void {
    if (target instanceof HTMLElement) {
      if (target.nextElementSibling instanceof HTMLElement) {
        target.nextElementSibling.focus();
      }
    }
  }

  writeValue(obj: T | T[] | undefined): void {
    this.selectedValue.set(obj);
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (_: T | T[] | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private onChange?: (value: T | T[] | undefined) => void;
  private onTouched?: () => void;
}
