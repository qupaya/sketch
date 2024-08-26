import { Component } from '@angular/core';
import {
  CloseButtonPosition,
  DialogComponent,
  SelectComponent,
  SelectOptionComponent,
} from '@qupaya/sketch';

@Component({
  selector: 'app-dialog-sample',
  standalone: true,
  imports: [DialogComponent, SelectComponent, SelectOptionComponent],
  templateUrl: './dialog-sample.component.html',
  styleUrl: './dialog-sample.component.css',
})
export class DialogSampleComponent {
  isBasicDialogOpen = false;
  isCompletelyStyledDialogOpen = false;
  isDialogWithOuterButtonOpen = false;
  isDialogWithInnerButtonOpen = false;
  isDialogWithOuterButtonLeftOpen = false;
  isDialogWithInnerButtonLeftOpen = false;
  isDialogWithFallbackButtonOpen = false;
  isDialogWithInnerFallbackButtonOpen = false;
  isDialogWithShadowOpen = false;
  isFullscreenDialogOpen = false;
  isDialogWithOverflowOpen = false;
  isDialogWithFancyColorsOpen = false;
  isDialogWithNestedDialogOpen = false;
  isNestedDialogOpen = false;
  isDefaultContentShadowOpen = false;
  isDialogWithSelectOpen = false;

  readonly CloseButtonPosition = CloseButtonPosition;
}
