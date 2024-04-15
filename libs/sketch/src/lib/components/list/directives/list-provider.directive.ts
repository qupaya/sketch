import {
  AfterViewInit,
  Directive,
  forwardRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { ListService } from '../services/list.service';
import { ListComponent } from '../list.component';

@Directive({
  selector: '[skListProvider]',
  standalone: true,
  providers: [ListService],
})
export class ListProviderDirective implements OnInit, AfterViewInit {
  private readonly possibleParentList = inject(ListComponent, {
    optional: true,
    skipSelf: true,
  });
  private readonly listComponent = viewChild(forwardRef(() => ListComponent));

  ngOnInit(): void {
    if (this.possibleParentList) {
      throw new Error(
        'The ListProviderDirective must be set on root sk-list component.'
      );
    }
  }

  ngAfterViewInit(): void {
    if (!this.listComponent) {
      throw new Error(
        'The ListProviderDirective must be set on a sk-list component.'
      );
    }
  }
}
