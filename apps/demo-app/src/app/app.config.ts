import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { appRoutes } from './app.routes';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SketchModule } from '@qupaya/sketch';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withViewTransitions(),
      withComponentInputBinding()
    ),
    provideAnimations(),
    importProvidersFrom(FontAwesomeModule),
    importProvidersFrom(SketchModule),
  ],
};
