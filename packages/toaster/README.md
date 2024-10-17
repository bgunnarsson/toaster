# @bgunnarsson/toaster

### `Ristavél = Toaster in Icelandic.`

The easiest toast library ever. Nothing you don't need, everything you **_do_** need.

---

Toaster is a lightweight, dependency-free JavaScript library for creating toast notifications with ease. It’s designed to give developers full control over the look, feel, and behavior of toasts, without enforcing any styles or unnecessary functionality. Whether you're displaying simple text alerts or rich HTML content, Toaster provides a flexible and customizable solution that fits right into any project.

With sensible defaults for quick setup, you can configure Toaster to match your project’s requirements using a combination of options, custom classes, and your own CSS. It’s ideal for developers who want a simple yet powerful tool for creating toast notifications that fit perfectly into their workflow.


---

## Features

- **Minimal and customizable**: No forced styles; bring your own CSS for total control over the appearance.
- **Flexible positioning**: Toasts can appear at `top left`, `top right`, `bottom left`, or `bottom right` of the screen, with additional support for customizable offsets.
- **HTML content support**: Display both simple text notifications or rich HTML content inside toasts.
- **Clickability**: Make the entire toast clickable if required.
- **Pause on hover**: Auto-dismiss timers can pause while the user hovers over a toast.
- **Persistent toasts**: Keep toasts visible indefinitely with the `persist` option.
- **Lightweight and dependency-free**: No external libraries required.
- **Custom events**: Listen for custom events like `toaster:added` and `toaster:removed`.
  
---

## Installation

Install the `toaster` library using the package manager of your choice.

```bash
pnpm i @bgunnarsson/toaster

yarn @bgunnarsson/toaster

npm i @bgunnarsson/toaster
```

---

## Usage

### Basic Usage

[Advanced usage](#advanced-usage) is further down.

```javascript
import Toaster from 'toaster';

const toaster = new Toaster({
  position: 'bottom right',
  duration: 3000,
  clickable: true,
  offset: { x: 10, y: 20 },
  customClass: 'my-toast',
  pause: true,
  stay: false
});

toaster.createToast({
  content: '<p>Welcome to Toaster!</p>',
  persist: false  // If true, the toast stays on screen indefinitely
});
```

---

## Options

| **Option**    | **Type**   | **Default Value** |
|---------------|------------|-------------------|
| `position`    | `string`   | `bottom right`    |
| `duration`    | `number`   | `3000`            |
| `clickable`   | `boolean`  | `false`           |
| `offset`      | `object`   | `{ x: 0, y: 0 }`  |
| `customClass` | `string`   | `""`              |
| `pause`       | `boolean`  | `true`            |
| `stay`        | `boolean`  | `false`           |

### Position

Defines where on the screen the toast will be placed. Options include:

- `top left`
- `top right`
- `bottom left`
- `bottom right`

### Duration

Controls how long the toast will remain on the screen before it is automatically dismissed. A value of `0` will keep the toast visible indefinitely unless `stay` is set to `true`.

### Clickable

Defines whether the toast is dismissible by clicking on it.

### Offset

Specifies the X and Y offsets for fine-tuning the toast's placement on the screen.

### Custom Class

Adds a custom class to the toast for additional styling.

### Pause

When `true`, the toast's auto-dismiss timer will pause when the user hovers over it.

### Stay

If `true`, the toast will stay visible indefinitely until manually removed.

---

## Events

### `toaster:added`

Dispatched when a new toast is added.

```javascript
document.addEventListener('toaster:added', (event) => {
  console.log('Toast added:', event.detail);
});
```

### `toaster:removed`

Dispatched when a toast is removed.

```javascript
document.addEventListener('toaster:removed', (event) => {
  console.log('Toast removed:', event.detail);
});
```


# Advanced usage

### Toast with Dynamic HTML Content and Custom Styling

You can easily use the library to display dynamic content inside toasts, including custom HTML and CSS classes for styling.

<details>
<summary>Code example</summary>

```
const toaster = new Toaster({
  position: 'top right',
  duration: 5000,           // Toast will disappear after 5 seconds
  clickable: false,         // Toast is not clickable
  offset: { x: 15, y: 20 }, // Custom offset
  customClass: 'my-toast',  // Custom CSS class for additional styling
  pause: true               // Pause the toast when hovered
});

// Create a toast with rich HTML content
toaster.toast({
  content: `
    <div class="toast-header">
      <strong class="mr-auto">Success!</strong>
      <small>Just now</small>
    </div>
    <div class="toast-body">
      Your settings have been saved successfully.
    </div>
  `,
  persist: false
});

```

</details>



### 