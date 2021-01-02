import { Auth, Hospital } from '../api/index';

/**
 * A object rep of data
 * @typedef {Object} data
 */

/**
 * @param {data} data - user credentials
 */
export async function LoginAPI(data) {
  try {
    const response = await Auth.post('/signup', data);
    return response;
  } catch (error) {
    return error;
  }
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
