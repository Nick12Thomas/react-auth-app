import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Container, Typography, Box } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and Password are required");
      return;
    }

    try {
      const formData = { email, password };

      // API call to the login endpoint
      const response = await axios.post("https://bffapi.biztel.ai:8080/api/auth/login", formData);

      // Assuming the backend sends the JWT token in response
      const token = response.data.token; // or response.data.accessToken
      localStorage.setItem("token", token); // Store JWT token in localStorage

      console.log("Login successful");

      // Redirect to dashboard or home page (optional)
      // window.location.href = '/dashboard';
      
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(error.response ? error.response.data.message : "Invalid credentials");
    }
  };

  return (
    <Container>
      <Box sx={{ maxWidth: 400, margin: "auto", paddingTop: 4 }}>
        <Typography variant="h4" align="center">Login</Typography>
        {errorMessage && (
          <Typography color="error" variant="body2" align="center">{errorMessage}</Typography>
        )}
        <form onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;