import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDemoOption } from '../select-sample.component';
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
import { SelectComponent, SelectOptionComponent } from '@qupaya/sketch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-default',
  standalone: true,
  imports: [CommonModule, SelectComponent, SelectOptionComponent, FormsModule],
  templateUrl: './select-default.component.html',
})
export class SelectDefaultComponent {
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
  selectedValue?: SelectDemoOption;
}
