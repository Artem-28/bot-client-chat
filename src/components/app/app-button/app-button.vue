<template>
  <button class="app-button">
    <div class="app-button__content">
      <q-icon v-if="icon" :name="icon" />
    </div>
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: false,
  },
});

</script>

<style scoped lang="scss">
.app-button {
  color: $primary;
  font-size: 24px;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;
  outline: none;
  border: none;
  width: fit-content;
  height: fit-content;
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9A9AB0;
    width: fit-content;
    height: fit-content;
    transition: all 0.3s;
  }
}
.app-button:hover {
  .app-button__content {
    color: currentColor;
  }
}
</style>
