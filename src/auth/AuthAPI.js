import { Auth, Admin, Hospital } from '../api/index';
import axios from 'axios';

/**
 * A object rep of data
 * @typedef {Object} data
 */

/**
 * @param {data} data - user credentials
 */
export async function loginUserAPI(data) {
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
  } catch (error) {
    return error.response;
  }
}

export async function forgetPasswordAPI(data) {
  try {
    const response = await axios.post(
      'http://localhost:5000/forget-password',
      data
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

/**
 * @param {Object} data - user credentials
 */
export async function addHospital(data) {
  try {
    const res = await Hospital.post('/register', data);
    return res;
  } catch (error) {
    return error;
  }
}

export async function addHospitalAdmin(data) {
  try {
    const res = await Admin.post('/signup', data);
    return res;
  } catch (error) {
    return error;
  }
}
