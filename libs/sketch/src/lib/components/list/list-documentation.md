# List

The List Component gives you the opportunity to list items and even nest them. You can also connect it to routing to have deep links to nested items.

It can be used for normal lists (with the option for routing) or a Folder like structure with.

## Basic Usage

### Without Children (no Routing)

```html
<sk-list skListProvider>
  @for (item of items(); track item.id) {
  <sk-list-item [skListItemId]="item.id">
    <div skLabel>
      <span> {{ item.label }} </span>
    </div>
  </sk-list-item>
  }
</sk-list>
```

As you see, you only need the `sk-list` with `skListProvider` and `sk-list-item` with a unique [`[skListItemId]`](#inputsoutputs) and an `skLabel` to get started.

> The `[skListItemId]` is an identifier for the individual items and must be unique for each item. If it's not there, no item will be displayed.

The `skLabel` declares the visible part of the item. When you don't set it, it is not visible but still there. It can contain any content you like. <br>
As element that holds the `skLabel` you can use what you want, for example `<div>`, `<ng-container>`, `<p>`, etc.

### Without Children (with Routing)

```html
<sk-list
  skListProvider
  skEnableRouting
  (activeIdChanged)="itemActiveId.set($event)"
>
  @for (item of items(); track item.id) {
  <sk-list-item [skListItemId]="item.id">
    <div skLabel>
      <span> {{ item.label }} </span>
    </div>
  </sk-list-item>
  }
</sk-list>
```

In addition to the code above you just set the [`skEnableRouting`](#inputsoutputs) (which is the input set to true) and [`(activeIdChanged)`](#inputsoutputs).
(`itemActiveId` is a signal where the event from the output is set. You can use it to add styling depending on the route, conditional displaying of content etc.)

### With Children (no routing)

```html
<sk-list skListProvider>
  @for (item of items(); track item.id) {
  <sk-list-item [skListItemId]="item.id">
    <div skLabel>
      <span> {{ item.label }} </span>
    </div>
    <sk-list skChilds>
      @for (childItem of item.children; track childItem.id) {
      <sk-list-item [skListItemId]="childItem.id">
        <div skLabel>
          <span> {{ childItem.label }} </span>
        </div>
      </sk-list-item>
      }
    </sk-list>
  </sk-list-item>
  }
</sk-list>
```

You just nest another `sk-list` within the `sk-list-item` and add `skChilds` to the list to declare it as children.
Not setting `skChilds` will result in not seeing them.

> Once you opened a item to see the children, you can't close it to only see the parent elements. If you wish to do so, use the Collapse Component.

> You can nest the children as deep as you want. It is recommended to nest it only two times.

### With Children (with Routing)

```html
<sk-list
  skListProvider
  skEnableRouting
  (activeIdChanged)="itemActiveId.set($event)"
>
  @for (item of items(); track item.id) {
  <sk-list-item [skListItemId]="item.id">
    <div skLabel>
      <span> {{ item.label }} </span>
    </div>
    @if (item.children?.length && itemActiveId() === item.id) {
    <sk-list skChilds (activeIdChanged)="childActiveId.set($event)">
      @for (childItem of item.children; track childItem.id) {
      <sk-list-item [skListItemId]="childItem.id">
        <div skLabel>
          <span> {{ childItem.label }} </span>
        </div>
      </sk-list-item>
      }
    </sk-list>
    }
  </sk-list-item>
  }
</sk-list>
```

In addition to the code with routing above you just add the child with a `childActiveId`. It is also recommended to wrap it in a condition to check, if the child items are actually there.

## Styling

The `sk-list-item` has a basic default styling (You can find them in the [Properties Overview](#styling-with-custom-properties)).
You have the option to style it as you want with custom properties.

Here is an example:

```css
sk-list-item {
  --sk-list-item-label-background: thistle;
  --sk-list-item-label-color: purple;
  --sk-list-item-label-padding: 0.5rem 2rem;
  --sk-list-item-label-border: 3px solid indigo;
  --sk-list-item-label-active-color: navy;
}
```

This only targets the list-item itself. Applying other styles does not change it.
To add styles like a `border-radius`, `box-shadow` etc., target the element with `skLabel` in it and add your styles.
The `--sk-list-item-label-background` should be set to transparent. The `--sk-list-item-label-border` should be set to `none` or `transparent` to avoid the lines in the gaps.
The label will have a width fitting it's content. Add your desired width to the label to change it.

```css
sk-list-item {
  --sk-list-item-label-background: transparent;
  --sk-list-item-label-border: none;
}

.sk-label {
  width: 100%;
  border-radius: 1rem;
  background-color: thistle;
  box-shadow: rgb(0 0 0 / 20%) 0 10px 20px;
}
```

> You can also adjust the displaying of the items. Use `display: flex/grid` to adjust it to your needs.

### Animations

You can add animations to your list. Just add the name of the animation to the `sk-list` and you are ready to go.

### Active Items

Whe you only want to style the label, use the custom property `--sk-list-item-label-active-color` and add a color. This wills style the text color.

To style the active items (with routing) you could add a class `[class.active-item]` and add a condition `itemActiveId() === item.route`. This is great for transitions, scaling etc.

## Properties Overview

### Inputs/Outputs

<table>
<tr>
<td> Name </td> <td> Type </td> <td> Required </td> <td> Description </td> <td> Default Value </td>
</tr>
<tr>
<td>

`[skListItemId]`

</td>
<td>

`string`

</td>
<td> yes </td>
<td> Determines the unique identifier of the items. </td>
<td>
-
</td>
</tr>
<tr>
<td>

`[skEnableRouting]`

</td>
<td>

`boolean`

</td>
<td> no/optional </td>
<td> Determines if the list should have routing. </td>
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

`(activeIdChanged)`

</td>
<td>

only when `skEnableRouting` is `true`

</td>
<td> Handles the change of the active id for routing. </td>
</tr>
</table>

### Styling with custom properties

Apply the styles to the `sk-list-item`.

<table>
<tr>
<td> Name </td> <td> Description </td> <td> Default Value </td>
</tr>
<tr>
<td>

`--sk-list-item-label-background`

</td>
<td> Defines the background of the item. </td>
<td>

`#ffffff`

</td>
</tr>
<tr>
<td>

`--sk-list-item-label-color`

</td>
<td> Defines the color of the text in the item. </td>
<td>

`#000000`

</td>
</tr>
<tr>
<td>

`--sk-list-item-label-border`

</td>
<td> Defines the separator lines between the items. </td>
<td>

`1px solid #000000`

</td>
</tr>
<tr>
<td>

`--sk-list-item-label-active-color`

</td>
<td> Defines the text color of the active items. </td>
<td>

`rgb(252, 0, 84)`

</td>
</tr>
<tr>
<td>

`--sk-list-item-label-padding`

</td>
<td> Defines the padding of the text in the item. </td>
<td>

`0.5rem`

</td>
</tr>
</table>
