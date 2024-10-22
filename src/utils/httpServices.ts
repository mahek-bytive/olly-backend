import axios, { AxiosResponse } from 'axios';

interface HttpConfig {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
}

interface DataPayload {
  [key: string]: unknown;
}

class HttpService {
  public async axiosGet(url: string, config: HttpConfig): Promise<AxiosResponse> {
    return axios.get(url, config);
  }

  public async axiosPost(
    url: string,
    data: DataPayload | FormData | string,
    config?: HttpConfig,
  ): Promise<AxiosResponse> {
    return axios.post(url, data, config);
  }

  public async axiosPut(
    url: string,
    data: DataPayload,
    config?: HttpConfig,
  ): Promise<AxiosResponse> {
    return axios.put(url, data, config);
  }

  public async axiosPatch(
    url: string,
    data: DataPayload,
    config?: HttpConfig,
  ): Promise<AxiosResponse> {
    return axios.patch(url, data, config);
  }

  public async axiosDelete(url: string, config?: HttpConfig): Promise<AxiosResponse> {
    return axios.delete(url, config);
  }
}

export default new HttpService();
