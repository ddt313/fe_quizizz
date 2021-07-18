import React from 'react';
import {ThemeProvider} from 'styled-components';

import {BaseColor} from './color';
const DefaultTheme = {
  name: 'default',
  colors: {
    primary: '#f05a00',
    secondary: '#F08C1E',
    disable: '#c6c5ca',
    rejected: '#F03232',
    pending: '#C4C4C4',
    approved: '#69B905',
    provide: '#FFB905',
    error: BaseColor.red,
    background: BaseColor.white,
  },
  fonts: ['sans-serif', 'Roboto'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
};

const Theme = ({children}: {children: React.ReactNode}) => (
  <ThemeProvider theme={DefaultTheme}>{children}</ThemeProvider>
);

export default Theme;
