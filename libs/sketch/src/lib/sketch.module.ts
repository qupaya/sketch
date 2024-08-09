import { NgModule } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SkOverlayContainer } from './components/overlay/overlay-container';

@NgModule({
  providers: [
    {
      provide: OverlayContainer,
      useExisting: SkOverlayContainer,
    },
  ],
})
export class SketchModule {}
