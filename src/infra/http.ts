import axios, {AxiosResponse} from 'axios';

import {HttpRequestError} from '../modules/ErrorHandler';

export const get = async (endpoint: string, option?: any) => {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    ...option,
  };

  try {
    const response: AxiosResponse<any> = await axios.get(
      `${process.env.REACT_APP_API_URL}${endpoint}`,
      config,
    );

    return response.data;
  } catch (err) {
    if (!err.response) {
      throw new HttpRequestError([{reason: 'NetworkError', message: 'Network Error'}]);
    }
    throw new HttpRequestError(err.response.data.failures, err.response.status);
  }
};

export const post = async (endpoint: string, data: any, option?: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    ...option,
  };

  try {
    const response: AxiosResponse<any> = await axios.post(
      `${process.env.REACT_APP_API_URL}${endpoint}`,
      data,
      config,
    );

    return response.data;
  } catch (err) {
    if (!err.response) {
      throw new HttpRequestError([{reason: 'NetworkError', message: 'Network Error'}]);
    }
    throw new HttpRequestError(err.response.data.failures, err.response.status);
  }
};

export const patch = async (endpoint: string, data: any, option?: any) => {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    ...option,
  };

  try {
    const response: AxiosResponse<any> = await axios.patch(
      `${process.env.REACT_APP_API_URL}${endpoint}`,
      data,
      config,
    );

    return response.data;
  } catch (err) {
    if (!err.response) {
      throw new HttpRequestError([{reason: 'NetworkError', message: 'Network Error'}]);
    }
    throw new HttpRequestError(err.response.data.failures, err.response.status);
  }
};

export const put = async (endpoint: string, data: any, option?: any) => {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    ...option,
  };

  try {
    const response: AxiosResponse<any> = await axios.put(
      `${process.env.REACT_APP_API_URL}${endpoint}`,
      data,
      config,
    );

    return response.data;
  } catch (err) {
    if (!err.response) {
      throw new HttpRequestError([{reason: 'NetworkError', message: 'Network Error'}]);
    }
    throw new HttpRequestError(err.response.data.failures, err.response.status);
  }
};

export const $delete = async (endpoint: string, option?: any) => {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    ...option,
  };

  try {
    const response: AxiosResponse<any> = await axios.delete(
      `${process.env.REACT_APP_API_URL}${endpoint}`,
      config,
    );

    return response.data;
  } catch (err) {
    if (!err.response) {
      throw new HttpRequestError([{reason: 'NetworkError', message: 'Network Error'}]);
    }
    throw new HttpRequestError(err.response.data.failures, err.response.status);
  }
};
