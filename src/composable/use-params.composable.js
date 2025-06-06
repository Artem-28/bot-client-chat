import { useRoute } from 'vue-router';

export const useParams = () => {
  const route = useRoute();
  const widgetId = Number(route.params.widgetId);
  console.log(route.params);
  return { widgetId };
};
