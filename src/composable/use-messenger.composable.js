import { computed, ref } from 'vue';
import useApi from 'src/api';
import { io } from 'socket.io-client';
import appConfig from 'src/app-config';
import { useHook } from 'src/composable/use-hook.composable';
import { useRoute } from 'vue-router';

const statusType = {
  CONNECTED: 'connected',
  DISCONNECT: 'disconnect',
};

let socket = null;
const status = ref(statusType.DISCONNECT);
const queue = ref([]);

const api = useApi();
const hook = useHook();

export const useMessenger = () => {
  const route = useRoute();
  const canConnected = computed(() => status.value === statusType.DISCONNECT);
  const isConnected = computed(() => status.value === statusType.CONNECTED);

  async function getHeaders() {
    const widgetId = Number(route.params.widgetId);
    try {
      const { data } = await api.getConnectionToken(widgetId);
      return {
        authorization: data,
      };
    } catch (e) {
      console.error(e);
    }
  }

  function sendFromQueue() {
    if (queue.value.length === 0) return;
    const message = queue.value.shift();
    socket.emit('send_message', message);
    sendFromQueue();
  }

  function _connectHandle() {
    status.value = statusType.CONNECTED;
    hook.call('connect');
    socket.on('onmessage', _onMessageHandle);

    const sendFromQueue = () => {
      if (queue.value.length === 0) return;
      const message = queue.value.shift();
      sendMessage(message);
      sendFromQueue();
    };

    sendFromQueue();
  }

  function _onMessageHandle(data) {
    hook.call('onmessage', data);
  }

  function sendMessage(data) {
    queue.value.push(data);
    if (!isConnected.value) return;
    sendFromQueue();
  }

  async function connection() {
    if (!canConnected.value) return;
    const extraHeaders = await getHeaders();
    socket = io(appConfig.ws_url + '/messenger', { extraHeaders });
    socket.on('connect', _connectHandle);
  }

  return {
    isConnected,
    connection,
    sendMessage,
    onConnect: (cb) => hook.set('connect', cb),
    onMessage: (cb) => hook.set('onmessage', cb),
  };
};
