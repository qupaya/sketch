import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkOverlayDirective,
  DEFAULT_DROPOUT_POSITIONS,
} from './directives/overlay.directive';
import { CdkPortal } from '@angular/cdk/portal';
import { MultipleDirective } from './directives/multiple.directive';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sk-select',
  standalone: true,
  imports: [CommonModule, CdkOverlayDirective, CdkPortal],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent<T> implements ControlValueAccessor {
  private readonly multipleRef = inject(MultipleDirective, { optional: true });
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private onChange?: (value: T | T[] | undefined) => void;
  private onTouched?: () => void;
  readonly placeholder = input('Select an option');
  readonly selectedValue = signal<T | T[] | undefined>(undefined);
  readonly panelIsVisible = signal(false);

  readonly overlayPositions = DEFAULT_DROPOUT_POSITIONS;

  @ViewChild(CdkOverlayDirective)
  public overlay?: CdkOverlayDirective;

  selectionChanged(value: T): void {
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
      this.selectedValue.set(value);
    }
    this.onChange?.(
      this.selectedValue() ?? this.multipleRef?.multiple() ? [] : undefined
    );
    this.onTouched?.();
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
}
