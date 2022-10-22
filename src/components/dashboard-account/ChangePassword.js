import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Container
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import { passwordError } from '../../utils/helpError';
//
import { MIconButton } from '../@material-extend';
// ----------------------------------------------------------------------

export default function ChangePassword() {
  const { resetPassword } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string().required('New password is required'),
    newPasswordConfirm: Yup.string()
      .required('New password confirm is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords does not match')
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await resetPassword({
          password: values.oldPassword,
          newPassword: values.newPassword,
          newConfirmPassword: values.newPasswordConfirm
        });

        enqueueSnackbar('Password was changed!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });

        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code || error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowOldPassword = () => {
    setShowOldPassword((show) => !show);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword((show) => !show);
  };

  const handleShowNewConfirmPassword = () => {
    setShowNewConfirmPassword((show) => !show);
  };

  return (
    <Container maxWidth="md">
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showOldPassword ? 'text' : 'password'}
            label="Old Password"
            {...getFieldProps('oldPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={handleShowOldPassword} edge="end">
                    <Icon icon={showOldPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={
              Boolean(touched.oldPassword && errors.oldPassword) ||
              passwordError(errors.afterSubmit).error
            }
            helperText={
              (touched.oldPassword && errors.oldPassword) ||
              passwordError(errors.afterSubmit).helperText
            }
          />

          <Box m={2} />
          <TextField
            fullWidth
            autoComplete="new-password"
            type={showNewPassword ? 'text' : 'password'}
            label="New Password"
            {...getFieldProps('newPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={handleShowNewPassword} edge="end">
                    <Icon icon={showNewPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />
          <Box m={2} />

          <TextField
            fullWidth
            autoComplete="new-password-confirm"
            type={showNewConfirmPassword ? 'text' : 'password'}
            label="New Password Confirm"
            {...getFieldProps('newPasswordConfirm')}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={handleShowNewConfirmPassword} edge="end">
                    <Icon
                      icon={showNewConfirmPassword ? eyeFill : eyeOffFill}
                    />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(
              touched.newPasswordConfirm && errors.newPasswordConfirm
            )}
            helperText={touched.newPasswordConfirm && errors.newPasswordConfirm}
          />
          <Box m={2} />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            pending={isSubmitting}
          >
            Change Password
          </LoadingButton>
        </Form>
      </FormikProvider>
    </Container>
  );
}
