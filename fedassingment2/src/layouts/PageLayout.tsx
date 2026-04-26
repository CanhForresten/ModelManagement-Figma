import { Navigate, Outlet } from "react-router";
import { Navbar } from '../components/Navbar';

export function PageLayout() {
  const token = localStorage.getItem("token");

  // hvis brugeren logget ind
  if (!token) {
    return <Navigate to="/login" replace />;    
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  )
}
