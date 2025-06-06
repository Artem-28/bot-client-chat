<template>
  <div ref="containerRef" class="bubbles-group">
    <div ref="headerRef" :class="headerClasses">
      <slot name="header" v-bind="group" />
    </div>
    <div class="bubbles-group__content">
      <template v-for="n in count" :key="group.messages[ count - n].id">
        <slot name="item" :item="group.messages[ count - n]" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref, watch } from 'vue';
import { MESSENGER_TEMPLATE_KEY } from 'src/utils';
import { useTimer } from 'src/composable';

const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
});

const { scrollPosition, rootRef, rootHeight } = inject(MESSENGER_TEMPLATE_KEY, {});

const containerRef = ref(null);
const headerRef = ref(null);
const outsideHeader = ref(false);
const touch = ref(false);

const { restart } = useTimer(updateVisibleHeader, 1000);

const count = computed(() => props.group.messages.length);

const headerClasses = computed(() => {
  const classes = ['bubbles-group__header'];

  if (outsideHeader.value) {
    classes.push('fade-out');
  }
  if (!touch.value) return classes;

  classes.push('bubbles-group__header--sticky');
  const visible = headerRef.value.classList.contains('fade-out');
  if (!outsideHeader.value && visible) {
    classes.push('fade-in');
  }
  return classes;
});

function updateVisibleHeader() {
  const rootRect = rootRef.value.getBoundingClientRect();
  const containerRect = containerRef.value.getBoundingClientRect();
  const position = containerRect.top - rootRect.top;
  outsideHeader.value = position < -12;
}

watch(scrollPosition, () => {
  touch.value = true;
  outsideHeader.value = false;
  restart();
});

watch(rootHeight, () => updateVisibleHeader());

onMounted(() => updateVisibleHeader());
</script>

<style scoped lang="scss">
.bubbles-group {
  position: relative;
  &__content {
    display: flex;
    flex-direction: column-reverse;
    gap: 8px;
    padding: 8px;
  }
  &__header {
    display: flex;
    justify-content: center;
    padding-top: 4px;
    opacity: 1;
  }
  &__header--sticky {
    top: 4px;
    position: sticky;
  }
}

.fade-out {
  animation: fadeOut 1s ease-in-out forwards;
}

.fade-in {
  animation: fadeIn 1s ease-in-out forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
