import axios from 'axios';

export const Auth = axios.create({
  baseURL: 'http://localhost:5000/user',
});

Auth.interceptors.request.use(
  (request) => {
    return request;
  },
  (err) => {
    return err.request;
  }
);

Auth.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return err.response;
  }
);

export const Admin = axios.create({
  baseURL: 'http://localhost:5000/admin',
});

Admin.interceptors.request.use(
  (request) => {
    return request;
  },
  (err) => {
    return err.request;
  }
);

Admin.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return err.response;
  }
);

export const Hospital = axios.create({
  baseURL: 'http://localhost:5000/hospital',
});

Hospital.interceptors.request.use(
  (request) => {
    return request;
  },
  (err) => {
    return err.request;
  }
);

Hospital.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return err.response;
  }
);
