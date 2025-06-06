import { nextTick, onBeforeUnmount, onMounted } from 'vue';
import { useTimer } from 'src/composable/use-timer.composable';

export const useResizeObserver = (targetRef, cb, debounce = 0) => {
  let targetEl = null;
  let observer = null;
  const size = { width: -1, height: -1 };
  // eslint-disable-next-line no-use-before-define
  const { start: startTimer, stop: stopTimer } = useTimer(emitEvent, debounce);

  function emitEvent() {
    stopTimer();
    if (!targetEl || typeof cb !== 'function') return;
    const { offsetWidth: width, offsetHeight: height } = targetEl;

    if (width !== size.width || height !== size.height) {
      size.width = width;
      size.height = height;
      cb(size);
    }
  }

  function trigger() {
    window.requestAnimationFrame(() => {
      if (debounce === 0) {
        emitEvent();
        return;
      }
      startTimer();
    });
  }

  function init(stop = false) {
    if (targetRef.value) {
      targetEl = targetRef.value;
      observer = new ResizeObserver(trigger);
      observer.observe(targetEl);
      return;
    }
    if (!stop) {
      nextTick(() => init(true));
    }
  }

  onMounted(() => init());

  onBeforeUnmount(() => {
    observer.disconnect();
    observer = null;
    targetEl = null;
  });
};
