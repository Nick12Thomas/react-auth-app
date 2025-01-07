import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Container, Typography, Box } from "@mui/material";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword || !inviteCode) {
      setErrorMessage("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const formData = {
        name,
        email,
        password,
        inviteCode
      };

      // API call to the signup endpoint
      const response = await axios.post("https://bffapi.biztel.ai:8080/api/auth/signup", formData);

      // Assuming the backend sends the JWT token in response
      const token = response.data.token;
      localStorage.setItem("token", token); // Store JWT token in localStorage

      console.log("Signup successful");

      // Redirect to login or dashboard (optional)
      // window.location.href = '/login';
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage(error.response ? error.response.data.message : "Something went wrong");
    }
  };

  return (
    <Container>
      <Box sx={{ maxWidth: 400, margin: "auto", paddingTop: 4 }}>
        <Typography variant="h4" align="center">Sign Up</Typography>
        {errorMessage && (
          <Typography color="error" variant="body2" align="center">{errorMessage}</Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <TextField
            label="Invite Code"
            variant="outlined"
            fullWidth
            margin="normal"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Signup;