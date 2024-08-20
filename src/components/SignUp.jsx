import React from 'react';
import { Container, Box, TextField, Button, Typography, CssBaseline, Snackbar, Slide, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function SignUp() {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success',
    Transition: SlideTransition,
  });

  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.string('Enter your name').required('Name is required'),
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    password: yup.string('Enter your password').min(6, 'Password should be of minimum 6 characters length').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('https://day-41-back-end-xxd9.onrender.com/api/register', values);
        setSnackbar({
          open: true,
          message: 'Registration successful!',
          severity: 'success',
          Transition: SlideTransition,
        });
        resetForm();
        setTimeout(() => {
            navigate('/login');
        }, 5000);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.response?.data?.message || 'Server error. Please try again.',
          severity: 'error',
          Transition: SlideTransition,
        });
        console.error('Error registering user:', err);
      }
    },
  });

  const handleClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        onClose={handleClose}
        TransitionComponent={snackbar.Transition}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
      >
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SignUp;
