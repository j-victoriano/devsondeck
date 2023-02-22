import { NavBar } from './components/NavBar';
import AllJobs from './components/AllJobs';
import AllDevs from './components/AllDevs';
import DevRegistration from './components/DevRegister';
import CompanyRegistration from './components/CompanyRegister';
import CompanyLogin from './components/CompanyLogin';
import { Landing }  from './components/Landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DevLogin } from './components/DevLogin';
import { Developer } from './components/Developer';
import { UpdateDev } from './components/DevForm';
import { OneJob } from './views/OneJob';
import { JobForm } from './components/NewJob';

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <div className='content'>
        <Routes>
          <Route element={<Landing/>} path="/" default />
          <Route element={<Developer/>} path="/devs/:id" />
          <Route element={<UpdateDev/>} path="/update/:id"/>
          <Route element={<OneJob/>} path="/jobs/:id" />
          <Route element={<AllJobs/>} path="/jobs" />
          <Route element={<AllDevs/>} path="/devs" />
          <Route element={<DevRegistration/>} path="/devs/register" />
          <Route element={<DevLogin/>} path="/devs/login" />
          <Route element={<CompanyRegistration/>} path="/company/register"/>
          <Route element={<CompanyLogin/>} path="/company/login" />
          <Route element={<JobForm/>} path="/jobs/create" />
        </Routes>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
