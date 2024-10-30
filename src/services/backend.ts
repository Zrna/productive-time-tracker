import axios, { AxiosRequestConfig } from 'axios';

type AxiosFunction = <T>(
  url: string,
  config?: AxiosRequestConfig
) => Promise<T>;
type AxiosDataFunction = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => Promise<T>;

function backendService() {
  const baseURL = process.env.REACT_APP_API_URL;
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
  const orgId = process.env.REACT_APP_ORG_ID;

  if (!baseURL) {
    throw new Error('REACT_APP_API_URL env variable is missing');
  }

  if (!accessToken) {
    throw new Error('REACT_APP_ACCESS_TOKEN env variable is missing');
  }

  if (!orgId) {
    throw new Error('REACT_APP_ORG_ID env variable is missing');
  }

  const instance = axios.create({
    baseURL,
    headers: {
      'X-Auth-Token': accessToken,
      'X-Organization-Id': orgId,
      contentType: 'application/vnd.api+json',
    },
  });

  instance.interceptors.response.use(
    async response => {
      return response.data as any;
    },
    async error => {
      return Promise.reject(error);
    }
  );

  return {
    get: instance.get as AxiosFunction,
    post: instance.post as AxiosDataFunction,
    delete: instance.delete as AxiosFunction,
    put: instance.put as AxiosDataFunction,
    patch: instance.patch as AxiosDataFunction,
  };
}

export const backend = backendService();
