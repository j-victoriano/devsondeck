import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Card, CardContent, Typography, Container, Grid } from "@mui/material"

const AllJobs = (props) => {
    const [jobList, setJobList] = useState([])
    const [company, setCompany] = useState({})
    const [dev, setDev] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8000/api/jobs/allJobs')
            .then(res => {
                console.log(res.data)
                setJobList(res.data)
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/company', { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                setCompany(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(()=> {
        axios.get('http://localhost:8000/api/devs', {withCredentials: true})
            .then((res)=>{
                console.log(res.data)
                setDev(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    

    const nav = useNavigate()

    return (
        <Container>
            <h5>Hello {dev.firstName}! Here are some available positions currently</h5>
            <Grid container spacing={8}>
                {
                    jobList.length > 0 && jobList.map((job, index) => {
                        return (
                            <Grid item key={job} xs={12} sm={6} md={6}>
                                <Card sx={{height: '100%', display:'flex', flexDirection:'column'}}>
                                    <CardContent>
                                        <Typography gutterBottom marginTop={1} variant="h8" component='div' >
                                            <Link to={'/jobs/' + job._id} style={{color: 'orange'}} >{job.name}</Link>
                                        </Typography>
                                        <Typography gutterBottom variant="h8" component='div'>
                                            {job.salary}
                                        </Typography>
                                        <Typography gutterBottom variant="h8" component='div'>
                                            {job.description}
                                        </Typography>
                                        <Typography gutterBottom variant="h8" component='div'>
                                            {job.createdby.email}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
            </Grid>
        </Container>
    )
}

export default AllJobs