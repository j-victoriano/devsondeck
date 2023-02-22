import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const DevLogin = () => {
    const theme = createTheme()
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const nav = useNavigate();

    const login = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/devs/login",
            {
                email: email,
                password: password
            },
            {
                withCredentials: true,
            }
        )
            .then((res) => {
                console.log(res);
                console.log("Logging in...");
                setErrorMessage("");
                setLoggedIn(true)
                nav('/jobs');
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            })
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh', display: 'inline-flex', textAlign:'center' }}>
                <CssBaseline />
                <Grid />
                <Typography />
                <h1>Welcome Developers!</h1>
                <p>See why so many out of bootcamp developers choose us to help them find a new career opportunity! Let's connect you to a job!</p>
                <Typography />
                <Grid />
                <Grid item xs={6} sm={8} md={12} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        {errorMessage ? <h8 style={{color:"red"}}>{errorMessage}</h8> : null}
                        <Box component="form" sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button onClick={login}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 , backgroundColor: 'orange' }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/devs/register" variant="body2">
                                        {"Don't have an account? Register Here!"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
} 