import {
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  computed,
  forwardRef,
  HostListener,
  inject,
  Input,
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

  readonly animationDelay = input(0);
  readonly closeOnSelect = input(false);
  readonly panelOffsetX = input(0);
  readonly panelOffsetY = input(0);

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

  private readonly isMultiple = signal(false);

  @Input({ transform: booleanAttribute })
  set multiple(value: boolean) {
    this.isMultiple.set(value);

    const selectedValue = untracked(this.selectedValue);
    if (!value) {
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
  }

  readonly open = output<boolean>();

  @HostListener('document:keydown.escape')
  closePanel(): void {
    if (this.panelIsVisible()) {
      this.togglePanel(false);
    }
  }

  togglePanel(visible: boolean): void {
    this.panelIsVisible.set(visible);
    this.open.emit(visible);
  }

  selectionChanged(value: T): void {
    if (this.isMultiple()) {
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
