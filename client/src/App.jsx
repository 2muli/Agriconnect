import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute";
import Error from "./error/Error";

// Public Pages
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Faq from "./components/faq/Faq";
import Help from "./components/help/Help";
import Home from "./components/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

// Profile & User Management
import ChangePassword from "./profile/ChangePassword";
import EditProfile from "./profile/EditProfile";
import Profile from "./profile/Profile";

// Buyer Dashboard
import BuyerDashboard from "./components/buyerdashboard/BuyerDashboard";
import Ordersf from "./components/buyerdashboard/Ordersf";
import Produceb from "./components/buyerdashboard/Produceb";
import Transactions from "./components/buyerdashboard/Transaction";
import AddOrder from "./components/buyerdashboard/buyercrud/AddOrder";
import AddTransaction from "./components/buyerdashboard/buyercrud/AddTransaction";
import EditOrder from "./components/buyerdashboard/buyercrud/EditOrder";
import EditTransaction from "./components/buyerdashboard/buyercrud/EditTransaction";

// Farmer Dashboard
import Earning from "./components/farmerdashboard/Earning";
import Education from "./components/farmerdashboard/Education";
import FarmerDashboard from "./components/farmerdashboard/FarmerDashboard";
import Notification from "./components/farmerdashboard/Notification";
import Orders from "./components/farmerdashboard/Orders";
import Produce from "./components/farmerdashboard/Produce";
import AddEarning from "./components/farmerdashboard/farmercrud/AddEarning";
import AddNotification from "./components/farmerdashboard/farmercrud/AddNotification";
import AddProduce from "./components/farmerdashboard/farmercrud/AddProduce";
import EditEarning from "./components/farmerdashboard/farmercrud/EditEarning";
import EditNotification from "./components/farmerdashboard/farmercrud/EditNotification";
import EditProduce from "./components/farmerdashboard/farmercrud/EditProduce";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Layout Wrapper */}
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="help" element={<Help />} />
            <Route path="faq" element={<Faq />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="editProfile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="changePassword"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />

            {/* Buyer Routes */}
            <Route
              path="bdashboard"
              element={
                <ProtectedRoute>
                  <BuyerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="produceb"
              element={
                <ProtectedRoute>
                  <Produceb />
                </ProtectedRoute>
              }
            />
            <Route
              path="ordersf"
              element={
                <ProtectedRoute>
                  <Ordersf />
                </ProtectedRoute>
              }
            />
            <Route
              path="transaction"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />
            <Route
              path="addorder"
              element={
                <ProtectedRoute>
                  <AddOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="editorder"
              element={
                <ProtectedRoute>
                  <EditOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="addtransaction"
              element={
                <ProtectedRoute>
                  <AddTransaction />
                </ProtectedRoute>
              }
            />
            <Route
              path="edittransaction/:id"
              element={
                <ProtectedRoute>
                  <EditTransaction />
                </ProtectedRoute>
              }
            />

            {/* Farmer Routes */}
            <Route
              path="fdashboard"
              element={
                <ProtectedRoute>
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="produce"
              element={
                <ProtectedRoute>
                  <Produce />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="earning"
              element={
                <ProtectedRoute>
                  <Earning />
                </ProtectedRoute>
              }
            />
            <Route
              path="notification"
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>
              }
            />
            <Route
              path="education"
              element={
                <ProtectedRoute>
                  <Education />
                </ProtectedRoute>
              }
            />
            <Route
              path="addearning"
              element={
                <ProtectedRoute>
                  <AddEarning />
                </ProtectedRoute>
              }
            />
            <Route
              path="editearning"
              element={
                <ProtectedRoute>
                  <EditEarning />
                </ProtectedRoute>
              }
            />
            <Route
              path="addnotification"
              element={
                <ProtectedRoute>
                  <AddNotification />
                </ProtectedRoute>
              }
            />
            <Route
              path="editnotification/:id"
              element={
                <ProtectedRoute>
                  <EditNotification />
                </ProtectedRoute>
              }
            />
            <Route
              path="addproduce"
              element={
                <ProtectedRoute>
                  <AddProduce />
                </ProtectedRoute>
              }
            />
            <Route
              path="editproduce/:id"
              element={
                <ProtectedRoute>
                  <EditProduce />
                </ProtectedRoute>
              }
            />

            {/* Error Route */}
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
