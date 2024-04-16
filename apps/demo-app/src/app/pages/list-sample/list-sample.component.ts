import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list-sample',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './list-sample.component.html',
  styleUrl: './list-sample.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSampleComponent {}
