import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  CdkOverlayDirective,
  DEFAULT_DROPOUT_POSITIONS,
} from './directives/overlay.directive';
import { CdkPortal } from '@angular/cdk/portal';
import { MultipleDirective } from './directives/multiple.directive';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkTrapFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'sk-select',
  standalone: true,
  imports: [CommonModule, CdkOverlayDirective, CdkPortal, CdkTrapFocus],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent<unknown>),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SelectComponent<T> implements ControlValueAccessor, AfterViewInit {
  private readonly multipleRef = inject(MultipleDirective, { optional: true });
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly document = inject(DOCUMENT);

  readonly animationDelay = input(0);
  readonly open = output<boolean>();
  readonly selectedValue = signal<T | T[] | undefined>(undefined);
  readonly showPlaceholder = computed(() => {
    const selectedValue = this.selectedValue();
    const isArray = Array.isArray(selectedValue);
    return (
      (!isArray && !selectedValue) || (isArray && selectedValue.length <= 0)
    );
  });
  readonly panelIsVisible = signal(false);
  readonly options = contentChildren('sk-select-option', {
    descendants: true,
  });
  readonly overlayPositions = DEFAULT_DROPOUT_POSITIONS;

  protected updateSelectionMode = effect(
    () => {
      const selectedValue = untracked(this.selectedValue);
      if (!this.multipleRef?.multiple()) {
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

    if (visible) {
      setTimeout(() => {
        this.document.querySelector<HTMLElement>('sk-select-option')?.focus();
      }, 32);
    }
  }

  ngAfterViewInit(): void {
    console.log('SelectComponent.ngAfterViewInit', this.options());
  }

  selectionChanged(value: T, forceClose = false): void {
    if (this.multipleRef?.multiple()) {
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

    if (forceClose) {
      this.togglePanel(false);
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
  protected readonly Array = Array;
}
