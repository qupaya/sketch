import {
  Component,
  effect,
  HostBinding,
  inject,
  input,
  untracked,
} from '@angular/core';
import { GanttChartService } from '../../services/gantt-chart.service';
import { GanttItem } from '../../types/gantt-item.interface';

@Component({
  selector: 'sk-gantt-item',
  standalone: true,
  templateUrl: './gantt-item.component.html',
  styleUrl: './gantt-item.component.css',
})
export class GanttItemComponent<T> {
  @HostBinding('style.width.%')
  width = 0;

  @HostBinding('style.left.%')
  left = 0;

  private readonly ganttChartService: GanttChartService<T> =
    inject(GanttChartService);

  itemId = input.required<T>();
  start = input.required<Date | T>();
  end = input.required<Date>();

  private readonly setPosition = effect(() => {
    const timeFrame = this.ganttChartService.timeFrame();

    if (!timeFrame) {
      return;
    }
    const { start, factor } = timeFrame;

    const startInput = untracked(this.start);
    let itemStart: Date;
    if (startInput instanceof Date) {
      itemStart = startInput;
    } else {
      const items = untracked<GanttItem<T>[]>(this.ganttChartService.items);
      const dependencyItem = items.find((item) => item.id === startInput);

      if (!dependencyItem) {
        return;
      }

      itemStart = dependencyItem.end;
    }

    this.left = (itemStart.getTime() - start.getTime()) * factor;
    this.width = (untracked(this.end).getTime() - itemStart.getTime()) * factor;
  });
}
