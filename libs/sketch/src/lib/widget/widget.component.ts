import {
  ChangeDetectionStrategy,
  Component, Directive, HostBinding,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sk-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent {
  @HostBinding('attr.part') public readonly skWidget = 'sk-widget';
}

@Component({
  selector: 'sk-widget-header',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content />`,
  styles: `:host { display: block }`,
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetHeaderComponent {
  @HostBinding('attr.part') public readonly skWidgetHeader = 'sk-widget-header';
}

@Component({
  selector: 'sk-widget-content',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content />`,
  styles: `:host { display: block }`,
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetContentComponent {
  @HostBinding('attr.part') public readonly skWidgetContent = 'sk-widget-content';
}

@Component({
  selector: 'sk-widget-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content />`,
  styles: `:host { display: block }`,
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetFooterComponent {
  @HostBinding('attr.part') public readonly skWidgetFooter = 'sk-widget-footer';
}