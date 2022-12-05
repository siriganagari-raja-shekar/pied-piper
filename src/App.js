import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import PatientRoutes from './authentication/PatientRoutes';
import LandingPage from './pages/homepage/LandingPage/LandingPage'
import SubscribePage from "./pages/homepage/SubscribePage/SubscribePage";
import { Dashboard } from './pages/patient/Dashboard/Dashboard';
import Signin from './authentication/Signin'
import Logout from './authentication/Logout';
import BookAppointments from './pages/patient/BookAppointments/BookAppointments';
import DoctorRoutes from './authentication/DoctorRoutes';
import DoctorDashboard from './pages/doctor/DoctorDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="subscribe" element={<SubscribePage />}></Route>
        <Route element={<PatientRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<BookAppointments />} path='/appointments' />
          <Route element={<Logout />} path="/logout" />
        </Route>
        <Route element={<DoctorRoutes />}>
          <Route element={<DoctorDashboard />} path="/doctor/dashboard" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
