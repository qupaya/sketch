import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { RouterOutlet } from '@angular/router';

export interface SelectDemoOption {
  label: string;
  icon: IconProp;
  value: number;
}

@Component({
  selector: 'app-select-sample',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './select-sample.component.html',
})
export class SelectSampleComponent {}
