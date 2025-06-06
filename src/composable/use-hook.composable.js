import { onBeforeUnmount } from 'vue';

export const useHook = () => {
  const hooks = {};

  function _removeHook(type, cb) {
    const idx = hooks[type].indexOf(cb);
    if (idx < 0) return;
    hooks[type].splice(idx, 1);
  }

  function set(type, cb) {
    if (typeof cb !== 'function') return;
    if (!Object.prototype.hasOwnProperty.call(hooks, type)) {
      hooks[type] = [];
    }
    hooks[type].push(cb);
    onBeforeUnmount(() => _removeHook(type, cb));
  }

  function call(type, ...args) {
    if (!Object.prototype.hasOwnProperty.call(hooks, type)) return;
    // eslint-disable-next-line n/no-callback-literal
    hooks[type].forEach(cb => cb(...args));
  }

  return {
    set,
    call,
  };
};
