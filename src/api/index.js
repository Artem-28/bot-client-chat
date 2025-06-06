import ApiInstance from 'src/api/api-instance';

class Api extends ApiInstance {
  getConnectionToken(widgetId) {
    return this._get(`widget-api/v1/widgets/${widgetId}/connected`);
  }

  getHistory(widgetId) {
    return this._get(`widget-api/v1/widgets/${widgetId}/history`);
  }
}

const api = new Api();

const useApi = () => api;

export default useApi;
