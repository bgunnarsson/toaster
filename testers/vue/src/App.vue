<template>
  <div class="toaster-buttons">
    <button class="button" @click="showToast('default')">Default</button>
    <button class="button" @click="showToast('success')">Success</button>
    <button class="button" @click="showToast('error')">Error</button>
    <button class="button" @click="showToast('warning')">Warning</button>
    <button class="button" @click="showToast('info')">Info</button>
  </div>
</template>

<script>
import Toaster from '@bgunnarsson/toaster';

export default {
  name: 'App',

  data() {
    return {
      // Initialize the Toaster instance in the component's data
      toaster: null,
    };
  },

  mounted() {
    // Initialize the Toaster once the component is mounted
    this.toaster = new Toaster({
      position: 'bottom right',
      offset: { x: 20, y: 20 },
      customClass: 'my-toaster',
    });
  },

  methods: {
    showToast(type) {
      const content = `
        <div class="my-toaster__content my-toaster__toast--${type}">
          <p>${type.charAt(0).toUpperCase() + type.slice(1)} Toast</p>
        </div>
      `;

      this.toaster.toast({
        content,
        duration: 3000, // 3 seconds
      });
    },
  },
};
</script>
