# @bgunnarsson/toaster

### `Toaster = Ristavél in Icelandic.`

---

The easiest toast library ever. Nothing you don't need, everything you **_do_** need.

---

**@bgunnarsson/Toaster**, the lightweight, dependency-free JavaScript library that gives you full control over your notifications—crispy on the outside, customizable on the inside. Whether you're looking to pop up simple text alerts or serve up rich HTML content, This package got your back, no unnecessary fluff, and no burnt toast.

Designed with developers in mind, this package lets you take the wheel. No enforced styles, no bloated features, just a clean, flexible solution that slides perfectly into any project. Want to position your toast in the top right? Bottom left? Sprinkle it with custom classes and your own CSS? Go for it. This package gives you the freedom to create toast notifications that look and behave exactly how you want them to.

With sensible defaults for quick setup, this package is the perfect sidekick—whether you’re in a hurry or have time to fine-tune every last detail. Simple, powerful, and fully customizable—because who doesn't love a perfectly timed toast?

---

## Features

- **Minimal and customizable**: No forced styles; bring your own CSS for total control over the appearance.
- **Flexible positioning**: Toasts can appear at `top left`, `top right`, `bottom left`, or `bottom right` of the screen, with additional support for customizable offsets.
- **HTML content support**: Display both simple text notifications or rich HTML content inside toasts.
- **Pause on hover**: Auto-dismiss timers can pause while the user hovers over a toast.
- **Persistent toasts**: Keep toasts visible indefinitely with the `persist` option.
- **Lightweight and dependency-free**: No external libraries required.
- **Custom events**: Listen for custom events like `toaster:added` and `toaster:removed`.

---

## Installation

Install the `@bgunnarsson/toaster` library using the package manager of your choice.

```bash
pnpm i @bgunnarsson/toaster

yarn @bgunnarsson/toaster

npm i @bgunnarsson/toaster
```

---

## Documentation

### `Options`

#### `ToasterOptions`

| **Option**      | **Type**  | **Default**      |
|-----------------|-----------|------------------|
| `position`      | `string`  | `bottom right`   |
| `offset`        | `object`  | `{ x: 0, y: 0 }` |
| `customClass`   | `string`  |                  |

### `Importing`
Since this package includes both `CJS` and `ESM` files it will work with both `require` and `import`.

```
import Toaster from '@bgunnarsson/toaster"

const Toaster = require('@bgunnarsson/toaster')
```

### `Basic Usage`

```javascript
const toaster = new Toaster({ duration: 5000 });

toaster.toast({
  content: '<p>Welcome to Toaster!</p>'
});
```

#### `Initialization`
Initialize the Toaster class with custom options for positioning, duration, and more.

<details>
<summary>Code</summary>

```javascript
const toaster = new Toaster({
  position: 'bottom right',  // Position the toasts at the bottom-right corner.
  offset: { x: 20, y: 20 },  // Offset the toast from the bottom-right by 20px.
  customClass: 'my-toaster', // Add a custom class to the toasts.
});
```

</details>


#### `.toast()`
| **Option**      | **Type**  | **Default**      |
|-----------------|-----------|------------------|
| `content`       | `string`  |                  |
| `persist`       | `boolean` | `false`          |
| `duration`      | `number`  | `3000`           |
| `pause`         | `boolean` | `true`           |
| `clickable`     | `boolean` | `true`           |


#### `Creating a Toast`
Use the toast() method to create and display a toast notification.

<details>
<summary>Code</summary>

```javascript
toaster.toast({
  content: '<p>Hello, this is a toast!</p>',  // Display HTML content.
  duration: 3000,  // Auto-dismiss the toast after 3 seconds.
  clickable: true, // Make the toast clickable to dismiss.
});
```

</details>

#### `Manually Dismissing a Toast`
You can dismiss the current toast programmatically by calling the dismiss() method.


<details>
<summary>Code</summary>

```javascript
toaster.dismiss()
```

</details>

#### `Persistent Toast`
Toasts can be made persistent by setting the persist option to true. Persistent toasts stay on screen until manually dismissed.


<details>
<summary>Code</summary>

```javascript
toaster.toast({
  content: 'Persistent toast message!',
  persist: true, // Toast will stay until dismissed manually.
});
```

</details>


#### `Events`
The library dispatches custom events when a toast is added or removed:

* `toaster:added`Fired when a new toast is added.
* `toaster::removed` Fired when a toast is removed from the DOM.

<details>
<summary>Code</summary>

```javascript
document.addEventListener('toaster:added', (event) => {
  console.log('Toast added:', event.detail);
});

document.addEventListener('toaster:removed', (event) => {
  console.log('Toast removed:', event.detail);
});
```

</details>
