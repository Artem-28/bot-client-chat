import useApi from 'src/api';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import moment from 'moment';

export const useMessage = () => {
  const api = useApi();
  const route = useRoute();
  const widgetId = Number(route.params.widgetId);

  const state = ref({});
  const loaded = ref(false);
  const loading = ref(false);

  const groups = computed(() => Object.values(state.value));

  const count = computed(() => groups.value.length);

  function groupDate(message) {
    return new Date(moment(message.created_at).format('YYYY/MM/DD'));
  }

  function setHistory(data) {
    const groups = data.reduce((acc, message) => {
      const date = groupDate(message);
      const groupKey = date.getTime();
      if (!Object.prototype.hasOwnProperty.call(acc, groupKey)) {
        acc[groupKey] = { date, messages: [] };
      }
      acc[groupKey].messages.push(message);
      return acc;
    }, {});

    Object.entries(groups).forEach(([key, group]) => {
      if (Object.prototype.hasOwnProperty.call(state.value, key)) {
        state.value[key].messages.push(...group.messages);
        return;
      }
      state.value[key] = group;
    });
  }

  async function loadHistory() {
    if (loaded.value) return;

    loading.value = true;
    const { data, success } = await api.getHistory(widgetId);
    loading.value = false;

    if (!success) return;

    setHistory(data);
  }

  function append(message) {
    const date = groupDate(message);
    const groupKey = date.getTime();
    if (!Object.prototype.hasOwnProperty.call(state.value, groupKey)) {
      state.value[groupKey] = { date, messages: [] };
    }
    state.value[groupKey].messages.push(message);
  }

  loadHistory();

  return {
    groups,
    count,
    append,
  };
};
