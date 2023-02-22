import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const DevRegistration = (props) => {
    const [confirmReg, setConfirmReg] = useState('');
    const [errors, setErrors] = useState('');
    const theme = createTheme();
    const [dev, setDev] = useState({
        firstName: "",
        lastName: "",
        homeaddress: {
            address: "",
            city: "",
            state: ""
        },
        email: "",
        password: "",
        confirmPassword: ""
    });

    const nav = useNavigate();

    const handleChange = (e) => {
        setDev({
            ...dev,
            [e.target.name]: e.target.value
        });
    };

    const handleAddressChange = (e) => {
        setDev({
            ...dev,
            homeaddress: {
                ...dev.homeaddress,
                [e.target.name]: e.target.value
            }
        })
    }

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/devs/register", dev, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setDev({
                    firstName: "",
                    lastName: "",
                    homeaddress: {
                        address: "",
                        city: "",
                        state: ""
                    },
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                setConfirmReg("Thanks for registering with us! Log in now!");
                setErrors({});
                nav('/');
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" >
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
                        Developer Sign Up!
                    </Typography>
                    {errors ? <h8 style={{ color: "red" }}>{errors}</h8> : null}
                    <Box component="form" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    required
                                    fullWidth
                                    value={dev.firstName}
                                    label="First Name"
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    value={dev.lastName}
                                    label="Last Name"
                                    onChange={handleChange}
                                    name="lastName"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    value={dev.email}
                                    label="Email Address"
                                    name="email"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    value={dev.homeaddress.address}
                                    label="Address"
                                    name="address"
                                    onChange={handleAddressChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <TextField
                                    required
                                    fullWidth
                                    value={dev.homeaddress.city}
                                    label="City"
                                    onChange={handleAddressChange}
                                    name="city"
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    required
                                    fullWidth
                                    value={dev.homeaddress.state}
                                    label="State"
                                    onChange={handleAddressChange}
                                    name="state"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={dev.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    value={dev.confirmPassword}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: 'orange' }}
                            onClick={register}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/dev/login" variant="body2" style={{color: 'orange'}}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )

}

export default DevRegistration;