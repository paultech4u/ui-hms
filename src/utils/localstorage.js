export function getToken() {
  const expire = localStorage.getItem('@expiresIn');
  const accessToken = localStorage.getItem('@accesstoken');
  const refreshToken = localStorage.getItem('@refreshtoken');
  return {
    expire,
    accessToken,
    refreshToken,
  };
}

export function setToken(accessToken, refreshToken, exp) {
  localStorage.setItem('@expiresIn', exp);
  localStorage.setItem('@accessToken', accessToken);
  localStorage.setItem('@refreshtoken', refreshToken);
  return;
}

export function removeToken() {
  localStorage.removeItem('@accessToken');
  localStorage.removeItem('@expiresIn');
  localStorage.removeItem('@refreshtoken');
  return;
}
