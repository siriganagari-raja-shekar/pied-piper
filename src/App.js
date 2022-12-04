import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ProtectedRoute from './Authentication/ProtectedRoute';
import LandingPage from "./Pages/Homepage/LandingPage/LandingPage";
import SubscribePage from "./Pages/Homepage/SubscribePage/SubscribePage";
import { Dashboard } from './Pages/Patient/Dashboard/Dashboard';
import Signin from './Authentication/Signin'
import Logout from './Authentication/Logout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="subscribe" element={<SubscribePage />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Logout />} path="/logout" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
