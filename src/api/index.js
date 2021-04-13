import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:5000',
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
export async function getProfileDetails(token) {
  try {
    const response = await http.get('/get-profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}
