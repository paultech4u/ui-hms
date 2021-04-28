import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const adapter = createEntityAdapter();

export const hospitalsSelector = adapter.getSelectors(
  (state) => state.dashboard.hospitals
);

export const doctorSelector = adapter.getSelectors(
  (state) => state.dashboard.doctors
);

export const specialistSelector = adapter.getSelectors(
  (state) => state.dashboard.specialist
);

export const patientSelector = adapter.getSelectors(
  (state) => state.dashboard.patient
);

const initialState = {
  hospitals: adapter.getInitialState({
    loading: false,
  }),
  doctors: adapter.getInitialState({
    loading: false,
  }),
  specialist: adapter.getInitialState({
    loading: false,
  }),
  patient: adapter.getInitialState({
    loading: false,
  }),
};

initialState.hospitals.ids = ['1', '2', '3', '4'];
initialState.hospitals.entities = {
  1: { name: 'All' },
  2: { name: 'The Godfather' },
  3: { name: 'The Godfather: Part II' },
  4: { name: 'The Dark Knight' },
};

initialState.doctors.ids = ['1', '2', '3', '4'];
initialState.doctors.entities = {
  1: { name: 'The Shawshank Redemption' },
  2: { name: 'The Godfather' },
  3: { name: 'The Godfather: Part II' },
  4: { name: 'The Dark Knight' },
};

initialState.specialist.ids = ['1', '2', '3', '4'];
initialState.specialist.entities = {
  1: { name: 'The Shawshank Redemption' },
  2: { name: 'The Godfather' },
  3: { name: 'The Godfather: Part II' },
  4: { name: 'The Dark Knight' },
};

initialState.patient.ids = ['1', '2', '3', '4'];
initialState.patient.entities = {
  1: { name: 'Week 09 2021', outpatient: 8, inpatient: 9},
  2: { name: 'Week 10 2021', outpatient: 8, inpatient: 5},
  3: { name: 'Week 11 2021', outpatient: 8, inpatient: 7},
  4: { name: 'Week 12 2021', outpatient: 8, inpatient: 6},
};

const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState,
});

export default dashboardReducer.reducer;
