<template>
  <header class="app-header">
    <app-button
      v-if="canResetMode"
      icon="minimize"
      class="base-text--lg"
      @click="resetMode"
    />
    <app-button
      :icon="nextViewMode.icon"
      class="base-text--lg"
      @click="nextMode"
    />
    <app-button
      icon="close"
      class="base-text--lg"
      @click="widget.close"
    />
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { getWidgetInstance, viewMode } from 'boot/widget';
import AppButton from 'components/app/app-button/app-button.vue';

defineOptions({
  name: 'app-header',
});

const widget = getWidgetInstance();

const nextViewMode = computed(() => {
  switch (widget.mode.value) {
    case viewMode.STANDARD:
    case viewMode.FULLSCREEN:
      return { icon: 'aspect_ratio', mode: viewMode.POPUP };
    case viewMode.POPUP:
      return { icon: 'web_asset', mode: viewMode.FULLSCREEN };
    default:
      return { icon: 'aspect_ratio', mode: viewMode.STANDARD };
  }
});

const canResetMode = computed(() => widget.mode.value !== viewMode.STANDARD);

function nextMode() {
  widget.changeMode(nextViewMode.value.mode);
}
function resetMode() {
  widget.changeMode(viewMode.STANDARD);
}
</script>

<style scoped lang="scss">
.app-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: end;
  padding: 4px;
  background-color: #FFFFFF;
}

</style>
