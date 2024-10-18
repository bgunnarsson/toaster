<script>
  import Toaster from '@bgunnarsson/toaster';

  // Initialize the Toaster
  const toaster = new Toaster({
    position: 'bottom right',
    offset: { x: 20, y: 20 },
    customClass: 'my-toaster',
  });

  // Function to show the toast with the respective type
  const showToast = (type) => {
    const content = `
      <div class="my-toaster__content my-toaster__toast--${type}">
        <p>${type.charAt(0).toUpperCase() + type.slice(1)} Toast</p>
      </div>
    `;

    toaster.toast({
      content,
      duration: 3000, // 3 seconds
    });
  };
</script>


<!-- Buttons to trigger the toast notifications -->
<div class="toaster-buttons">
  <button class="button" on:click={() => showToast('default')}>Default</button>
  <button class="button" on:click={() => showToast('success')}>Success</button>
  <button class="button" on:click={() => showToast('error')}>Error</button>
  <button class="button" on:click={() => showToast('warning')}>Warning</button>
  <button class="button" on:click={() => showToast('info')}>Info</button>
</div>
