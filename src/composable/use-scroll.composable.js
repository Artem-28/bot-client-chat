import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

export const useScroll = (targetRef, cb = null) => {
  const scrollPosition = ref(0);
  const scrollDirect = ref('ttb');

  function getScrollPosition() {
    if (!targetRef.value) return 0;
    return targetRef.value.scrollTop;
  }

  function setScrollPosition(position) {
    updateDirect(position);
    scrollPosition.value = position;
    if (!targetRef.value) return;
    targetRef.value.scrollTo(0, position);
  }

  function updateDirect(position) {
    scrollDirect.value = position < scrollPosition.value ? 'ttb' : 'btt';
  }

  function emitEvent() {
    if (typeof cb !== 'function') return;
    const event = {
      scrollDirect: scrollDirect.value,
      setScrollPosition: scrollPosition.value,
    };
    cb(event);
  }

  function trigger() {
    const position = getScrollPosition();
    updateDirect(position);
    scrollPosition.value = position;
    emitEvent();
  }

  function updateScrollEvent() {
    targetRef.value.removeEventListener('scroll', trigger);
    targetRef.value.addEventListener('scroll', trigger);
    trigger();
  }

  function setupScroll(stop = false) {
    if (targetRef.value) {
      updateScrollEvent();
      return;
    }
    if (!stop) {
      nextTick(() => setupScroll(true));
    }
  }

  onMounted(() => setupScroll());
  onBeforeUnmount(() => {
    if (!targetRef.value) return;
    targetRef.value.removeEventListener('scroll', trigger);
  });

  return {
    scrollDirect: computed(() => scrollDirect.value),
    scrollPosition: computed(() => scrollPosition.value),
    setScrollPosition,
  };
};
