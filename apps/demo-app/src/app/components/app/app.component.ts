import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SketchComponent } from '@qupaya/sketch';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';

@Component({
  standalone: true,
  imports: [RouterModule, SketchComponent, TopBarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
