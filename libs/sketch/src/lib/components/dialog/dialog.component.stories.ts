import { ArgTypes, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CloseButtonPosition, DialogComponent } from './dialog.component';

const meta: Meta<DialogComponent> = {
  component: DialogComponent,
  tags: ['autodocs'],
  parameters: {},
  title: 'DialogComponent',
  decorators: [moduleMetadata({})],
};
export default meta;
type Story = StoryObj<DialogComponent>;

/**
 * This is the default Dialog with all controls.
 */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
    <style>
    sk-dialog {
      --sk-dialog-margin: 50px;
      --sk-dialog-background: lightblue;
    }
    
    button {
      cursor: pointer;
    }
    
    .normal-close-button {
      border: none;
      padding: 10px;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
    }
    
    .custom-close-button-style {
      border-radius: 100px;
      background-color: aquamarine;
      border: none;
      padding: 10px;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    </style>
    
    <button (click)="isDialogOpen = true">open Dialog</button>
    <sk-dialog [(open)]="isDialogOpen" (close)="isDialogOpen = false" [fullscreen]="fullscreen" [contentShadow]="contentShadow" [showCloseButton]="showCloseButton" [innerCloseButton]="innerCloseButton" [closeButtonPosition]="closeButtonPosition">
      <button class="normal-close-button" closeButton (click)="isDialogOpen = false">
        x
      </button>
      <p>This is the Content</p>
    </sk-dialog>
    `,
  }),
};
Default.args = {
  fullscreen: false,
  contentShadow: false,
  showCloseButton: false,
  innerCloseButton: false,
  closeButtonPosition: CloseButtonPosition.Right,
};
Default.argTypes = {
  fullscreen: {
    description: 'the option to take full width and height of viewport',
    defaultValue: { summary: false },
  },
  contentShadow: {
    description: 'the option to show a shadow (default or custom)',
    defaultValue: { summary: false },
  },
  showCloseButton: {
    description: 'the option to show or hide the close button',
    defaultValue: { summary: false },
  },
  innerCloseButton: {
    description: 'the option show the close button inside the container',
    defaultValue: { summary: false },
  },
  closeButtonPosition: {
    options: [CloseButtonPosition.Right, CloseButtonPosition.Left],
    control: { type: 'radio' },
    description: 'the position of the close button',
    defaultValue: { summary: CloseButtonPosition.Right },
  },
} satisfies ArgTypes;

/**
 * This is one unstyled Dialog and one completely styled Dialog. **Custom Properties** are used to style it.
 */
export const Styling: Story = {
  render: (args) => ({
    props: args,
    template: `
    <style>
    sk-dialog:last-child {
      --sk-dialog-width: 70%;
      --sk-dialog-height: 50%;
      --sk-dialog-margin: 50px;
      --sk-dialog-container-margin: 40px;
      --sk-dialog-container-padding: 40px;
      --sk-dialog-outer-close-button-space: 10px;
      --sk-dialog-inner-close-button-space: 15px;
      --sk-dialog-border-radius: 20px;
      --sk-dialog-border: 5px solid cornflowerblue;
      --sk-dialog-background: lightblue;
      --sk-dialog-content-shadow: rgb(0 0 0 / 20%) 0 10px 20px;
      --sk-dialog-overflow: scroll;
      --sk-dialog-backdrop: rgb(92 107 192 / 50%);
      --sk-dialog-backdrop-blur: 2px;
    }
    
    button {
      cursor: pointer;
    }
    
    
    .normal-close-button {
      border: none;
      padding: 10px;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
    }
    
    .custom-close-button-style {
      border-radius: 100px;
      background-color: aquamarine;
      border: none;
      padding: 10px;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    </style>
    
    <button (click)="isUnstyledDialogOpen = true">open unstyled Dialog</button>
    <sk-dialog [(open)]="isUnstyledDialogOpen" (close)="isUnstyledDialogOpen = false" [fullscreen]="fullscreen" [contentShadow]="contentShadow" [showCloseButton]="showCloseButton">
      <button class="normal-close-button" closeButton (click)="isUnstyledDialogOpen = false">
        x
      </button>
      <p>This is the Content</p>
    </sk-dialog>
    
    <br>
    <br>
    
    <button (click)="isStyledDialogOpen = true">open styled Dialog</button>
    <sk-dialog [(open)]="isStyledDialogOpen" (close)="isStyledDialogOpen = false" [fullscreen]="fullscreen" [contentShadow]="contentShadow" [showCloseButton]="showCloseButton">
      <button class="custom-close-button-style" closeButton (click)="isStyledDialogOpen = false">
        x
      </button>
      <p>This is the Content</p>
    </sk-dialog>
    `,
  }),
};
Styling.args = {
  fullscreen: false,
  contentShadow: false,
  showCloseButton: false,
};

/**
 * Here are all options for the Close Button.
 */
export const CloseButton: Story = {
  render: (args) => ({
    props: args,
    template: `
    <style>
    sk-dialog {
      --sk-dialog-margin: 50px;
      --sk-dialog-background: lightblue;
    }
    
    button {
      cursor: pointer;
    }
    
    .normal-close-button {
      border: none;
      padding: 10px;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
    }
    </style>
    
    <button (click)="isDialogOpen = true">open Dialog</button>
    <sk-dialog [(open)]="isDialogOpen" (close)="isDialogOpen = false" [showCloseButton]="showCloseButton" [innerCloseButton]="innerCloseButton" [closeButtonPosition]="closeButtonPosition">
      <button class="normal-close-button" closeButton (click)="isDialogOpen = false">
        x
      </button>
      <p>This is the Content</p>
    </sk-dialog>
    `,
  }),
};
CloseButton.args = {
  showCloseButton: true,
  innerCloseButton: false,
  closeButtonPosition: CloseButtonPosition.Right,
};
CloseButton.argTypes = {
  closeButtonPosition: {
    options: [CloseButtonPosition.Right, CloseButtonPosition.Left],
    control: { type: 'radio' },
  },
};

/**
 * This is a Dialog with a nested Dialog in it. It's possible to show/hide each Close Button.
 */
export const NestedDialog: StoryObj<
  DialogComponent & { showNestedCloseButton: boolean }
> = {
  render: (args) => ({
    props: args,
    template: `
    <style>
      sk-dialog {
        --sk-dialog-margin: 50px;
        --sk-dialog-background: lightblue;
      }
      
      sk-dialog:nth-child(3) {
        --sk-dialog-margin: 50px;
        --sk-dialog-background: lightpink;
        --sk-dialog-width: 70%;
        --sk-dialog-height: 70%;
      }
      
      .normal-close-button {
        border: none;
        padding: 10px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
      }
    </style>
    
    <button (click)="isDialogOpen = true">open Dialog</button>
    <sk-dialog [(open)]="isDialogOpen" (close)="isDialogOpen = false" [showCloseButton]="showCloseButton">
      <button class="normal-close-button" closeButton (click)="isDialogOpen = false">
        x
      </button>
      <p>This is the Content</p>
      
      <button (click)="isNestedDialogOpen = true">open nested Dialog</button>
      <sk-dialog [(open)]="isNestedDialogOpen" (close)="isNestedDialogOpen = false" [showCloseButton]="showNestedCloseButton">
        <button class="normal-close-button" closeButton (click)="isNestedDialogOpen = false">
         x
        </button>
        
        <p>This is the Content of the nested Dialog</p>
      </sk-dialog>
    </sk-dialog>
    `,
  }),
};
NestedDialog.args = {
  showCloseButton: false,
  showNestedCloseButton: false,
};
