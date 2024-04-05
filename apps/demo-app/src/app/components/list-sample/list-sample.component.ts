import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ItemActiveLinkDirective,
  ListComponent,
  ListItemComponent,
} from '@qupaya/sketch';

@Component({
  selector: 'app-list-sample',
  standalone: true,
  imports: [
    CommonModule,
    ItemActiveLinkDirective,
    ListComponent,
    ListItemComponent,
  ],
  templateUrl: './list-sample.component.html',
  styleUrl: './list-sample.component.css',
})
export class ListSampleComponent {}
