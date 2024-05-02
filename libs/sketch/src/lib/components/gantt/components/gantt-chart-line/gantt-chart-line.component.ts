import {
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttItemComponent } from '../gantt-item/gantt-item.component';
import { GanttChartService } from '../../services/gantt-chart.service';

@Component({
  selector: 'sk-gantt-chart-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gantt-chart-line.component.html',
  styleUrl: './gantt-chart-line.component.css',
})
export class GanttChartLineComponent<T> {
  private readonly ganttChartService: GanttChartService<T> =
    inject(GanttChartService);

  readonly items = contentChildren(GanttItemComponent);

  private readonly rowTitleWrapper =
    viewChild.required<ElementRef<HTMLDivElement>>('rowTitleWrapper');
  public readonly rowTitleWidth = computed(() => {
    return this.rowTitleWrapper().nativeElement.getBoundingClientRect().width;
  });

  targetTitleWidth = this.ganttChartService.maxRowTitleWidth;
}
