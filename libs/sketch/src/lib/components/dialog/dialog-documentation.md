# Dialog

This Dialog gives you the option to show content in an global overlay. It is not connected to any component nor has any routing.

You can use it to provide information or interaction without leaving the context of the page.

## Basic Usage

First, let's have a look at the basic structure of the Dialog:

```html
<button (click)="isDialogOpen = true">open Dialog!</button>

<sk-dialog [(open)]="isDialogOpen" (close)="isDialogOpen = false">
  <p>here comes some content</p>
</sk-dialog>
```

This is all you need to get started! But let's have a closer look at the options.

> It is recommended to place the dialog at the end of your code since it is not connected to anything.

### Opening the Dialog

To open the Dialog, just create a starting point (a button for example) with a function that toggles a variable. For example: `isDialogOpen = false;`

Use this variable in the model (`[(open)]="isDialogOpen"`) to bring your Dialog to life.

> Once the dialog is open, you can't interact with the underlying page, so pressing buttons or scrolling behind the dialog is not possible.
> When it is closed, you can interact with the page again.

### Closing the Dialog

Closing can be performed in three different ways:

1. Clicking the [Backdrop](#backdrop)
2. Pressing `Escape` on the keyboard
3. Clicking the [Close button](#close-button)

All of these options are getting recognized by `(close)`. So just set your variable to `false` here and the Dialog will be closed.

## Styling

### Close Button

The close button is not shown by default. To show it, set `[showCloseButton]` to `true`.

If you want to show it, you can decide if the button is placed inside or outside your Container.
By default, it is placed outside. To place it within the content set `[innerCloseButton]` to `true`.

It is positioned on the right side by default. If you want to have it on the left side (inner/outer) add this: `[closeButtonPosition]="CloseButtonPosition.Left"`.

To add your own button, place the HTML button tag or your component within the `sk-dialog` and add `closeButton` to it to get recognized as such. Also set the variable for the open state to false on click.

Here is an example:

```html
<button (click)="isDialogOpen = true">open Dialog!</button>

<sk-dialog [(open)]="isDialogOpen" (close)="isDialogOpen = false">
  <button closeButton (click)="isDialogOpen = false">x</button>
  <p>here comes some content</p>
</sk-dialog>
```

> You can define the space of the actual content to the Close Button (inside) and the space of the Container to the Close Button (outside). Look at the [Content Section - Spacing](#content) to see how.

[comment]: <> (TODO: ADJUST WHEN NG-CONTENT HAS DEFAULT OPTION! The placeholder transparent button positioned in the top right corner with a black cross in it.)

### Backdrop

The Backdrop is the area around the content that covers the whole screen. When you click on it, it will close the Dialog.
By default, it is black with an opacity of 50% (as `rgb()` value) and has no blur.

To change the color, opacity and blur, you need to target the `sk-dialog` and overwrite the default custom properties `--sk-dialog-backdrop`and`--sk-dialog-backdrop-blur`.

Here is an example:

```css
sk-dialog {
  --sk-dialog-backdrop: rgb(92, 107, 192 / 40%);
  /* 
    other possible values:
    - rgba(92 107 192, 0.4) 
    - hsl(231, 44%, 56% / 40%) / hsla(231, 44%, 56%, 0.4) 
    - hex: #5c6bc066
    - gradients:
        radial-gradient(circle, rgba(238, 174, 202, 0.4) 0%, rgba(148, 187, 233, 0.4) 100%); or
        linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
  */
  --sk-dialog-backdrop-blur: 2px;
}
```

You can also use different color values like `rgba`, `hsl/hsla` or `hex` to define your color. Also gradients are possible.

> It is important to use a value where you can define the opacity.
> `rgb/rgba` or `hsl/hsla` are recommended here, since it is easier to adjust the opacity.

For the blur, a value up to `5px` is recommended, because more make the background nearly invisible.

### Container and Content

The Content and the styling of it is completely up to you. It can be basic text or complex components.
You don't need a styling wrapper for your content, you style the container with provided custom properties. To do so, target the `sk-dialog {...}` in your css file and adjust the desired custom properties.

You have some other options for the styling and positioning of your content. (See [Styling with custom properties](#styling-with-custom-properties) for a quick overview)

#### Container Style

- To change the width and height of the container, change the custom properties `--sk-dialog-width` and `--sk-dialog-height` (or only one of them). By default, the container takes the full width and fits the height of the content. If you want to have a fullscreen Dialog, set `[fullscreen]` to true, you don't need to anything for height and width custom properties.
- It is recommended to add a background, because by default the container is transparent and the backdrop will shine through. You can adjust it by changing the `--sk-dialog-background` custom property. You can do gradients, solid colors, images etc.
- The edges are not rounded by default. If you want to have a border-radius, change the `--sk-dialog-border-radius` custom property.
- By default, the overflow of the container is `auto`, if you'd like to change this behavior, adjust the `--sk-dialog-overflow` custom property.
- If you want to have a shadow around the container, set `[contentShadow]` to true and adjust `--sk-dialog-content-shadow` if you'd like to change the default shadow. Just keep in mind that should not be larger than the shadow should not be larger than the `--sk-dialog-container-margin` since it would be cut.
- You can also add a border if you'd like to by adjusting `--sk-dialog-border`. Keep in mind that you might adjust the `--sk-dialog-container-margin` because the size of the border is added.

#### Container Spacing

- To have a proper spacing to the sides, overwrite `--sk-dialog-margin` and set the margin as wanted. By default, this is `0`.
- To archive a good spacing from your content to the container edges, adjust `--sk-dialog-container-padding`, otherwise it will stick to the sides.
- When the [Close Button](#close-button) is outside the content, you can define the margin of the Container to the Close Button. In this way, you can move it further away if wanted. Just overwrite the `--sk-dialog-container-margin`. It has a default of `20px`. If `innerCloseButton` is `true`, this is getting ignored. It is recommended to have at least the same inner content margin as the size of the close button icon. If you want to place the icon independently form the margin, change `--sk-dialog-outer-close-button-space`. This will move it proportionally closer to the Container (if it has a positive value).
- When the [Close Button](#close-button) is inside the content, use `--sk-dialog-inner-close-button-space` to define the spacing from your content wrapper. It will move the button proportionally. `innerCloseButton` must be `true`, otherwise it is getting ignored.

> In terms of styling, the Close Button is part of the Container. So changing the custom property `--sk-dialog-margin` will not affect the position of the Close Button.
>
> To move it further away, adjust the `--sk-dialog-container-margin` custom property.

### Positioning

By default, the Dialog is placed in the center of the screen.

### Content Shadow

You can add a Shadow to the dialog. By default, it is disabled. To add one, set `[contentShadow]` to true.

The default value for the shadow is `rgb(0 0 0 / 20%) 0 10px 20px`. If you'd like to change it, change the `--sk-dialog-content-shadow` custom property in `sk-dialog` in your css file to your desired shadow.

> Keep in mind that your shadow should not be larger than the `--sk-dialog-container-margin` to avoid cutting the shadow.

> If your margin moves the close button too far away from the container, use `--sk-dialog-outer-close-button-space` to move it proportionally closer to the container.

### Scrolling

If you have more content than the height of the content box, it will automatically be able to scroll to the bottom of the content.

If you'd like to change this behavior, change the `--sk-dialog-overflow` custom property in `sk-dialog` in your css file to adjust the overflow behavior on the y-axis.

## Accessibility

The Dialog is fully accessible in its own layer. So you can use the `Tab` key on your keyboard to go through all accessible elements in it. By pressing `Escape` on your keyboard or navigate with `Tab` to the close button you can close the Dialog.

## Multiple Overlays

You can have multiple Overlays within an Overlay. Just add a starting point (like a button) within the first overlay and add the `<sk-dialog>` with the required properties.
Make sure to add another variable that handles the state. Here is an example:

```html
<button (click)="isDialogOpen = true">open Dialog!</button>

<sk-dialog [(open)]="isDialogOpen" (close)="isDialogOpen = false">
  <p>here comes some content</p>

  <button (click)="isSecondDialogOpen = true">open second Dialog!</button>

  <sk-dialog [(open)]="isSecondDialogOpen" (close)="isSecondDialogOpen = false">
    <p>here comes some content inside the nested dialog</p>
  </sk-dialog>
</sk-dialog>
```

You can add as many nested Dialogs as you want, but it is recommended to nest only one of them.

> Clicking `Escape` when multiple Overlays are open will close all of them.

## Properties Overview

### Inputs/Outputs

<table>
<tr>
<td> Name </td> <td> Type </td> <td> Required </td> <td> Description </td> <td> Default Value </td>
</tr>
<tr>
<td>

`[(open)]`

</td>
<td>

`boolean`

</td>
<td> yes </td>
<td> Determines if the Dialog is open. </td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`[showCloseButton]`

</td>
<td>

`boolean`

</td>
<td> no/optional </td>
<td> Determines if the Close Button is displayed. </td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`[innerCloseButton]`

</td>
<td>

`boolean`

</td>
<td> no/optional </td>
<td> Determines if the Close Button is shown inside your Content. </td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`[closeButtonPosition]`

</td>
<td>

`CloseButtonPosition` <br>

```ts
(Left = 'left'), (Right = 'right');
```

</td>
<td> no/optional </td>
<td>

Defines if the Close Button (inner/outer) is positioned left or right.

</td>
<td>

`CloseButtonPosition.Right`

</td>
</tr>
<tr>
<td>

`[fullscreen]`

</td>
<td>

`boolean`

</td>
<td> no/optional </td>
<td>

Makes the Dialog grow to full width and height.

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`[contentShadow]`

</td>
<td>

`boolean`

</td>
<td> no/optional </td>
<td>

Adds a Shadow to the Dialog.

</td>
<td>

`false`

</td>
</tr>
</table>

<table>
<tr>
<td> Name </td> <td> Required </td> <td> Description </td>
</tr>
<tr>
<td>

`(close)`

</td>
<td> yes </td>
<td> Handles the closing of the dialog. </td>
</tr>
</table>

### Styling with custom properties

None of these are required. All of them need to be changed in `sk-dialog {...}` in your css file.

<table>
<tr>
<td> Name </td> <td> Description </td> <td> Default Value </td> <td> Further info </td>
</tr>

<tr>
<td colspan="4" style="text-align: center">Container</td>
</tr>
<tr>
<td>

`--sk-dialog-width`

</td>
<td>

Defines the `width` of the Container.

</td>
<td>

`auto`

</td>
<td>

[Content - Container Style](#container-style)

</td>
</tr>
<tr>
<td>

`--sk-dialog-height`

</td>
<td>

Defines the `height` of the Container.

</td>
<td>

`fit-content`

</td>
<td>

[Content - Container Style](#container-style)

</td>
</tr>
<tr>
<td>

`--sk-dialog-border-radius`

</td>
<td>

Defines the `borderRadius` of the Container.

</td>
<td>

`0`

</td>
<td>

[Content - Container Style](#container-style)

</td>
</tr>
<tr>
<td>

`--sk-dialog-background`

</td>
<td>

Defines the `background` style of the Container.

</td>
<td>

`transparent`

</td>
<td>

[Content - Container Style](#container-style)

</td>
</tr>
<tr>
<td>

`--sk-dialog-content-shadow`

</td>
<td>

Defines the `box-shadow` of the Container.

</td>
<td>

`rgb(0 0 0 / 20%) 0 10px 20px`

</td>
<td>

[Content - Container Style](#container-style)

</td>
</tr>
<tr>
<td>

`--sk-dialog-border`

</td>
<td>

Defines the `border` of the Container.

</td>
<td>

`0`

</td>
<td>

[Content - Container Style](#container-style)

</td>
</tr>
<tr>
<td>

`--sk-dialog-overflow`

</td>
<td>

Defines the `overflow` behavior of the Container.

</td>
<td>

`auto`

</td>
<td>

[Content - Container Style](#container-style)

</td>
</tr>

<tr>
<td colspan="4" style="text-align: center">Spacing</td>
</tr>
<tr>
<td>

`--sk-dialog-margin`

</td>
<td>

Defines the `margin` of the Container (including Close Button) to the sides.

</td>
<td>

`0`

</td>
<td>

[Content - Container Spacing](#container-spacing)

</td>
</tr>
<tr>
<td>

`--sk-dialog-container-margin`

</td>
<td>

Defines the `margin` of the Container to the close button.

Only works with `[innerCloseButton]="false"` <br>
Should have at least the size of the Close Button Icon size.

</td>
<td>

`20px`

</td>
<td>

[Content - Container Spacing](#container-spacing)

</td>
</tr>
<tr>
<td>

`--sk-dialog-container-padding`

</td>
<td>

Defines the `padding` of your content to the container.

Should have at least `30px` more than `--sk-dialog-inner-close-button-space` (with `[innerCloseButton]="true"`) to avoid the Close Button overlapping the Content.

</td>
<td>

`40px`

</td>
<td>

[Content - Container Spacing](#container-spacing)

</td>
</tr>
<tr>
<td>

`--sk-dialog-outer-close-button-space`

</td>
<td>

Defines the spacing of the outer Close Button to the Container in case you want to be independent from the margin.

Only works with `[innerCloseButton]="false"`

</td>
<td>

`0`

</td>
<td>

[Content - Container Spacing](#container-spacing)

</td>
</tr>
<tr>
<td>

`--sk-dialog-inner-close-button-space`

</td>
<td>

Defines the spacing of the inner Close Button to the Container.

Only works with `[innerCloseButton]="true"`

</td>
<td>

`10px`

</td>
<td>

[Content - Container Spacing](#container-spacing)

</td>
</tr>

<tr>
<td colspan="4" style="text-align: center">Backdrop</td>
</tr>
<tr>
<td>

`--sk-dialog-backdrop`

</td>
<td>

Defines the Color and Opacity of the backdrop.
Must have a color value with opcaity, otherwise it covers the background completely.
`rgb/rgba` or `hsl/hsla` are recommended, `hex` (with alpha value) is possible.

</td>
<td>

`rgb(0 0 0 / 50%)`

</td>
<td>

[Backdrop](#backdrop)

</td>
</tr>
<tr>
<td>

`--sk-dialog-backdrop-blur`

</td>
<td>

Defines the blur of the backdrop. A number not higher than `5px` is recommended.

</td>
<td>

`0`

</td>
<td>

[Backdrop](#backdrop)

</td>
</tr>
</table>
