export const authRoute = {
  LOCK: '/lock',
  LOGIN: '/login',
  REGISTER: '/register',
  REQUESTEMAIL: '/reset',
  FORGOTPASSWORD: '/forgot-password',
};

export const hospitalRole = [
  { value: 'NURSE' },
  { value: 'ADMIN' },
  { value: 'DOCTOR' },
];

export const pageRoute = {
  PROFILE: '/profile',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  EDITPROFILE: '/profile/edit',
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
