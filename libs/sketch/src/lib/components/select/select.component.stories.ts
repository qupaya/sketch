import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { SelectOptionComponent } from './components/select-option/select-option.component';

const meta: Meta<SelectComponent<number>> = {
  component: SelectComponent,
  title: 'SelectComponent',
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SelectComponent, SelectOptionComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<SelectComponent<number>>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<sk-select [closeOnSelect]="true">
          <span skSelectPlaceholder>Placeholder</span>
          <span skSelectLabel>Selected</span>
          <sk-select-option [value]="1">Option 1</sk-select-option>
          <sk-select-option [value]="2">Option 2</sk-select-option>
          <sk-select-option [value]="3">Option 3</sk-select-option>
          <sk-select-option [value]="4">Option 4</sk-select-option>
          <sk-select-option [value]="5">Option 5</sk-select-option>
          <sk-select-option [value]="6">Option 6</sk-select-option>
          <sk-select-option [value]="7">Option 7</sk-select-option>
          <sk-select-option [value]="8">Option 8</sk-select-option>
          <sk-select-option [value]="9">Option 9</sk-select-option>
          <sk-select-option [value]="10">Option 10</sk-select-option>
      </sk-select>`,
  }),
};
