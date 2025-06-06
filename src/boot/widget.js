import { computed, onBeforeUnmount, ref } from 'vue';

const INCOMING_CALL_KEY = '_app_client_messenger';
const OUTGOING_CALL_KEY = '_app_client_widget';

const incomingCall = {
  OPEN_MESSENGER: 'open_messenger',
  CLOSE_MESSENGER: 'close_messenger',
  CHANGE_MESSENGER_MODE: 'change_messenger_mode',
};
const outgoingCall = {
  UPDATE_STATE: 'update_messenger_state',
};

const hooks = {
  [incomingCall.OPEN_MESSENGER]: [],
  [incomingCall.CLOSE_MESSENGER]: [],
  [incomingCall.CHANGE_MESSENGER_MODE]: [],
};

const viewMode = {
  STANDARD: 'standard',
  POPUP: 'popup',
  FULLSCREEN: 'fullscreen',
};

const _state = ref({
  open: false,
  mode: viewMode.STANDARD,
});

const state = computed(() => _state.value);

function _removeHook(type, cb) {
  const idx = hooks[type].indexOf(cb);
  if (idx < 0) return;
  hooks[type].splice(idx, 1);
}

function _setHook(type, cb) {
  if (!Object.prototype.hasOwnProperty.call(hooks, type) || typeof cb !== 'function') return;
  hooks[type].push(cb);
  onBeforeUnmount(() => _removeHook(type, cb));
}

function _updateState(data) {
  _state.value = { ..._state.value, ...data };
  _sendCommand(outgoingCall.UPDATE_STATE, { ..._state.value });
}

function _callHook(type) {
  if (!Object.prototype.hasOwnProperty.call(hooks, type)) return;
  hooks[type].forEach(cb => cb(state.value));
}

function _openMessenger() {
  _updateState({ open: true });
  _callHook(incomingCall.OPEN_MESSENGER);
}

function _closeMessenger() {
  _updateState({ open: false, mode: viewMode.STANDARD });
  _callHook(incomingCall.CLOSE_MESSENGER);
}

function _changeMode(mode) {
  const valid = Object.values(viewMode).includes(mode);
  if (!valid) {
    console.error('Error mode: invalid mode value');
    return;
  }
  _updateState({ mode });
  _callHook(incomingCall.CHANGE_MESSENGER_MODE);
}

const _attachedCallback = function(e) {
  if (e.data.key !== INCOMING_CALL_KEY) return;
  switch (e.data.type) {
    case incomingCall.OPEN_MESSENGER:
      _openMessenger();
      break;
    case incomingCall.CLOSE_MESSENGER:
      _closeMessenger();
      break;
  }
};

function _setWindowEvent() {
  if (typeof window.addEventListener !== 'function') return;
  window.removeEventListener('message', _attachedCallback);
  window.addEventListener('message', _attachedCallback);
}

function _sendCommand(type, payload) {
  if (typeof parent.postMessage !== 'function') return;
  parent.postMessage({
    key: OUTGOING_CALL_KEY,
    type,
    payload,
  }, '*');
}

_setWindowEvent();

const instance = {
  isOpen: computed(() => _state.value.open),
  mode: computed(() => _state.value.mode),
  open: _openMessenger,
  close: _closeMessenger,
  changeMode: _changeMode,
  onOpen: (cb) => _setHook(incomingCall.OPEN_MESSENGER, cb),
  onClose: (cb) => _setHook(incomingCall.CLOSE_MESSENGER, cb),
  onMode: (cb) => _setHook(incomingCall.CHANGE_MESSENGER_MODE, cb),
};

function getWidgetInstance() {
  return instance;
}

export {
  getWidgetInstance,
  viewMode,
};
