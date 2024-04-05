import {
  Directive,
  effect,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
  untracked,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ListService } from '../components/list/list.component';

@Directive({
  standalone: true,
  selector: '[skItemActiveLink]',
})
export class ItemActiveLinkDirective implements OnInit {
  private readonly listService = inject(ListService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly activeUrl = toSignal(
    this.activatedRoute.url.pipe(map((url) => url.join('/')))
  );

  linkActive = signal(false);
  skItemActiveLink = input.required<string>();

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.listService.setActive(this.skItemActiveLink());

    this.router.navigate([this.skItemActiveLink()], {
      relativeTo: this.activatedRoute.parent,
    });
  }

  readonly activeUrlCheck = effect(
    () => {
      const active = untracked(this.activeUrl) === this.skItemActiveLink();
      this.linkActive.set(active);
    },
    { allowSignalWrites: true }
  );

  ngOnInit(): void {
    const active = this.activeUrl() === this.skItemActiveLink();
    if (active) {
      setTimeout(() => {
        this.listService.setActive(this.skItemActiveLink());
      }, 16);
    }
  }
}
