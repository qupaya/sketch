import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  SketchComponent,
  WidgetComponent,
  WidgetContentComponent,
  WidgetFooterComponent,
  WidgetHeaderComponent
} from '@qupaya/sketch';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    SketchComponent,
    TopBarComponent,
    WidgetComponent,
    WidgetHeaderComponent,
    WidgetFooterComponent,
    WidgetContentComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent {}
