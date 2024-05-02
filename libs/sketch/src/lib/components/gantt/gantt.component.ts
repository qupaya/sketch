import { Component, contentChildren, effect, inject } from '@angular/core';
import { GanttChartService } from './services/gantt-chart.service';
import { GanttChartLineComponent } from './components/gantt-chart-line/gantt-chart-line.component';
import { GanttItemComponent } from './components/gantt-item/gantt-item.component';

@Component({
  selector: 'sk-gantt',
  standalone: true,
  templateUrl: './gantt.component.html',
  styleUrl: './gantt.component.css',
  providers: [GanttChartService],
})
export class GanttComponent<T> {
  private readonly ganttChartService = inject(GanttChartService);

  readonly lines = contentChildren(GanttChartLineComponent);

  // register all items together here for performance reasons
  readonly registerItems = effect(
    () => {
      const lines = this.lines();
      const items = lines.reduce(
        (acc, line) => [...acc, ...line.items()],
        [] as GanttItemComponent<T>[]
      );
      this.ganttChartService.setItems(items);
    },
    {
      allowSignalWrites: true,
    }
  );

  readonly handleRowTitleWidths = effect(
    () => {
      this.ganttChartService.computeMaxRowTitleWidth(
        this.lines().map((line) => line.rowTitleWidth())
      );
    },
    {
      allowSignalWrites: true,
    }
  );
}
