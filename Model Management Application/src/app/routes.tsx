import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import ManagerDashboard from "./pages/ManagerDashboard";
import ModelDashboard from "./pages/ModelDashboard";
import CreateModel from "./pages/CreateModel";
import CreateManager from "./pages/CreateManager";
import CreateJob from "./pages/CreateJob";
import ManageJob from "./pages/ManageJob";
import JobExpenses from "./pages/JobExpenses";
import AddExpense from "./pages/AddExpense";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        element: <ProtectedRoute><ManagerDashboard /></ProtectedRoute>,
      },
      {
        path: "manager/dashboard",
        element: <ProtectedRoute role="manager"><ManagerDashboard /></ProtectedRoute>,
      },
      {
        path: "manager/create-model",
        element: <ProtectedRoute role="manager"><CreateModel /></ProtectedRoute>,
      },
      {
        path: "manager/create-manager",
        element: <ProtectedRoute role="manager"><CreateManager /></ProtectedRoute>,
      },
      {
        path: "manager/create-job",
        element: <ProtectedRoute role="manager"><CreateJob /></ProtectedRoute>,
      },
      {
        path: "manager/job/:jobId",
        element: <ProtectedRoute role="manager"><ManageJob /></ProtectedRoute>,
      },
      {
        path: "manager/job/:jobId/expenses",
        element: <ProtectedRoute role="manager"><JobExpenses /></ProtectedRoute>,
      },
      {
        path: "model/dashboard",
        element: <ProtectedRoute role="model"><ModelDashboard /></ProtectedRoute>,
      },
      {
        path: "model/job/:jobId/add-expense",
        element: <ProtectedRoute role="model"><AddExpense /></ProtectedRoute>,
      },
    ],
  },
]);
