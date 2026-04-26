import { BrowserRouter, Routes, Route } from "react-router"; 
import { PageLayout } from "./layouts/Pagelayout";
import { LoginPage } from './pages/LoginPage';
import { Navigate } from "react-router";
import { ModelPage } from './pages/Models (logged in)/ModelPage';
import ManagerDashboard from './pages/Managers (logged in)/ManagerDashboard';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* offentlige rute - ingen navbar */}
          <Route path="/login" element={<LoginPage/>} />

        {/* Ruter der kræver login - Navbar er indbygget i PageLayout */}
        <Route element={<PageLayout />}>
          <Route path="/model" element={<ModelPage />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          
          {/* Default redirect hvis man lander på "/" */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;