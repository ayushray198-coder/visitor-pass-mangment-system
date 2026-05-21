import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

/* PUBLIC PAGES */

import Home from "../pages/Home.jsx";

import Signup from "../pages/Signup.jsx";

import Login from "../pages/Login.jsx";

import VerifyOtp from "../pages/VerifyOtp.jsx";

import ForgotPassword from "../pages/ForgotPassword.jsx";

import ResetPassword from "../pages/ResetPassword.jsx";

import CreateOrganization from "../pages/CreateOrganization.jsx";

import NotFound from "../pages/NotFound.jsx";

/* LAYOUT */

import DashboardLayout from "../layouts/DashboardLayout.jsx";

/* ROUTE PROTECTION */

import ProtectedRoute from "./ProtectedRoute.jsx";

import RoleRoute from "./RoleRoutes.jsx";

/* DASHBOARDS */

import VisitorDashboard from "../pages/dashboard/VisitorDashboard.jsx";

import AdminDashboard from "../pages/dashboard/AdminDashboard.jsx";

import EmployeeDashboard from "../pages/dashboard/EmployeeDashboard.jsx";

import SecurityDashboard from "../pages/dashboard/SecurityDashboard.jsx";

/* USERS */

import ManageUsers from "../pages/users/ManageUsers.jsx";

import CreateStaff from "../pages/users/CreateStaff.jsx";

/* VISITORS */

import Visitors from "../pages/visitors/Visitors.jsx";

import CreateVisitor from "../pages/visitors/CreateVisitors.jsx";

import VisitorDetails from "../pages/visitors/VisitorsDetails.jsx";

/* PASSES */

import Passes from "../pages/passes/Passes.jsx";

import PassDetails from "../pages/passes/PassDetails.jsx";

/* APPOINTMENTS */

import Appointments from "../pages/appoinments/Appointments.jsx";

import CreateAppointment from "../pages/appoinments/CreateAppointment.jsx";

/* SECURITY */

import CheckIn from "../pages/security/CheckIn.jsx";

import CheckOut from "../pages/security/CheckOut.jsx";

import CheckLogs from "../pages/security/CheckLogs.jsx";

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