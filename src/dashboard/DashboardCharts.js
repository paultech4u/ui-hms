import React from 'react';
import {
  Line,
  YAxis,
  XAxis,
  Legend,
  Tooltip,
  LineChart,
  CartesianGrid,
} from 'recharts';
import { useSelector } from 'react-redux';
import { patientSelector } from './DashboardStoreSlice';
import { useIsDesktop } from '../hooks';

export function PatientChart(props) {
  const isDesktop = useIsDesktop();
  const patient = useSelector(patientSelector.selectAll);

  return (
    <LineChart data={patient} width={isDesktop ? 400 : 268} height={200}>
      <YAxis />
      <Legend verticalAlign='top' />
      <Tooltip />
      <XAxis dataKey='name' />
      <CartesianGrid strokeDasharray='3 3' />
      <Line type='monotone' dataKey='outpatient' stroke='#8884d8' />
      <Line type='monotone' dataKey='inpatient' stroke='#82ca9d' />
    </LineChart>
  );
}
