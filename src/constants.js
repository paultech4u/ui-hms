export const hospitalRole = [
  { value: 'NURSE' },
  { value: 'ADMIN' },
  { value: 'DOCTOR' },
];

export const route = {
  NURSE: '/nurse',
  LOGIN: '/login',
  DOCTOR: '/doctor',
  PROFILE: '/profile',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADDPATIENT: '/patient/add',
  ADDNEWDOCTOR: '/doctor/add',
  EMAILREQUEST: '/account/password/reset',
  FORGOTPASSWORD: '/account/password/forgot-password',
};

export const profileRoute = {
  EDIT: '/profile/edit',
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
