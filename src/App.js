import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SubscribePage from "./Pages/SubscribePage";

const App = () =>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}>
        </Route>
        <Route path="subscribe" element={ <SubscribePage />}></Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
