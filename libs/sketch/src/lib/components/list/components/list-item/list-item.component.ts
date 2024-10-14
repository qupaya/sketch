import {
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { ListItemActiveDirective } from '../../directives/list-item-active.directive';
import { ListService } from '../../services/list.service';
import { ListComponent } from '../../list.component';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter, NEVER, withLatestFrom } from 'rxjs';

@Component({
  selector: 'sk-list-item',
  standalone: true,
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ListItemComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly listService = inject(ListService);
  private readonly activeItem = inject(ListItemActiveDirective, {
    optional: true,
  });
  private readonly parent = inject(ListItemComponent, {
    optional: true,
    skipSelf: true,
  });
  private readonly parentList = inject(ListComponent, {
    optional: true,
    skipSelf: true,
  });

  readonly active = signal(false);
  readonly listItem = computed(() =>
    this.listService.items().find(({ id }) => id === this.activeItem?.itemId())
  );
  readonly parentActive = computed(() => {
    const id = this.activeItem?.itemId();
    return id ? this.listService.isParentActive(id) : true;
  });

  readonly listItems$ = toObservable(this.listService.items);
  readonly activeItem$ = this.activeItem
    ? toObservable(this.activeItem.itemId)
    : NEVER;

  ngOnInit(): void {
    this.registerListItem();
    this.updateActiveState();
  }

  private registerListItem(): void {
    this.activeItem$
      .pipe(
        filter((path) => !!path),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((path) =>
        this.listService.registerItem(path, this.parent?.activeItem?.itemId())
      );
  }

  private updateActiveState(): void {
    if (this.activeItem) {
      this.listItems$
        .pipe(
          withLatestFrom(this.activeItem$),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(([items, currentLink]) => {
          const item = items.find(({ id }) => id === currentLink);
          if (this.parentList && item?.active) {
            this.parentList.activateItem(item?.id);
          }
          this.active.set(item?.active ?? false);
        });
    }
  }
}
