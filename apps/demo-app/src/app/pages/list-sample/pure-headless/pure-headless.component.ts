import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ListComponent,
  ListItemActiveDirective,
  ListItemComponent,
  ListProviderDirective,
} from '@qupaya/sketch';
import { SAMPLE_DATA } from '../list-sample.data';

@Component({
  selector: 'app-pure-headless',
  standalone: true,
  imports: [
    CommonModule,
    ListItemActiveDirective,
    ListItemComponent,
    ListComponent,
    ListProviderDirective,
  ],
  templateUrl: './pure-headless.component.html',
  styleUrl: './pure-headless.component.css',
})
export class PureHeadlessComponent {
  readonly items = signal(SAMPLE_DATA, {
    equal: (a, b) => a.length === b.length,
  });
}
