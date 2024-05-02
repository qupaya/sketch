import { computed, Injectable, signal, untracked } from '@angular/core';
import { GanttItem } from '../types/gantt-item.interface';
import { GanttItemComponent } from '../components/gantt-item/gantt-item.component';

@Injectable()
export class GanttChartService<T> {
  public readonly items = signal<GanttItem<T>[]>([]);

  public readonly timeFrame = computed(() => {
    const items = this.items();

    if (items.length === 0) {
      return null;
    }

    const start = items
      .map((item) => item.start)
      .reduce((start1, start2) => (start1 < start2 ? start1 : start2)) as Date;

    const end = items
      .map((item) => item.end)
      .reduce((end1, end2) => (end1 > end2 ? end1 : end2));

    return { start, end, factor: 100 / (end.getTime() - start.getTime()) };
  });

  public readonly maxRowTitleWidth = signal<number | undefined>(undefined);

  public setItems(items: GanttItemComponent<T>[]): void {
    const itemMap = new Map(
      items.map((item) => [untracked(item.itemId), item])
    );

    const itemData = items.map((item) => {
      const itemStart = untracked(item.start);
      const endTime = untracked(item.end);
      let startTime: Date;
      if (itemStart instanceof Date) {
        startTime = itemStart;
      } else {
        const dependencyItem = itemMap.get(itemStart);
        startTime = dependencyItem ? untracked(dependencyItem.end) : endTime;
      }

      return {
        id: untracked(item.itemId),
        start: startTime,
        end: endTime,
      };
    });

    this.items.set(itemData);
  }

  public computeMaxRowTitleWidth(rowTitleWidths: number[]): void {
    this.maxRowTitleWidth.set(Math.max(...rowTitleWidths));
  }
}
