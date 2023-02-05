import React from 'react';

import { ReportInfo } from '../../components/styles/ReoortsInfo';

import brokenLight from '../../../assets/brokenLight.jpeg';

export const MapCallout = ({ report = brokenLight }) => <ReportInfo report={report} isMap />;
