import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Slide,
  Alert,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SlideTransition = (props) => <Slide {...props} direction="right" />;

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    Transition: SlideTransition,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords don't match!",
        Transition: SlideTransition,
      });
      return;
    }

    try {
      await axios.patch(
        `https://day-41-back-end-xxd9.onrender.com/api/reset-password/${token}`,
        {
          password,
        }
      );
      setSnackbar({
        open: true,
        message: "Password reset successfully!",
        Transition: SlideTransition,
      });
      navigate("/login");
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response.data.message || "Server error. Please try again.",
        Transition: SlideTransition,
      });
    }
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
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
};

export default ResetPassword;
