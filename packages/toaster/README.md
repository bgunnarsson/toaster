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

Install the `@bgunnarsson/toaster` library using the package manager of your choice.

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
});

toaster.createToast({
  content: '<p>Welcome to Toaster!</p>'
});
```

---

## Options

| **Option**    | **Type**   | **Default Value** |
|---------------|------------|-------------------|
| `position`    | `string`   | `bottom right`    |
| `duration`    | `number`   | `3000`            |
| `clickable`   | `boolean`  | `true`           |
| `offset`      | `object`   | `{ x: 0, y: 0 }`  |
| `customClass` | `string`   |                   |
| `pause`       | `boolean`  | `true`            |

### Position

Defines where on the screen the toast will be placed. Options include:

- `top left`
- `top right`
- `bottom left`
- `bottom right`

### Toast.Duration

Controls how long the toast will remain on the screen before it is automatically dismissed. A value of `0` will keep the toast visible indefinitely unless `persist` is set to `true`.

### Toast.Clickable

Defines whether the toast is dismissible by clicking on it.

### Offset

Specifies the X and Y offsets for fine-tuning the toast's placement on the screen.

### Coast.CustomClass

Adds a custom class to the toast for additional styling.

### Toast.Pause

When `true`, the toast's auto-dismiss timer will pause when the user hovers over it.

### Toast.Persist

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

### Initialize the Toaster

The options object is required.

```
const toaster = new Toaster({
  position: 'top right',
  duration: 5000,           // Toast will disappear after 5 seconds
  clickable: false,         // Toast is not clickable
  offset: { x: 15, y: 20 }, // Custom offset
  customClass: 'my-toast',  // Custom CSS class for additional styling
  pause: true               // Pause the toast when hovered
});

```

### Toast with Dynamic HTML Content and Custom Styling

You can easily use the library to display dynamic content inside toasts, including custom HTML and CSS classes for styling.

<details>
<summary>Code</summary>

```
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



### Persistent Notification for Important Messages

Use the persist option to keep the toast on the screen indefinitely, useful for critical notifications that require user action.

<details>
<summary>Code</summary>

```
const toaster = new Toaster({
  position: 'bottom left',
  clickable: true,          // Allow clicking on the toast to dismiss it
  customClass: 'alert-toast' // Apply a custom class for alert styling
});

// Create a persistent toast
toaster.toast({
  content: '<p class="alert-message">Action Required: Please update your payment method!</p>',
  persist: true              // Keep the toast until manually dismissed
});
```

</details>

### Pause/Resume Functionality on Hover

Create toasts that pause their dismissal countdown when the user hovers over them and resumes when the user moves their mouse away.

<details>
<summary>Code</summary>

```
const toaster = new Toaster({
  position: 'top left',
  duration: 7000,   // The toast will stay visible for 7 seconds
  pause: true       // Pause on hover
});

toaster.toast({
  content: 'Hover over me to pause auto-dismiss!',
  persist: false
});

```

</details>

### Toast with Custom Click Event

By making the toast clickable, you can attach custom behavior, such as redirecting the user to a different page or showing more information.

<details>
<summary>Code</summary>

```
const toaster = new Toaster({
  position: 'top right',
  clickable: true,  // Toast will be clickable
  customClass: 'clickable-toast'
});

toaster.toast({
  content: '<p>Click me to view more details!</p>',
  persist: false
});

// Listening for clicks on the toast
document.addEventListener('toaster:added', (event) => {
  event.detail.element.addEventListener('click', () => {
    window.location.href = '/details';  // Redirect to another page
  });
});

```

</details>

### Handling Multiple Toasts with Event Listeners

You can use custom events (toaster:added, toaster:removed) to track when toasts are added or removed, and react accordingly (e.g., logging or updating a UI component).

<details>
<summary>Code</summary>

```
const toaster = new Toaster({
  position: 'bottom right',
  duration: 4000
});

// Listen for when a toast is added
document.addEventListener('toaster:added', (event) => {
  console.log('New toast added:', event.detail.toastData);
});

// Listen for when a toast is removed
document.addEventListener('toaster:removed', (event) => {
  console.log('Toast removed:', event.detail.element);
});

// Create a few toasts
toaster.toast({ content: 'Toast 1' });
toaster.toast({ content: 'Toast 2' });
toaster.toast({ content: 'Toast 3' });

```

</details>