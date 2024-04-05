import type { Meta, StoryObj } from '@storybook/angular';
import { SketchComponent } from './sketch.component';

const meta: Meta<SketchComponent> = {
  component: SketchComponent,
  title: 'SketchComponent',
};
export default meta;
type Story = StoryObj<SketchComponent>;

export const Primary: Story = {
  args: {},
};
