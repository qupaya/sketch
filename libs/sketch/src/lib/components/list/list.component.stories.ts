import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import { ListComponent } from './list.component';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListProviderDirective } from './directives/list-provider.directive';
import { ListItemActiveDirective } from './directives/list-item-active.directive';

const meta: Meta<ListComponent> = {
  component: ListComponent,
  title: 'ListComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([
          {
            matcher: (segments) =>
              segments.length && segments[0].path
                ? { consumed: segments }
                : null,
            component: ListComponent,
          },
        ]),
      ],
    }),
    moduleMetadata({
      imports: [
        CommonModule,
        ListItemComponent,
        ListProviderDirective,
        ListItemActiveDirective,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<ListComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<sk-list skListProvider>
          <sk-list-item skListItemId="1">
            <span skLabel>Label 1</span>
          </sk-list-item>
          <sk-list-item skListItemId="2">
            <span skLabel>Label 2</span>
          </sk-list-item>
          <sk-list-item skListItemId="3">
            <span skLabel>Label 3</span>
          </sk-list-item>
          <sk-list-item skListItemId="4">
            <span skLabel>Label 4</span>
          </sk-list-item>
      </sk-list>`,
  }),
};

export const Nested: Story = {
  render: (args) => ({
    props: args,
    template: `<sk-list skListProvider skEnableRouting>
          <sk-list-item skListItemId="1">
            <span skLabel>Label 1</span>
            <sk-list skChilds>
                <sk-list-item skListItemId="11">
                  <span skLabel>Label 11</span>
                </sk-list-item>
                <sk-list-item skListItemId="12">
                  <span skLabel>Label 12</span>
                </sk-list-item>
                <sk-list-item skListItemId="13">
                  <span skLabel>Label 13</span>
                </sk-list-item>
                <sk-list-item skListItemId="14">
                  <span skLabel>Label 14</span>
                </sk-list-item>
            </sk-list>
          </sk-list-item>
          <sk-list-item skListItemId="2">
            <span skLabel>Label 2</span>
            <sk-list skChilds>
                <sk-list-item skListItemId="21">
                  <span skLabel>Label 21</span>
                </sk-list-item>
                <sk-list-item skListItemId="22">
                  <span skLabel>Label 22</span>
                </sk-list-item>
            </sk-list>
          </sk-list-item>
          <sk-list-item skListItemId="3">
            <span skLabel>Label 3</span>
            <sk-list skChilds>
                <sk-list-item skListItemId="31">
                  <span skLabel>Label 31</span>
                </sk-list-item>
                <sk-list-item skListItemId="32">
                  <span skLabel>Label 32</span>
                </sk-list-item>
                <sk-list-item skListItemId="33">
                  <span skLabel>Label 33</span>
                </sk-list-item>
            </sk-list>
          </sk-list-item>
          <sk-list-item skListItemId="4">
            <span skLabel>Label 4</span>
            <sk-list skChilds>
                <sk-list-item skListItemId="41">
                  <span skLabel>Label 41</span>
                </sk-list-item>
                <sk-list-item skListItemId="42">
                  <span skLabel>Label 42</span>
                </sk-list-item>
            </sk-list>
          </sk-list-item>
      </sk-list>`,
  }),
};
