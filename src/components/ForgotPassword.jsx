import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  CssBaseline,
  Typography,
  Snackbar,
  Slide,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SlideTransition = (props) => <Slide {...props} direction="right" />;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    Transition: SlideTransition,
  });
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get("email");
      // Send email to the user with a reset link
      await axios.post(
        "https://day-41-back-end-xxd9.onrender.com/api/forgot-password",
        { email: email }
      );
      setSnackbar({
        open: true,
        message: "Check your email for the password reset link.",
        Transition: SlideTransition,
      });
      setIsError(false);
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response.data.message || "Server error. Please try again.",
        Transition: SlideTransition,
      });
      setIsError(true);
      console.error(err);
      return;
    }
  };
  const handleClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <div>
      <Container maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Reset Link
            </Button>
          </Box>
        </Box>
      </Container>
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
          severity={isError ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
