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
import DoctorDashboard from './pages/doctor/Dashboard/DoctorDashboard';
import PatientProfile from './pages/patient/PatientProfile/PatientProfile';
import DoctorProfile from './pages/doctor/DoctorProfile/DoctorProfile';
import ManageAppointments from './pages/doctor/ManageAppointments/ManageAppointments';
import AppointmentsPage from './pages/doctor/AppointmentsPage/AppointmentsPage';
import AppointmentHistoryPage from './pages/doctor/AppointmentHistoryPage/AppointmentHistoryPage';
import PatientAppointmentHistoryPage from './pages/patient/PatientAppointmentHistoryPage/PatientAppointmentHistoryPage';
import Payment from './components/homepage/Payment/Payment';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/subscribe" element={<SubscribePage />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route element={<Logout />} path="/logout" />
        <Route element={<PatientRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<BookAppointments />} path='/appointments' />
          <Route element={<ManageAppointments />} path='/patient/manageAppointment/:id' />
          <Route element={<PatientProfile />} path='/profile' />
          <Route element={<PatientAppointmentHistoryPage />} path='/history' />
          <Route element={<Logout />} path="/logout" />
        </Route>
        <Route element={<DoctorRoutes />}>
          <Route element={<DoctorDashboard />} path="/doctor/dashboard" />
          <Route element={<DoctorProfile />} path="/doctor/profile" />
          <Route element={<AppointmentsPage />} path="/doctor/appointments" />
          <Route element={<ManageAppointments />} path='/doctor/manageAppointment/:id' />
          <Route element={<AppointmentHistoryPage />} path='/doctor/history' />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
