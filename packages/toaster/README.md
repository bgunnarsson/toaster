# @bgunnarsson/toaster - JavaScript Notification Library

### `Ristavél = Toaster in Icelandic.`

---

The easiest toast library ever. Nothing you don't need, everything you **_do_** need.

---

Toaster is a lightweight, dependency-free JavaScript library for creating toast notifications with ease. It’s designed to give developers full control over the look, feel, and behavior of toasts, without enforcing any styles or unnecessary functionality. Whether you're displaying simple text alerts or rich HTML content, Toaster provides a flexible and customizable solution that fits right into any project.

With sensible defaults for quick setup, you can configure Toaster to match your project’s requirements using a combination of options, custom classes, and your own CSS. It’s ideal for developers who want a simple yet powerful tool for creating toast notifications that fit perfectly into their workflow.

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

### Basic Usage

```javascript
import Toaster from 'toaster';

const toaster = new Toaster({ duration: 5000 });

toaster.toast({
  content: '<p>Welcome to Toaster!</p>'
});
```

#### `Initialization`
nitialize the Toaster class with custom options for positioning, duration, and more.


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
