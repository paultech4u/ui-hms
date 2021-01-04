export function getToken() {
  const accessToken = localStorage.getItem('@accesstoken');
  const expire = localStorage.getItem('@expiresIn');
  return {
    accessToken,
    expire,
  };
}

export function setToken(accessToken, exp) {
  localStorage.setItem('@accessToken', accessToken);
  localStorage.setItem('@expiresIn', exp);
  return;
}

export function removeToken() {
  localStorage.removeItem('@accessToken');
  localStorage.removeItem('@expiresIn');
  return;
}
