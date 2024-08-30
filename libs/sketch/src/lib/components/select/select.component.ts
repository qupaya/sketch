import {
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkOverlayDirective } from '../overlay/overlay.directive';
import { FormControlStatusObserver } from './form-control-status-observer';
import { SelectOptionComponent } from './components/select-option/select-option.component';
import { BehaviorSubject } from 'rxjs';

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
  private readonly elementRef = inject(ElementRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  private readonly selectedBox =
    viewChild.required<ElementRef<HTMLElement>>('selectedBox');

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly tabIndex = computed<number | undefined>(() =>
    this.disabled() ? undefined : 0
  );
  readonly isValid = input<boolean | undefined>(undefined);
  animationDelay = input(0);
  closeOnSelect = input(false);
  panelOffsetX = input(0);
  panelOffsetY = input(0);
  multiple = input(false, { transform: booleanAttribute });
  private readonly selectOptions = contentChildren(SelectOptionComponent);
  readonly value = model<T | T[] | undefined | null>(null);

  private isParentFocused = true;

  readonly filter$$ = new BehaviorSubject('');
  readonly filterChanged = output<string>();
  readonly useFilter = input(false, { transform: booleanAttribute });

  private readonly statusObserver = new FormControlStatusObserver(
    this.elementRef
  );

  readonly autoFocus = signal(true);
  readonly selectedValue = signal<T | T[] | undefined>(undefined);
  readonly panelIsVisible = signal(false);
  readonly showPlaceholder = computed(() => {
    const selectedValue = this.selectedValue();
    const isArrayOrString =
      Array.isArray(selectedValue) || typeof selectedValue === 'string';
    return !selectedValue || (isArrayOrString && selectedValue.length === 0);
  });

  readonly ngIsValid = computed(() => {
    const valid = this.statusObserver.isValid();
    const pristine = !this.statusObserver.isDirty();
    const untouched = !this.statusObserver.isTouched();

    if (pristine && untouched) {
      return undefined;
    }
    return valid;
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

  panelStateChanged(visible: boolean): void {
    this.togglePanel(visible);

    if (!visible) {
      if (!this.isParentFocused) {
        this.focusParent();
        this.isParentFocused = true;
      }
    } else if (this.isParentFocused) {
      this.focusSelectedElement();
      this.isParentFocused = false;
    }
  }

  private focusParent(): void {
    this.selectedBox().nativeElement.focus();
  }

  keyArrowUp({ target }: Event): void {
    if (target instanceof HTMLElement) {
      if (target.previousElementSibling instanceof HTMLElement) {
        target.previousElementSibling.focus();
      }
    }
  }

  deleteKey(event: Event): void {
    const filter = this.filter$$.value;
    this.filter$$.next(filter.slice(0, -1));

    event.stopImmediatePropagation();
    event.preventDefault();
  }

  deleteKeys(event: Event): void {
    if (this.filter$$.value.length === 0) {
      return;
    }
    this.filter$$.next('');

    event.stopImmediatePropagation();
    event.preventDefault();
  }

  logKey(event: KeyboardEvent): void {
    if (event.key.length !== 1 || !this.useFilter()) {
      return;
    }
    const filter = this.filter$$.value;
    this.filter$$.next(filter + event.key);

    event.stopImmediatePropagation();
    event.preventDefault();
  }

  private focusSelectedElement(): void {
    const selectOptions = this.selectOptions();
    if (selectOptions.length === 0) {
      return;
    }

    const value = this.value();
    if (value === undefined || value === null || this.multiple()) {
      selectOptions[0].focus();
      return;
    }

    (
      selectOptions.find((option) => option.value() === value) ??
      selectOptions[0]
    )?.focus();
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
