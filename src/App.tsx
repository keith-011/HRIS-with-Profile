import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from "./HRIS/pages/Login";

import DashboardLayout from "./HRIS/layouts/DashboardLayout";

import Forgot from "./HRIS/pages/Forgot";
import Dashboard from "./HRIS/pages/Dashboard";
import Employee from "./HRIS/pages/Employee";
import Department from "./HRIS/pages/Department";

import Division from "./HRIS/pages/Division";
import Profile from "./HRIS/pages/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="forgot" element={<Forgot />} />

      <Route element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<Employee />} />
        <Route path="departments" element={<Department />} />
        <Route path="divisions" element={<Division />} />

        <Route path="profile/:id" element={<Profile />} />
      </Route>
      {/* <Route path="testing" element={<TESTINGROUTE />} /> */}
    </Route>,
  ),
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
