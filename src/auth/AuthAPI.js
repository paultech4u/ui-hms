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
    const response = await Auth.post('/login', data, { timeout: 6000 });
    return response;
  } catch (error) {
    return error;
  }
}

export async function LogoutAPI(id) {
  try {
    const response = await Auth.post(
      '/logout',
      {},
      {
        params: {
          id: id,
        },
      }
    );
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
