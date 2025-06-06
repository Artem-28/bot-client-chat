<template>
  <messenger-template />
</template>

<script setup>
import { getWidgetInstance } from 'boot/widget';
import MessengerTemplate from 'components/messenger/messenger-template.vue';

defineOptions({
  name: 'IndexPage',
});

const widget = getWidgetInstance();

widget.onClose(() => {
  console.log(' close widget');
});
</script>
<style scoped lang="scss">
.app-messenger {
  padding: 0 8px 8px;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 8px;
  flex-direction: column-reverse;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE и Edge */
  scrollbar-width: none;  /* Firefox */

}
</style>
