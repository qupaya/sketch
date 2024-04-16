import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
  selector: '[skMultiple]',
  standalone: true,
})
export class MultipleDirective {
  multiple = input(true, { transform: booleanAttribute, alias: 'skMultiple' });
}
