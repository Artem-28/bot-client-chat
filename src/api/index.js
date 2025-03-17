import ApiInstance from 'src/api/api-instance'

class Api extends ApiInstance {
  connection ({ projectId }, payload) {
    return this._post(`api/v1/projects/${projectId}/chats/respondent-connection`, payload)
  }
}

const api = new Api()

const useApi = () => api

export default useApi
