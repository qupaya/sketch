import {
  Directive,
  effect,
  HostListener,
  inject,
  input,
  untracked,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ListService } from '../services/list.service';
import { ListProviderDirective } from './list-provider.directive';

@Directive({
  standalone: true,
  selector: '[skListItemId]',
})
export class ListItemActiveDirective {
  private readonly listService = inject(ListService);
  private readonly listProvider = inject(ListProviderDirective, {
    skipSelf: true,
  });
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly activatedUrl = toSignal(
    this.activatedRoute.url.pipe(map((url) => url.join('/')))
  );

  readonly itemId = input.required<string>({ alias: 'skListItemId' });

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.listService.setActive(this.itemId());
    if (this.listProvider.enableRouting()) {
      this.router
        .navigate([this.itemId()], {
          relativeTo: this.activatedRoute.parent,
        })
        .catch(console.error);
    }
  }

  protected readonly updateActiveItemId = effect(() => {
    const id = untracked(this.itemId);
    const active = this.activatedUrl()?.includes(id);
    if (active) {
      setTimeout(() => {
        this.listService.setActive(id);
      }, 16);
    }
  });
}
