export function getToken() {
  const token = localStorage.getItem('@accesstoken');
  return token;
}

export function setToken(token) {
  localStorage.setItem('@accesstoken', token);
}
