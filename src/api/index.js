import ApiInstance from 'src/api/api-instance'

class Api extends ApiInstance {
  connection ({ projectId, scriptId }) {
    return this._get(`api/v1/projects/${projectId}/scripts/${scriptId}/messengers/connection`)
  }
}

const api = new Api()

const useApi = () => api

export default useApi
