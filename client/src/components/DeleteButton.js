import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const DeleteButton = (props) => {
    const { jobId } = props
    const nav = useNavigate()
    const deleteJob = e =>{
    axios.delete('http://localhost:8000/api/jobs/'+ jobId )
        .then(res=> {
            console.log('Deleted job! Hired someone')
        })
        .then(() => nav('/jobs'))
    }

    return(
        <Button onClick={deleteJob}>Dismiss job</Button>
    )
}

export default DeleteButton