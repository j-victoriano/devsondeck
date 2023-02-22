import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export const CompanyLogout = () => {
    const nav = useNavigate()
    const logout = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/company/logout', {withCredentials: true})
            .then((res)=> {
                console.log(res)
                nav('/')
            })
            .catch((err)=> {
                console.log(err)
            })
    }
    return (
        <span>
                    <button style={{backgroundColor:'antiquewhite', border:'none'}} onClick={logout}>logout</button>
        </span>
    )
}