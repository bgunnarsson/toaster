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

[Advanced usage](#advanced-usage) is further down.

```javascript
import Toaster from 'toaster';

const toaster = new Toaster({ duration: 5000 });

toaster.createToast({
  content: '<p>Welcome to Toaster!</p>'
});
```

More coming soon!