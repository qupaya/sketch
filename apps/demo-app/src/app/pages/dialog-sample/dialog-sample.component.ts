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
  isUnstyledBasicDialogOpen = false;
  isStyledBasicDialogOpen = false;
  isDialogWithOuterCloseButtonOpen = false;
  isDialogWithInnerCloseButtonOpen = false;
  isDialogWithStyledOuterCloseButtonOpen = false;
  isDialogWithStyledInnerCloseButtonOpen = false;

  closeButtonProperties: CloseButtonProperties = {
    title: 'Close me',
    iconSrc: '../../../assets/cross.svg',
    styles: {
      iconWidth: 20,
      iconHeight: 20,
      backgroundColor: 'coral',
      borderRadius: 10,
      border: 'none',
      padding: '10px',
      margin: '0',
    },
  };
}
