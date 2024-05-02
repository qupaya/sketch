import { Component } from '@angular/core';
import {
  GanttChartLineComponent,
  GanttComponent,
  GanttItemComponent,
} from '@qupaya/sketch';

@Component({
  selector: 'app-gantt-sample',
  standalone: true,
  imports: [GanttComponent, GanttChartLineComponent, GanttItemComponent],
  templateUrl: './gantt-sample.component.html',
  styleUrl: './gantt-sample.component.css',
})
export class GanttSampleComponent {
  date1 = new Date('01/01/2010 01:00:00');
  date2 = new Date('01/01/2010 02:00:00');
  date3 = new Date('01/01/2010 03:30:00');
  date4 = new Date('01/01/2010 04:00:00');
  date5 = new Date('01/01/2010 05:00:00');
}
