import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {}
