import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Assessment from './components/assessment';
import Exercise from './components/exercise';
import Resouce from './components/resource';
import PrivateRoutes from './utils/PrivateRoutes';


import PublicRoutes from './utils/PublicRoutes';

import { AuthProvider } from './context/AuthContext';
import Assessment_public from './components/public/assessment_public';
import Resource_public from './components/public/resource_public';
import Exercise_public from './components/public/exercise_public';
import RegisterForm from './components/regForm';
import Profile from './components/profile';
import Clinic from './components/clinic';
import Clinic_public from './components/public/clinic_public';





function App() {
  return (

    <div className='App'>
      <AuthProvider>
        <Routes>
            <Route element={<PublicRoutes />}>
              <Route path='/login' element={<Home />} />
              <Route path='/public/assessment' element={<Assessment_public />} />
              <Route path='/public/exercise' element={<Exercise_public />} />
              <Route path='/public/clinic' element={<Clinic_public />} />
              <Route path='/public/resource-hub' element={<Resource_public />} />
            </Route>
            <Route element={<PrivateRoutes />}>

                <Route path='/' element={<Clinic />} />
                <Route path='/exercise' element={<Exercise />} />
                <Route path='/resource' element={<Resouce />} />
                <Route path='/assessment' element={<Assessment />} />
                <Route path='/profile' element={<Profile />} />
            </Route>

        </Routes>
      </AuthProvider>
    </div>
    
  );
  
}

export default App;
