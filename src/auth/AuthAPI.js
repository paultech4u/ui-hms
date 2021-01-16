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
    const response = await Auth.post('/login', data, { timeout: 6000 });
    return response;
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
export async function RegisterHospitalAPI(data) {
  try {
    const response = await Hospital.post('/register', data);
    return response;
  } catch (error) {
    return error;
  }
}
