import React from 'react';
import {
  Bar,
  Line,
  YAxis,
  XAxis,
  Legend,
  Tooltip,
  BarChart,
  LineChart,
  CartesianGrid,
} from 'recharts';
import { useIsDesktop } from '../hooks';
import { useSelector } from 'react-redux';
import { patientSelector } from './DashboardStoreSlice';

/**
 * patients line chart sorted by Inpatients and Outpatients
 */
export function PatientCountLineChart(props) {
  const isDesktop = useIsDesktop();
  const patient = useSelector(patientSelector.selectAll);

  return (
    <LineChart height={200} data={patient} width={isDesktop ? 400 : 268}>
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

/**
 * patients line chart sorted by specialization
 * for Inpatients and Outpatients
 */
export function PatientCountBarChartBySpec(props) {
  const isDesktop = useIsDesktop();
  const patient = useSelector(patientSelector.selectAll);

  return (
    <BarChart
      height={200}
      data={patient}
      // layout='vertical'
      width={isDesktop ? 400 : 468}>
      <Tooltip />
      <XAxis dataKey='name' />
      <YAxis />
      <Legend verticalAlign='top' />
      <CartesianGrid strokeDasharray='3 3' />
      <Bar dataKey='outpatient' fill='#8884d8' />
      <Bar dataKey='inpatient' fill='#82ca9d' />
    </BarChart>
  );
}
