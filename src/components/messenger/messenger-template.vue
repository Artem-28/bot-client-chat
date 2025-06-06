<template>
  <div
    ref="rootRef"
    class="messenger-template"
  >
    <bubbles-group
      v-for="n in count"
      :key="n"
      :group="groups[count - n]"
    >
      <template v-slot:header="{ date }">
        <date-badge :date="date" />
      </template>
      <template v-slot:item="{ item }">
        <bubble-wrapper :message="item" />
      </template>
    </bubbles-group>
  </div>
</template>

<script setup>

import { useMessage, useMessenger, useResizeObserver, useScroll, useTheme } from 'src/composable';
import BubblesGroup from 'components/messenger/bubbles-group.vue';
import BubbleWrapper from 'components/messenger/bubble-wrapper.vue';
import { provide, ref } from 'vue';
import { MESSENGER_TEMPLATE_KEY } from 'src/utils';
import DateBadge from 'components/messenger/date-badge.vue';

const rootRef = ref(null);
const rootHeight = ref(0);
const rootWidth = ref(0);

const { groups, count, append } = useMessage();
const messenger = useMessenger();
const theme = useTheme();
const { scrollPosition } = useScroll(rootRef);
useResizeObserver(rootRef, onResize);

function onResize(size) {
  rootHeight.value = size.height;
  rootWidth.value = size.width;
}

messenger.onMessage((data) => {
  const { session, ...message } = data;
  append(message);
});

provide(MESSENGER_TEMPLATE_KEY, {
  theme,
  scrollPosition,
  rootRef,
  rootHeight,
  rootWidth,
});
</script>

<style scoped lang="scss">
.messenger-template {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE и Edge */
  scrollbar-width: none;  /* Firefox */
}

</style>
