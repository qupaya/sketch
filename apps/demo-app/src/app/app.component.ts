import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SketchComponent } from '@qupaya/sketch';

@Component({
  standalone: true,
  imports: [RouterModule, SketchComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}
