<template>
  <div class="app-layout">
    <app-header />
    <div class="app-layout__container" :style="containerStyle">
      <router-view />
    </div>
    <footer ref="footerRef" class="app-layout__footer">
      <messenger-panel />
    </footer>
  </div>
</template>

<script setup>
import AppHeader from 'components/app/app-header/app-header.vue';
import { useResizeObserver, useTheme } from 'src/composable';
import { computed, ref } from 'vue';
import MessengerPanel from 'components/messenger-panel/messenger-panel.vue';

const theme = [
  { code: 'base_background', value: '#F7F7FC' },
  { code: 'message_outgoing_background', value: '#DBD7F4' },
  { code: 'message_outgoing_color', value: '#11142D' },
  { code: 'message_outgoing_author', value: '#5541D7' },
  { code: 'message_outgoing_time', value: '#9A9AB0' },
  { code: 'message_incoming_background', value: '#FFFFFF' },
  { code: 'message_incoming_color', value: '#11142D' },
  { code: 'message_incoming_author', value: '#5541D7' },
  { code: 'message_incoming_time', value: '#9A9AB0' },
];

const footerRef = ref(null);
const appSize = ref({
  footer: { width: 0, height: 0 },
});

const { rootStyle, setupTheme } = useTheme();
setupTheme(theme);
useResizeObserver(footerRef, onFooterSize);

const containerStyle = computed(() => {
  return {
    ...rootStyle,
    paddingBottom: `${appSize.value.footer.height}px`,
  };
});

function onFooterSize(size) {
  appSize.value.footer.height = size.height;
  appSize.value.footer.width = size.width;
}
</script>

<style lang="scss" scoped>
.app-layout {
  position: relative;
  width: 100%;
  height: 100vh;
  &__container {
    padding-top: 26px;
    width: 100%;
    height: 100%;
  }
  &__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
