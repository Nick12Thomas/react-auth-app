import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Container, Typography, Box } from "@mui/material";

function Signup() {
  // State to handle form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (!name || !email || !password || !confirmPassword || !inviteCode) {
      setErrorMessage("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // API call to the signup endpoint
      const formData = {
        name,
        email,
        password,
        inviteCode
      };

      // Ensure the correct URL (baseUrl + /api/auth/signup) is used
      const response = await axios.post("/api/auth/signup", formData); // Using proxy configured in package.json
      console.log("Signup successful:", response.data);

      // Handle successful signup (e.g., redirect to login page)
      // Redirecting to login (Optional)
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