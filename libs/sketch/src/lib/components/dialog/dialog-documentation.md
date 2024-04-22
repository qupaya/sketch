# Dialog

This Dialog gives you the option to show content in an global overlay. It is not connected to any component nor has any routing.

You can use it to provide information or interaction without leaving the context of the page.

## Basic Usage

First, let's have a look at the basic structure of the Dialog:

```html
<button (click)="isDialogOpen = true">open Dialog!</button>

<sk-dialog [(open)]="isDialogOpen" (closeRequested)="isDialogOpen = false">
  <div class="styled-wrapper">
    <p>here comes some content</p>
  </div>
</sk-dialog>
```

This is all you need to get started! But let's have a closer look at the options.

(It is recommended to place the dialog at the end of your code since it is not connected to anything.)

### open Dialog

To open the Dialog just create a starting point (a button for example) with a function that toggles a variable. For example:

```ts
isDialogOpen = false;
```

Use this variable in the model (`[(open)]="isDialogOpen"`) to bring your Dialog to life. Once the dialog is open, you can't interact with the underlying page, so pressing buttons or scrolling is not possible. When it is closed, you can interact with the page again.

### close Dialog

Closing can be performed in three different ways:

1. Clicking the [Backdrop](#backdrop)
2. Pressing Escape on the keyboard
3. Clicking the [Close button](#close-button)

All of these options are getting recognized by `(closeRequested)`. So just set your variable to false here and the Dialog will be closed.

## Styling

### Close Button

The close button is not shown by default. To show it, set `[showCloseButton]` to true.

It is a transparent button positioned in the top right corner with a black cross in it.
You can also adjust the styling of the button and the svg icon for your needs.

To customize the styling, create a variable of type `CloseButtonProperties` and assign the variable to this optional input in the template: `[closeButtonProperties]`.

You have different options here:

<table>
<tr>
<td> Key </td> <td> Type </td> <td> Required </td> <td> Description </td> <td> Default Value </td>
</tr>
<tr>
<td>

`title`

</td>
<td>

`string`

</td>
<td> no/optional </td>
<td> The title for the Button and the description for the alt tag of the image </td>
<td>

`Close`

</td>
</tr>
<tr>
<td>

`iconSrc`

</td>
<td>

`string`

</td>
<td> no/optional </td>
<td> If you want to change the icon, add the path to the new icon here </td>
<td>

the black cross: `'../../../assets/cross.svg'`

</td>
</tr>
<tr>
<td>

`styles`

</td>
<td>

`CloseButtonStyles`

These are all options:

```ts
{
  buttonWidth?: number | string;
  buttonHeight?: number | string;
  borderRadius?: number;
  backgroundColor?: string;
  border?: string;
  iconWidth?: number | string;
  iconHeight?: number | string;
  padding?: string;
  margin?: string;
}
```

</td>
<td> no/optional </td>
<td> You can change different styles for the button and the icon here </td>
<td>

```ts
{
  iconWidth: 20,
  iconHeight: 20,
  backgroundColor: 'transparent',
  border: 'none',
  padding: '0',
  margin: '0',
}
```

</td>
</tr>
</table>

As you see in the table, none of the options are required. You can adjust one, two or all of them - only the value you change will replace the default.

### Backdrop

The Backdrop is the area around the content that covers the whole screen. When you click on it, it will close the Dialog.
By default, it is black with an opacity of 50% (as `rgb()` value) and has no blur.

To change the color, opacity and blur, you need to target the the `sk-dialog` and overwrite the default custom properties `--sk-dialog-background`and`--sk-dialog-background-blur`.

Here is an example:

```css
sk-dialog {
  --sk-dialog-background: rgba(
    92,
    107,
    192,
    0.4
  ); /*rgb(92 107 192 / 40%) or hsl(231, 44%, 56% / 40%) or hsla(231, 44%, 56%, 0.4) or hex: #5c6bc066*/
  --sk-dialog-background-blur: 2px;
}
```

You can also use different color values like `hex` or `hsla` to define your color. It is just important to use a value where you can define the opacity. `rgba` or `hsla` are recommended here, since it is easier to adjust the opacity.

### Content

The Content and the styling of it is completely up to you. It can be basic text or complex components.
Wrapping your content with a styled container is recommended, because otherwise the content is displayed on a transparent background.

Some basic styling could be a `background-color`, `padding`, `width` and `height`. Of course you can also use `display: flex` to adjust the layout for your needs and everything else possible with css.

### Positioning

By default, the Dialog is placed in the center of the screen.

### Content Shadow

The Dialog does not come with a Shadow for the content. However, you can add it yourself.

If you have a wrapper class for your actual content (which is recommended), you can add a `box-shadow` and, depending on how large it is, a `margin` to have enough space for the shadow.

Here is an example:

```css
.styled-wrapper {
  box-shadow: rgba(0, 0, 0, 0.2) 0 10px 25px;
  margin: 30px;
}
```

### Scrolling

If you have more content than the height of the content box, just add `overflow: scroll` to the wrapper class and you are able to scroll within the Dialog.

## Accessibility

The Dialog is fully accessible in its own layer. So you can use the `Tab` key on your keyboard to go through all accessible elements in it. By pressing `Escape` on your keyboard or navigate with `Tab` to the close button you can close the Dialog.

## Multiple Overlays

You can have multiple Overlays within an Overlay. Just add a starting point (like a button) within the first overlay and add the `<sk-dialog>` with the required properties.
Make sure to add another variable that handles the state. Here is an example:

```html
<button (click)="isDialogOpen = true">open Dialog!</button>

<sk-dialog [(open)]="isDialogOpen" (closeRequested)="isDialogOpen = false">
  <div class="styled-wrapper">
    <p>here comes some content</p>

    <button (click)="isSecondDialogOpen = true">open second Dialog!</button>

    <sk-dialog
      [(open)]="isSecondDialogOpen"
      (closeRequested)="isSecondDialogOpen = false"
    >
      <div class="second-styled-wrapper">
        <p>here comes some content inside the nested dialog</p>
      </div>
    </sk-dialog>
  </div></sk-dialog
>
```

You can add as many nested Dialogs as you want, but it is recommended to nest only one of them.
Clicking `Escape` when multiple Overlays are open will close all of them.
