import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sk-sketch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sketch.component.html',
  styleUrl: './sketch.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SketchComponent {}
