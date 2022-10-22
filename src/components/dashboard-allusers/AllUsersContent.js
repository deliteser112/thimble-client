/* eslint-disable array-callback-return */
import React from 'react';

import { Container } from '@material-ui/core';

// ----------------------------------------------------------------------

import UserLists from './UserList';

export default function DirectoryContent() {
  return (
    <Container maxWidth="xl">
      <UserLists />
    </Container>
  );
}
