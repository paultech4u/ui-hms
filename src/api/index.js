import axios from 'axios';
import { getToken } from '../utils/localstorage';

export const Auth = axios.create({
  baseURL: 'http://localhost:5000/users',
  headers: {
    Authorization: `Bearer ${getToken}`,
  },
});

export const Hospital = axios.create({
  baseURL: 'http://localhost:5000/hospital',
});

Hospital.interceptors.request.use(
  (request) => {
    console.log('From request interceptor: ', request);
    return request;
  },
  (err) => {
    return err.request;
  }
);

Hospital.interceptors.response.use(
  (response) => {
    console.log('From response interceptor: ', response);
    return response;
  },
  (err) => {
    return err.response;
  }
);
