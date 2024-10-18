# @bgunnarsson/toaster for React.

### `Options`

For options refer to the options section in the [main readme file](../README.md#options).

### `Usage`

Import the hook.
```javascript
import { useToaster } from '@bgunnarssom/toaster/react';
```

Initialize the toaster with options
```javascript
const { toast, dismiss } = useToaster({
  position: 'bottom right',
  offset: { x: 20, y: 20 },
  customClass: 'my-toaster',
})
```

Regular toast
```javascript
<button onClick={() => toast({ content: 'This is a text toast!' })}>
  Show Toast
</button>
```

HTML Toast
```javascript
<button onClick={() => toast({
  content: '<h1>This is a rich HTML toast!</h1>',
  persist: true,
})}>
  Show Persistent Toast
</button>
```

Manually dismiss a persisted toast
```javascript
<button onClick={() => dismiss()}>
  Dismiss Toast
</button>
```
