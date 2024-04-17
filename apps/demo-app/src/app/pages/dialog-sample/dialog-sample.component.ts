import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '@qupaya/sketch';

@Component({
  selector: 'app-dialog-sample',
  standalone: true,
  imports: [CommonModule, DialogComponent],
  templateUrl: './dialog-sample.component.html',
  styleUrl: './dialog-sample.component.css',
})
export class DialogSampleComponent {
  isDialogOpen = false;
}
