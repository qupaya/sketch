import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent, SelectOptionComponent } from '@qupaya/sketch';
import { FormsModule } from '@angular/forms';
import { SelectOptionsSampleComponent } from './select-options-sample/select-options-sample.component';
import { query, transition, trigger } from '@angular/animations';
import {
  slideDeleteAnimation,
  slideFadeAnimationFactory,
} from '../../animations/slide.animation';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBell,
  faCog,
  faEnvelope,
  faGlobe,
  faHeart,
  faHome,
  faKey,
  faLock,
  faStar,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

export interface SelectDemoOption {
  label: string;
  icon: IconProp;
  value: number;
}

@Component({
  selector: 'app-select-sample',
  standalone: true,
  imports: [
    CommonModule,
    SelectComponent,
    SelectOptionComponent,
    FormsModule,
    SelectOptionsSampleComponent,
    FaIconComponent,
  ],
  templateUrl: './select-sample.component.html',
  styleUrl: './select-sample.component.css',
  animations: [
    trigger('animation', [
      transition(
        'hidden => visible',
        query('.sk-option', slideFadeAnimationFactory(), {
          optional: true,
        })
      ),
      transition(
        'visible => hidden',
        query('.sk-option', slideDeleteAnimation(), {
          optional: true,
        })
      ),
    ]),
  ],
})
export class SelectSampleComponent {
  readonly showAnimation = signal(false);
  readonly animateOptions = signal<'hidden' | 'visible'>('hidden');
  readonly multiple = signal(false);
  readonly selectedValues = signal<SelectDemoOption[]>([]);
  readonly options: SelectDemoOption[] = [
    { label: 'Option 1', icon: faHome, value: 1 },
    { label: 'Option 2', icon: faUser, value: 2 },
    { label: 'Option 3', icon: faCog, value: 3 },
    { label: 'Option 4', icon: faHeart, value: 4 },
    { label: 'Option 5', icon: faStar, value: 5 },
    { label: 'Option 6', icon: faBell, value: 6 },
    { label: 'Option 7', icon: faEnvelope, value: 7 },
    { label: 'Option 8', icon: faGlobe, value: 8 },
    { label: 'Option 9', icon: faLock, value: 9 },
    { label: 'Option 10', icon: faKey, value: 10 },
  ];

  value: number | number[] | undefined;

  switchMultiple(event: Event): void {
    if (event?.target && 'checked' in event.target) {
      this.multiple.set(event.target.checked as boolean);
    }
  }

  valueChanged(value: number | number[] | undefined): void {
    if (!value) {
      this.selectedValues.set([]);
    }
    if (Array.isArray(value)) {
      this.selectedValues.set(
        this.options.filter((option) => value.includes(option.value))
      );
    } else {
      const item = this.options.find((option) => option.value === value);
      this.selectedValues.set(item ? [item] : []);
    }
    this.value = value;
  }

  protected readonly runAnimation = effect(
    () => this.animateOptions.set(this.showAnimation() ? 'visible' : 'hidden'),
    { allowSignalWrites: true }
  );

  protected readonly Array = Array;
}
