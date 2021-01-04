import { Auth } from '../api';

export async function FetchUserProfileAPI(token) {
  try {
    const response = await Auth.get('/get-profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}
