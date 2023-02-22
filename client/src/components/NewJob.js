import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FormControl, Input, InputLabel } from '@mui/material';
import { Container, Button } from '@mui/material'

export const JobForm = () => {
    const [errors, setErrors] = useState([])

    const nav = useNavigate()

    const [name, setName] = useState('')
    const [salary, setSalary] = useState('')
    const [description, setDescription] = useState('')
    const [skills, setSkills] = useState('')
    const [type, setType] = useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/jobs/create', {
            name,
            salary,
            description,
            skills,
            type
        }, {withCredentials: true})
            .then(res=>{
                console.log(res)
                console.log(res.data)
                nav('/jobs')
            })
            .catch(err => console.log(err))
    }
    return (
        <Container sx={{width:'600px'}}>
            <form>
                {errors.length > 0 && errors.map((error, i) => (
                    <p key={i} className="text-danger">{error}</p>
                ))}
                <div>
                    <FormControl>
                        <InputLabel htmlFor='name'>Name:</InputLabel>
                        <Input type='text' name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <InputLabel htmlFor='salary'>Salary:</InputLabel>
                        <Input type='text' name="salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <InputLabel htmlFor='type'>Type:</InputLabel>
                        <Input type='text' name="type" value={type} onChange={(e) => setType(e.target.value)} />
                    </FormControl>
                </div>
                <div><FormControl>
                    <InputLabel htmlFor='description'>Description:</InputLabel>
                    <Input type='text' name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </FormControl>
                </div>
                <div>
                    <FormControl>
                        <InputLabel htmlFor='skills'>Skills:</InputLabel>
                        <Input type='text' name="skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
                    </FormControl>
                </div>
                <Button onClick={onSubmitHandler}>Submit new position!</Button>
            </form>
        </Container>
    )
}