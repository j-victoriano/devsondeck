import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'
import DeleteButton from '../components/DeleteButton'
import { Typography, Card, CardActions, CardContent } from '@mui/material'

export const OneJob = () => {
    const [ oneJob, setOneJob ] = useState({})
    const {id} = useParams()
    const nav = useNavigate()

    useEffect(()=> {
        axios.get('http://localhost:8000/api/jobs/'+ id)
        .then(res => {
            console.log("one job by--- ")
            console.log(res.data)
            setOneJob(res.data)
        })
        .catch(err => console.log(err))
    }, [id])

    return (
        <div style={{justifyItems: 'center'}}>
            <Typography align='center' variant='h6'></Typography>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 20 }}>Job Position: {oneJob.name}</Typography>
                    <Typography sx={{ fontSize: 20 }}>Salary: {oneJob.salary}</Typography>
                    <Typography sx={{ fontSize: 20 }}>Preferred Skills: {oneJob.skills}</Typography>
                    <Typography sx={{ fontSize: 20 }}>Description: {oneJob.description}</Typography>
                </CardContent>
                <CardActions>
                    <DeleteButton jobId={oneJob._id}/>
                </CardActions>
            </Card>
        </div>
    )
}