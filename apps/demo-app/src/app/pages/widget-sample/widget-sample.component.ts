import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  WidgetComponent,
  WidgetContentComponent,
  WidgetFooterComponent,
  WidgetHeaderComponent,
} from '@qupaya/sketch';

@Component({
  selector: 'app-widget-sample',
  standalone: true,
  imports: [
    CommonModule,
    WidgetComponent,
    WidgetHeaderComponent,
    WidgetContentComponent,
    WidgetFooterComponent,
  ],
  templateUrl: './widget-sample.component.html',
  styleUrl: './widget-sample.component.css',
})
export class WidgetSampleComponent {}
