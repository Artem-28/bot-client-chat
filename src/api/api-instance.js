import { api } from 'boot/axios';
import useToken from 'src/api/use-token';

export default class ApiInstance {
  get headers() {
    const data = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const token = useToken();
    const { valid, Authorization } = token.get();
    if (valid) {
      data.Authorization = Authorization;
    }
    return data;
  }

  async _get(url, params) {
    const { data } = await api.get(url, {
      params,
      headers: this.headers,
    });
    return data;
  }

  async _post(url, payload, params) {
    const { data } = await api.post(url, payload, {
      params,
      headers: this.headers,
    });
    return data;
  }

  async _delete(url, params) {
    const { data } = await api.delete(url, {
      params,
      headers: this.headers,
    });
    return data;
  }

  async _path(url, payload, params) {
    const { data } = await api.patch(url, payload, {
      params,
      headers: this.headers,
    });
    return data;
  }

  async _put(url, payload, params) {
    const { data } = await api.put(url, payload, {
      params,
      headers: this.headers,
    });
    return data;
  }
}
