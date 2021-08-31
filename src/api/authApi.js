import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const http = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_LOCALHOST_SERVER
      : process.env.REACT_APP_HMS_BASE_URL,
});

http.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return error.request;
  }
);

http.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    return error.response;
  }
);

/**
 * @typedef {{}} object
 */

/**
 * User information sent to server
 * @param {object} payload credentials
 */
export async function login(payload) {
  try {
    const response = await http.post('/login', payload, { timeout: 2000 });
    return response;
  } catch (error) {
    return error;
  }
}

export async function refreshToken(token) {
  try {
    const response = await http.post(
      '/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

/**
 * @typedef {{}} object
 */

/**
 * @param {object} payload credentials
 */
export async function forgetPassword(payload) {
  try {
    const response = await http.post('/forget-password', payload);
    return response;
  } catch (error) {
    return error.response;
  }
}

/**
 * @typedef {{}} object
 */

/**
 * @param {object} payload credentials
 */
export async function addHospital(payload) {
  try {
    const res = await http.post('/register-hospital', payload);
    return res;
  } catch (error) {
    return error;
  }
}

/**
 * @typedef {{}} object
 */

/**
 * @param {object} payload credentials
 */
export async function addHospitalAdmin(payload) {
  try {
    const res = await http.post('/create-admin', payload);
    return res;
  } catch (error) {
    return error;
  }
}
