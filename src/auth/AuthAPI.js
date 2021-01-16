import { Auth, Hospital } from '../api/index';
import axios from 'axios';

/**
 * A object rep of data
 * @typedef {Object} data
 */

/**
 * @param {data} data - user credentials
 */
export async function loginAPI(data) {
  try {
    const res = await Auth.post('/login', data, { timeout: 6000 });
    return res;
  } catch (error) {
    return error;
  }
}

export async function refreshTokenAPI(token) {
  try {
    const response = await axios.post(
      'http://localhost:5000/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {}
}

/**
 * @param {Object} data - user credentials
 */
export async function registerNewHospital(data) {
  try {
    const res = await Hospital.post('/register', data);
    return res;
  } catch (error) {
    return error;
  }
}

export async function registerHospitalAdmin(data) {
  try {
    const res = await Auth.post('/signup', data);
    return res;
  } catch (error) {
    return error;
  }
}
