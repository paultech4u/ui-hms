export const AuthRoute = {
  LOGIN: '/login',
  REGISTER: '/register',
  LOCK: '/lock',
  FORGET_PASSWORD: '/account/reset/password',
};

export const HospitalRoles = [
  { value: 'NURSE' },
  { value: 'ADMIN' },
  { value: 'DOCTOR' },
];

export const PageRoute = {
  DASHBOARD: '/dashboard',
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
