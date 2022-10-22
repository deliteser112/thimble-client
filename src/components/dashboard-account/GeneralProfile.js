/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  CardContent
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getOfficeList, getTeamList } from '../../redux/slices/adminSetting';
import { getProfile } from '../../redux/slices/user';

// hooks
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { UploadAvatar } from '../upload';
//
import DayStatusButtonGroup from '../dashboard-component/DayStatusButtonGroup';
import TeamCategoryGroup from '../dashboard-component/TeamCategoryGroup';
// ----------------------------------------------------------------------
let initialOffices = [];
let initialTeams = [];

AccountGeneral.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function AccountGeneral({ isEdit, currentUser }) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { updateProfile } = useAdmin();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { officeList, teamList } = useSelector((state) => state.adminSetting);
  const { myProfile } = useSelector((state) => state.user);

  const [offices, setOffices] = useState([]);
  const [officeIds, setOfficeIds] = useState([]);

  const [teams, setTeams] = useState([]);
  const [teamIds, setTeamIds] = useState([]);

  useEffect(() => {
    dispatch(getOfficeList());
    dispatch(getTeamList());
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    const OfficeStatus = [];
    officeList.map((office) => {
      const data = {
        id: office.id,
        label: office.name,
        icon: office.emoji
      };

      OfficeStatus.push(data);
    });

    const TeamStatus = [];
    teamList.map((team) => {
      const data = {
        id: team.id,
        label: team.name,
        color: team.color
      };

      TeamStatus.push(data);
    });

    setOffices([...OfficeStatus]);
    setTeams([...TeamStatus]);
  }, [officeList, teamList]);

  useEffect(() => {
    if (isEdit && currentUser !== undefined) {
      initialOffices = [];
      initialTeams = [];
      if (currentUser.offices !== undefined) {
        currentUser.offices.map((office) => {
          initialOffices.push(Number(office));
        });
        setOfficeIds(initialOffices);

        currentUser.teams.map((team) => {
          initialTeams.push(Number(team));
        });
        setTeamIds(initialTeams);
      }
    } else if (myProfile !== null) {
      initialOffices = [];
      initialTeams = [];
      myProfile.offices.map((office) => {
        initialOffices.push(Number(office));
      });
      setOfficeIds(initialOffices);

      myProfile.teams.map((team) => {
        initialTeams.push(Number(team));
      });
      setTeamIds(initialTeams);
    }
  }, [isEdit, currentUser, myProfile]);

  const UpdateUserSchema = Yup.object().shape({
    firstname: Yup.string().required('FirstName is required'),
    lastname: Yup.string().required('LastName is required')
  });

  const setStatusProps = (selectedIds) => {
    setOfficeIds(selectedIds);
  };

  const handleTeamSelected = (teamStatus) => {
    setTeamIds(teamStatus);
  };

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      firstname: isEdit ? currentUser?.firstname || '' : user.firstname,
      lastname: isEdit ? currentUser?.lastname || '' : user.lastname,
      prefferedname: isEdit
        ? currentUser?.prefferedname || ''
        : user.prefferedname,
      jobtitle: isEdit ? currentUser?.jobtitle || '' : user.jobtitle,
      email: isEdit ? currentUser?.email || '' : user.email,
      departmentname: isEdit
        ? currentUser?.departmentname || ''
        : user.departmentname,
      photoURL: isEdit ? currentUser?.photoURL || '' : user.photoURL
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const officeId = officeIds;
        const teamId = teamIds;

        const tmpPhoto =
          values.photoURL === null ? '/static/uploads/1.jpg' : values.photoURL;
        await updateProfile({
          ...values,
          photoURL: tmpPhoto,
          officeId,
          teamId
        });
        enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <Box
                sx={{
                  my: 10,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}
              >
                <UploadAvatar
                  value={values.photoURL}
                  onChange={(value) => setFieldValue('photoURL', value)}
                />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      {...getFieldProps('firstname')}
                      value={values.firstname}
                      error={Boolean(touched.firstname && errors.firstname)}
                      helperText={touched.firstname && errors.firstname}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      {...getFieldProps('lastname')}
                      error={Boolean(touched.lastname && errors.lastname)}
                      helperText={touched.lastname && errors.lastname}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Preffered Name"
                      {...getFieldProps('prefferedname')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Job Title"
                      {...getFieldProps('jobtitle')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      disabled
                      label="Email Address"
                      {...getFieldProps('email')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Department Name"
                      {...getFieldProps('departmentname')}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mb: 5 }} />
                {user.roles === 'ADMIN' && (
                  <>
                    <Box>
                      <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
                        Offices*
                      </Typography>
                      <DayStatusButtonGroup
                        officeInitProps={officeIds}
                        statusProps={setStatusProps}
                        officeGroups={offices}
                        isMulti
                        sx={{ textAlign: 'left !important' }}
                      />
                    </Box>
                    <Box sx={{ mb: 5 }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
                        My Teams
                      </Typography>
                      <TeamCategoryGroup
                        teamInitProps={teamIds}
                        daygroups={teams}
                        teamStatusProps={handleTeamSelected}
                        sx={{ textAlign: 'left' }}
                      />
                    </Box>
                  </>
                )}
                <Box
                  sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    pending={isSubmitting}
                  >
                    Save Changes
                  </LoadingButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
