import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Container, Snackbar, Slide, Alert } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

function SlideTransition(props) {
    return <Slide {...props} direction="right" />;
}

export default function Login() {
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        Transition: SlideTransition,
    });

    const navigate = useNavigate();

    const LoginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email('Enter a valid email')
                .required('Please, enter an email'),
            password: yup
                .string()
                .min(6, 'Password should be above 6 characters')
                .required('Please, enter a password'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('https://day-41-back-end-xxd9.onrender.com/api/login', values);
                console.log('Login Successful:', response.data);
                LoginFormik.resetForm();
                navigate('/home');
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: error.response.data.message || 'Login failed. Please try again.',
                    Transition: SlideTransition,
                });
                console.error('Login Failed:', error);
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={LoginFormik.handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={LoginFormik.values.email}
              onChange={LoginFormik.handleChange}
              onBlur={LoginFormik.handleBlur}
              error={
                LoginFormik.touched.email && Boolean(LoginFormik.errors.email)
              }
              helperText={LoginFormik.touched.email && LoginFormik.errors.email}
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
              value={LoginFormik.values.password}
              onChange={LoginFormik.handleChange}
              onBlur={LoginFormik.handleBlur}
              error={
                LoginFormik.touched.password &&
                Boolean(LoginFormik.errors.password)
              }
              helperText={
                LoginFormik.touched.password && LoginFormik.errors.password
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link to="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={snackbar.open}
          onClose={handleClose}
          TransitionComponent={snackbar.Transition}
          message={snackbar.message}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={6000}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    );
}
