import {useState, useEffect} from 'react'
import axios from 'axios'
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

const CompanyRegistration = (props) => {
    const [ errors, setErrorMessage ] = useState('')
    const theme = createTheme();

    const [company, setCompany] = useState({
        name: "",
        email: "",
        address: {
            street: "",
            city: "",
            state: ""
        },
        password: "",
        confirmPassword: ""
    })

    const nav = useNavigate();
    
    const handleChange = (e)=>{
        setCompany({
            ...company,
            [e.target.name]: e.target.value
        })
    }

    const handleAddressChange = (e)=>{
        setCompany({
            ...company,
            address: {
                ...company.address,
                [e.target.name]: e.target.value
            }
        })
    }

    const register = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/company/register", company, {withCredentials: true})
            .then((res)=> {
                console.log(res.data);
                setCompany({
                    name: "",
                    address: {
                        street:"",
                        city:"",
                        state:""
                    },
                    email:"",
                    password:"",
                    confirmPassword:""
                })
                setErrorMessage("")
                nav("/")
            })
            .catch((err)=> {
                console.log(err.response.data)
                setErrorMessage(err.response.data.message)
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
                        Company Registration
                    </Typography>
                    {errors ? <h8 style={{ color: "red" }}>{errors}</h8> : null}
                    <Box component="form" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    value={company.name}
                                    label="Company Name"
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    value={company.email}
                                    label="Email Address"
                                    name="email"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    value={company.address.street}
                                    label="Address"
                                    name="address"
                                    onChange={handleAddressChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <TextField
                                    required
                                    fullWidth
                                    value={company.address.city}
                                    label="City"
                                    onChange={handleAddressChange}
                                    name="city"
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    required
                                    fullWidth
                                    value={company.address.state}
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
                                    value={company.password}
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
                                    value={company.confirmPassword}
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
                                <Link href="/company/login" variant="body2" style={{color: 'orange'}}>
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

export default CompanyRegistration;