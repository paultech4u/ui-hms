export const authRoute = {
  LOCK: '/lock',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOTPASSWORD: '/forget-password',
};

export const hospitalRole = [
  { value: 'NURSE' },
  { value: 'ADMIN' },
  { value: 'DOCTOR' },
];

export const PageRoute = {
  DASHBOARD: '/dashboard',
  REGISTER: '/register/user',
  PROFILE: '/account/profile',
};

export const ProfileRoute = {
  EDIT: '/edit',
};

export const loadingStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
};

export const authStatus = {
  AUTHENTICATED: true,
  UNAUTHENTICATED: false,
};

export const DrawerWidth = 240;
