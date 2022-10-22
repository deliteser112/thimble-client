import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { Button, Paper, Container } from '@material-ui/core';

import useAdmin from '../../hooks/useAdmin';

const FootBarForSave = styled('div')(({ theme }) => ({
  position: 'fixed',
  left: 0,
  bottom: 0,
  height: 100,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: 'calc(100% - 279px)',
    marginLeft: 279
  }
}));

SaveChange.propTypes = {
  setCancelProps: PropTypes.func,
  saveDataProps: PropTypes.object
};

export default function SaveChange({ setCancelProps, saveDataProps }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveData, setSaveData] = useState(saveDataProps);
  const { updateOrganizations } = useAdmin();

  useEffect(() => {
    setSaveData(saveDataProps);
  }, [saveDataProps]);
  const handleChangedSaveAll = async () => {
    setIsSubmitting(true);
    const updatedOrg = saveData;
    await updateOrganizations({ updatedOrg });
    enqueueSnackbar('Update success', { variant: 'success' });
    setIsSubmitting(false);
    setCancelProps(true);
  };

  const handleSaveCancel = () => {
    setCancelProps(true);
  };

  return (
    <FootBarForSave>
      <Container maxWidth="md">
        <Paper
          sx={{
            textAlign: 'center',
            padding: theme.spacing(3, 1),
            borderRadius: '100px',
            boxShadow:
              '0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%)'
          }}
        >
          <LoadingButton
            variant="contained"
            pending={isSubmitting}
            onClick={handleChangedSaveAll}
          >
            Save Changes
          </LoadingButton>
          <Button
            variant="outlined"
            sx={{ marginLeft: 5 }}
            onClick={handleSaveCancel}
          >
            Cancel
          </Button>
        </Paper>
      </Container>
    </FootBarForSave>
  );
}
