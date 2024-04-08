import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemActiveLinkDirective } from '../../directives/item-active.directive';
import { ListComponent, ListService } from '../list/list.component';

// TODO: rename with prefix sk
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
  // private readonly element = inject(ElementRef, { optional: true });
  private readonly activeLink = inject(ItemActiveLinkDirective, {
    optional: true,
  });
  readonly parent = inject(ListItemComponent, {
    optional: true,
    skipSelf: true,
  });
  readonly parentList = inject(ListComponent, {
    optional: true,
    skipSelf: true,
  });

  readonly active = signal(false);
  readonly me = computed(() =>
    this.listService
      .items()
      .find(({ id }) => id === this.activeLink?.skItemActiveLink())
  );
  readonly parentActive = computed(() => {
    const id = this.activeLink?.skItemActiveLink();
    return id ? this.listService.isParentActive(id) : true;
  });

  readonly registerListItem = effect(
    () => {
      const path = this.activeLink?.skItemActiveLink();
      if (path) {
        this.listService.registerItem(
          path,
          this.parent?.activeLink?.skItemActiveLink()
        );
      }
    },
    { allowSignalWrites: true }
  );

  /*readonly updateCssClasses = effect(() => {
    this.element?.nativeElement?.setAttribute(
      'part',
      this.me()?.active ? 'sk-item sk-active' : 'sk-item'
    );
  });*/

  readonly updateActiveState = effect(
    () => {
      if (this.activeLink) {
        const items = this.listService.items();
        const currentLink = untracked(this.activeLink.skItemActiveLink);
        const item = items.find(({ id }) => id === currentLink);
        this.active.set(item?.active ?? false);
        if (this.parentList && item?.active) {
          this.parentList.activateItem(item?.id);
        }
      }
    },
    { allowSignalWrites: true }
  );
}
