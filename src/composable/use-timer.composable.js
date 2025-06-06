import { onBeforeUnmount } from 'vue';

export const useTimer = (callback, time) => {
  let timer = null;
  const timeValue = parseInt(String(time), 10);

  const stop = () => {
    if (timer === null) return;
    clearTimeout(timer);
    timer = null;
  };

  const handler = () => {
    callback();
    stop();
  };

  const start = () => {
    if (timer !== null) return;
    timer = setTimeout(handler, timeValue);
  };

  const restart = () => {
    stop();
    start();
  };

  onBeforeUnmount(() => stop());

  return { start, stop, restart };
};
