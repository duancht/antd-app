import { request } from 'umi';

export const fetch = async (api, data, method) => {
  const info = {
    method,
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  if (method === 'get') {
    delete info.body;
  }
  return request(api, info);
};

export const queryData = (uri, urlParams = {}, data = {}, method = 'post') => {
  let params = '';
  Object.keys(urlParams).forEach((key, index) => {
    if (index === 0) {
      params = `${key}=${urlParams[key]}`;
    } else {
      params = `${params}&${key}=${urlParams[key]}`;
    }
  });

  params = params.length ? `?${params}` : '';

  return fetch(`/api/${uri}${params}`, JSON.stringify(data), method);
};
