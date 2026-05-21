import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

/* PUBLIC PAGES */

import Home from "../pages/Home";

import Signup from "../pages/Signup";

import Login from "../pages/Login";

import VerifyOtp from "../pages/VerifyOtp";

import ForgotPassword from "../pages/ForgotPassword";

import ResetPassword from "../pages/ResetPassword";

import CreateOrganization from "../pages/CreateOrganization";

import NotFound from "../pages/NotFound";

/* LAYOUT */

import DashboardLayout from "../layouts/DashboardLayout";

/* ROUTE PROTECTION */

import ProtectedRoute from "./ProtectedRoute";

import RoleRoute from "./RoleRoutes";

/* DASHBOARDS */

import VisitorDashboard from "../pages/dashboard/VisitorDashboard";

import AdminDashboard from "../pages/dashboard/AdminDashboard";

import EmployeeDashboard from "../pages/dashboard/EmployeeDashboard";

import SecurityDashboard from "../pages/dashboard/SecurityDashboard";

/* USERS */

import ManageUsers from "../pages/users/ManageUsers";

import CreateStaff from "../pages/users/CreateStaff";

/* VISITORS */

import Visitors from "../pages/visitors/Visitors";

import CreateVisitor from "../pages/visitors/CreateVisitors";

import VisitorDetails from "../pages/visitors/VisitorsDetails";

/* PASSES */

import Passes from "../pages/passes/Passes";

import PassDetails from "../pages/passes/PassDetails";

/* APPOINTMENTS */

import Appointments from "../pages/appoinments/Appointments";

import CreateAppointment from "../pages/appoinments/CreateAppointment";

/* SECURITY */

import CheckIn from "../pages/security/CheckIn";

import CheckOut from "../pages/security/CheckOut";

import CheckLogs from "../pages/security/CheckLogs";

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#fff",
            border:
              "1px solid rgba(255,255,255,0.1)"
          }
        }}
      />

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* PROTECTED ROUTES */}

        <Route
          element={<ProtectedRoute />}
        >

          <Route
            path="/create-organization"
            element={<CreateOrganization />}
          />

          {/* DASHBOARD LAYOUT */}

          <Route
            path="/dashboard"
            element={<DashboardLayout />}
          >

            {/* VISITOR */}

            <Route
              index
              element={
                <RoleRoute
                  allowedRoles={["visitor"]}
                >

                  <VisitorDashboard />

                </RoleRoute>
              }
            />

            {/* ADMIN */}

            <Route
              path="admin"
              element={
                <RoleRoute
                  allowedRoles={["admin"]}
                >

                  <AdminDashboard />

                </RoleRoute>
              }
            />

            {/* EMPLOYEE */}

            <Route
              path="employee"
              element={
                <RoleRoute
                  allowedRoles={["employee"]}
                >

                  <EmployeeDashboard />

                </RoleRoute>
              }
            />

            {/* SECURITY */}

            <Route
              path="security"
              element={
                <RoleRoute
                  allowedRoles={["security"]}
                >

                  <SecurityDashboard />

                </RoleRoute>
              }
            />

            {/* USERS */}

            <Route
              path="manage-users"
              element={
                <RoleRoute
                  allowedRoles={["admin"]}
                >

                  <ManageUsers />

                </RoleRoute>
              }
            />

            <Route
              path="create-staff"
              element={
                <RoleRoute
                  allowedRoles={["admin"]}
                >

                  <CreateStaff />

                </RoleRoute>
              }
            />

            {/* VISITORS */}

            <Route
              path="visitors"
              element={
                <RoleRoute
                  allowedRoles={[
                    "admin",
                    "employee"
                  ]}
                >

                  <Visitors />

                </RoleRoute>
              }
            />

            <Route
              path="create-visitor"
              element={
                <RoleRoute
                  allowedRoles={[
                    "admin",
                    "employee"
                  ]}
                >

                  <CreateVisitor />

                </RoleRoute>
              }
            />

            <Route
              path="visitors/:id"
              element={
                <RoleRoute
                  allowedRoles={[
                    "admin",
                    "employee"
                  ]}
                >

                  <VisitorDetails />

                </RoleRoute>
              }
            />

            {/* PASSES */}

            <Route
              path="passes"
              element={
                <RoleRoute
                  allowedRoles={[
                    "admin",
                    "employee",
                    "visitor"
                  ]}
                >

                  <Passes />

                </RoleRoute>
              }
            />

            <Route
              path="passes/:id"
              element={
                <RoleRoute
                  allowedRoles={[
                    "admin",
                    "employee",
                    "visitor"
                  ]}
                >

                  <PassDetails />

                </RoleRoute>
              }
            />

            {/* APPOINTMENTS */}

            <Route
              path="appointments"
              element={
                <RoleRoute
                  allowedRoles={[
                    "visitor",
                    "employee",
                    "admin"
                  ]}
                >

                  <Appointments />

                </RoleRoute>
              }
            />

            <Route
              path="create-appointment"
              element={
                <RoleRoute
                  allowedRoles={["visitor"]}
                >

                  <CreateAppointment />

                </RoleRoute>
              }
            />

            {/* SECURITY */}

            <Route
              path="check-in"
              element={
                <RoleRoute
                  allowedRoles={["security"]}
                >

                  <CheckIn />

                </RoleRoute>
              }
            />

            <Route
              path="check-out"
              element={
                <RoleRoute
                  allowedRoles={["security"]}
                >

                  <CheckOut />

                </RoleRoute>
              }
            />

            <Route
              path="check-logs"
              element={
                <RoleRoute
                  allowedRoles={[
                    "admin",
                    "security"
                  ]}
                >

                  <CheckLogs />

                </RoleRoute>
              }
            />

          </Route>

        </Route>

        {/* NOT FOUND */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>

  );

};

export default AppRoutes;