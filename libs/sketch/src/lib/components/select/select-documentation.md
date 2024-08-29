# Select Component

The Select Component gives you the opportunity to easily select and unselect one or multiple elements within an overlay.
It has no dependency to the Dialog component.

You can use it for Sorting and Filtering or selecting specific items.

## Basic Usage

### Single Select

```html
<sk-select [(ngModel)]="selectedValue">
  <span skSelectPlaceholder>Select option</span>
  <span skSelectLabel>{{ selectedValue?.label }}</span>
  @for (option of options; track option.value) {
  <sk-select-option [value]="option.value">
    {{ option.label }}
  </sk-select-option>
  }
</sk-select>
```

To get started you just need the `sk-select` with `[(ngModel)]` and the `sk-select-option` with a `[value]`. (The value is sort of an id.) `options` is the Array with the possible items to select from. <br>
A placeholder tagged with `skSelectPlaceholder` and an element holding the label tagged with `skSelectLabel` are needed to see the area the selection appears.

### Multi Select

```html
Multiple: <input type="checkbox" (change)="multiSelect($event)" />

<sk-select [multiple]="multiple()">
  <span skSelectPlaceholder>Select option</span>
  <div skSelectLabel>
    @for (item of selectedValues(); track item.value) { {{ item.label }} }
  </div>
  @for (option of options; track option.value) {
  <sk-select-option [value]="option.value">
    {{ option.label }}
  </sk-select-option>
  }
</sk-select>
```

Multi selecting is a bit more complex but not so complicated. Let's break it down.

1. First add a boolean value for the multiple selection input (it doesn't matter if it's a signal, observable, property, etc.)
2. the value for the select option is an array (since you can add multiple options)
3. (it is not recommended to set closeOnSelect to true since you would need to open the select options again and again to select more.)

That's it, your multi selection is ready to go!

Here is another breakdown of the provided example:

1. First add signals for multiple selection (boolean) and selectedValues (Array) and a normal variable for a value (like `selectedValue` for single selection).
2. Then add a checkbox input to activate the multiple selection. Assign a function on the change event and set the event target to the multiple signal. (`this.multiple.set(event.target.checked`)
3. In the `sk-select` assign the `value` to the `ngModel`, add the input `[multiple]` and assign the signal.
4. To the `(ngModelChange)` event assign a function for the value change. There you set the passed event to the selectedValues signal and assign it to the value variable. (Of course you can add conditions and exceptions to the function.)
5. Add a loop of the selectedValues signal to the element with `skSelectLabel`.

## Properties Overview

### Inputs/Outputs

<table>
<tr>
<td> Name </td> <td> Type </td> <td> Required </td> <td> Component </td> <td> Description </td> <td> Default Value </td>
</tr>
<tr>
<td>

`[multiple]`

</td>
<td>

`boolean`

</td>
<td> no/optional </td>
<td>

for `<sk-select>`

</td>
<td> Determines if it's possible to select multiple items. </td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`[closeOnSelect]`

</td>
<td>

`boolean`

</td>
<td> no/optional </td>
<td>

for `<sk-select>`

</td>
<td> Determines if the select options close if an item gets selected. </td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`[panelOffsetX]`

</td>
<td>

`number`

</td>
<td> no/optional </td>
<td>

for `<sk-select>`

</td>
<td> Determines how much the select options move on the X axis.  </td>
<td>

`0`

</td>
</tr>
<tr>
<td>

`[panelOffsetY]`

</td>
<td>

`number`

</td>
<td> no/optional </td>
<td>

for `<sk-select>`

</td>
<td> Determines how much the select options move on the Y axis. </td>
<td>

`0`

</td>
</tr>
<tr>
<td>

`[animationDelay]`

</td>
<td>

`number`

</td>
<td> no/optional </td>
<td>

for `<sk-select>`

</td>
<td> Determines how much the animation is delayed (if there is one). </td>
<td>

`0`

</td>
</tr>
<tr>
<td>

`[value]`

</td>
<td>

`T`

</td>
<td> yes </td>
<td>

ONLY for `<sk-select-option>`

</td>
<td>

Determines the unique value for each item.

</td>
<td>-</td>
</tr>
</table>

<table>
<tr>
<td> Name </td> <td> Required </td> <td> Description </td>
</tr>
<tr>
<td>

`(open)`

</td>
<td> no/optional </td>
<td> Determines if the panel is open. </td>
</tr>
</table>

### Styling with custom properties

None of these are required. All of them need to be changed in `sk-dialog {...}` in your css file.

<table>
<tr>
<td> Name </td> <td> Description </td> <td> Default Value </td> 
</tr>
<tr>
<td>

`--sk-select-label-background`

</td>
<td>

Defines the background color if the select label.

</td>
<td>

`#fff`

</td>
</tr>
<tr>
<td>

`--sk-select-label-color`

</td>
<td>

Defines the color of the text in the label.

</td>
<td>

`#000`

</td>
</tr>
<tr>
<td>

`--sk-select-label-padding`

</td>
<td>

Defines the `padding` of the label.

</td>
<td>

`0.5rem 1rem`

</td>
</tr>
<tr>
<td>

`--sk-select-label-border-radius`

</td>
<td>

Defines the `border-radius` of the label.

</td>
<td>

`8px`

</td>
</tr>
<tr>
<td>

`--sk-select-label-border-color`

</td>
<td>

Defines the color of the label border.

</td>
<td>

`transparent`

</td>
</tr>
<tr>
<td>

`--sk-select-label-border-focus-color`

</td>
<td>

Defines the color of the label focus.

</td>
<td>

`deeppink`

</td>
</tr>
</table>
