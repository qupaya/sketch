import { Directive, HostListener, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ListService } from '../services/list.service';

@Directive({
  standalone: true,
  selector: '[skListItemId]',
})
export class ListItemActiveDirective implements OnInit {
  private readonly listService = inject(ListService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly activatedUrl = toSignal(
    this.activatedRoute.url.pipe(map((url) => url.join('/')))
  );

  itemId = input.required<string>({ alias: 'skListItemId' });
  enableRouting = input<boolean>(false, { alias: 'skEnableRouting' });

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.listService.setActive(this.itemId());
    if (this.enableRouting()) {
      this.router
        .navigate([this.itemId()], {
          relativeTo: this.activatedRoute.parent,
        })
        .catch(console.error);
    }
  }

  ngOnInit(): void {
    if (!this.enableRouting()) {
      return;
    }
    const active = this.activatedUrl()?.includes(this.itemId());
    if (active) {
      setTimeout(() => {
        this.listService.setActive(this.itemId());
      }, 16);
    }
  }
}
