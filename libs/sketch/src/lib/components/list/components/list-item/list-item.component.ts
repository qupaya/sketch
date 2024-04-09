import {
  Component,
  computed,
  effect,
  inject,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemActiveDirective } from '../../directives/list-item-active.directive';
import { ListComponent } from '../../list.component';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'sk-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ListItemComponent {
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

  readonly listItem = computed(() =>
    this.listService.items().find(({ id }) => id === this.activeItem?.itemId())
  );
  readonly parentActive = computed(() => {
    const id = this.activeItem?.itemId();
    return id ? this.listService.isParentActive(id) : true;
  });

  readonly registerListItem = effect(
    () => {
      const path = this.activeItem?.itemId();
      if (path) {
        this.listService.registerItem(path, this.parent?.activeItem?.itemId());
      }
    },
    { allowSignalWrites: true }
  );

  readonly updateActiveState = effect(
    () => {
      if (this.activeItem) {
        const items = this.listService.items();
        const currentLink = untracked(this.activeItem.itemId);
        const item = items.find(({ id }) => id === currentLink);
        if (this.parentList && item?.active) {
          this.parentList.activateItem(item?.id);
        }
      }
    },
    { allowSignalWrites: true }
  );
}
