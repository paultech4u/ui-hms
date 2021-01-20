export const AuthRoute = {
  LOCK: '/lock',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGET_PASSWORD: '/account/reset/password',
};

export const HospitalRoles = [
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

export const LoadingStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
};

export const AuthStatus = {
  AUTHENTICATED: true,
  UNAUTHENTICATED: false,
};

export const DrawerWidth = 240;
