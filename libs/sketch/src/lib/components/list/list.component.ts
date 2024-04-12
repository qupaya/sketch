import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListService } from './services/list.service';

@Component({
  selector: 'sk-list',
  standalone: true,
  imports: [CommonModule],
  providers: [ListService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {}
