import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from "./Pages/Homepage/LandingPage/LandingPage";
import SubscribePage from "./Pages/Homepage/SubscribePage/SubscribePage";
import { Dashboard } from './Pages/Patient/Dashboard/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="subscribe" element={<SubscribePage />}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
