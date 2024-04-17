import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseButtonProperties, DialogComponent } from '@qupaya/sketch';

@Component({
  selector: 'app-dialog-sample',
  standalone: true,
  imports: [CommonModule, DialogComponent],
  templateUrl: './dialog-sample.component.html',
  styleUrl: './dialog-sample.component.css',
})
export class DialogSampleComponent {
  isDialogOpen = false;

  closeButtonProperties: CloseButtonProperties = {
    title: 'Close me',
    iconSrc: '../../../assets/cross.svg',
    styles: {
      iconWidth: 20,
      iconHeight: 20,
      backgroundColor: 'transparent',
      border: 'none',
      padding: '0',
      margin: '0',
    },
  };
}
