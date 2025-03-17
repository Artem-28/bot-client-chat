import { useRoute } from 'vue-router'

export const useParams = () => {
  const route = useRoute()
  const projectId = Number(route.params.projectId)
  const scriptId = Number(route.params.scriptId)
  return {
    projectId,
    scriptId
  }
}
