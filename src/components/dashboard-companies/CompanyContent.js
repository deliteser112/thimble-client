/* eslint-disable array-callback-return */
import React from 'react';
// material
import { useTheme } from '@material-ui/core/styles';

import { Container } from '@material-ui/core';

import CompanyList from './CompanyList';

export default function DirectoryContent() {
  const theme = useTheme();
  return (
    <Container maxWidth="xl" sx={{ [theme.breakpoints.down('md')]: { px: 0 } }}>
      <CompanyList />
    </Container>
  );
}
