# List

The List Component gives you the opportunity to list items and even nest them. You can also connect it to routing to have deep links to nested items.

## Basic Usage

Lets have a look at the basic usage of the List without children:

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

As you see, you only need the `sk-list` and `sk-list-item` with `[skListItemId]` to get started.

With child items it looks like this:

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

You just nest another `sk-list` within the `sk-list-item`. Of course it works only if you have child items.
Let's have a closer look.

## Child Elements

## Styling

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
<td> Determines the unique id of the item. </td>
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
<td> yes </td>
<td> Handles the change of the active id. </td>
</tr>
</table>

### Styling with custom properties

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
