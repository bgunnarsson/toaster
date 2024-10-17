# @bgunnarsson/toaster


The easiest toast library ever. Nothing you don't need, everything you **_do_** need.

---

Toaster is a lightweight, dependency-free JavaScript library for creating toast notifications with ease. It’s designed to give developers full control over the look, feel, and behavior of toasts, without enforcing any styles or unnecessary functionality. Whether you're displaying simple text alerts or rich HTML content, Toaster provides a flexible and customizable solution that fits right into any project.

With sensible defaults for quick setup, you can configure Toaster to match your project’s requirements using a combination of options, custom classes, and your own CSS. It’s ideal for developers who want a simple yet powerful tool for creating toast notifications that fit perfectly into their workflow.


---

### `Key features`

- **Minimal and customizable**: No predefined styles are enforced. You can bring your own CSS (BYOCSS) and fully control the appearance and layout of your toasts.
- **Flexible positioning**: Easily set the toast's position on the screen (`top left`, `top right`, `bottom left`, or `bottom right`) with customizable offsets.
- **Sensible defaults**: Sensible defaults are provided for quick setup (e.g., position, duration), but all options are configurable to meet your needs.
- **Full HTML support**: Supports both plain text and HTML content, giving you flexibility to display anything from simple messages to rich, styled markup.
- **Clickability**: Optional `clickable` setting allows you to make toasts interactive for dismissals or actions.
- **Automatic dismissal**: Toasts are automatically dismissed after the specified duration, or you can set them to remain indefinitely until user interaction.
- **Lightweight and dependency-free**: No external libraries are required. It’s a pure vanilla JavaScript solution.
- **Smooth animations**: Built-in support for animations, with the ability to customize the entry and exit transitions via CSS.
- **Multiple toast handling**: Each toast is managed independently, ensuring smooth operation when multiple toasts are created at the same time.



### `Examples`

```javascript
const toaster = new Toaster({
  duration: 3000,
  clickable: true,
})
```

```javascript
toaster.createToast({
  content: 'Success',
  class: 'toaster__toast--success'
})
```

```javascript
toaster.createToast({
  content: 'Error',
  class: 'toaster__toast--error'
})
```

```javascript
toaster.createToast({
  content: `
    <div>
      <h3>Bad weather ahead</h3>
      <p>Winds as high as 50 m/s are forcasted.</p>
    </div>
  `,
})
```

## Documentation


### `HTML Structure`

This is the HTML structure that is created

`<class>` refers to the `options.class` property

```html
<div class="toaster-root <class>">
  <div class="toaster__toast <class>__toast">
    <!-- Content-->
  </div>
</div>
```

### `Options`

| **Option**  | **Type**   | **Default Value** |
|-------------|------------|-------------------|
| `position`  | `string`   | `top right`     |
| `duration`  | `number`   | `3000`            |
| `clickable` | `boolean`  | `false`           |
| `offset`    | `object`   | `{ x: 0, y: 0 }`  |
| `class`     | `string`   |                   |
