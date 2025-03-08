import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/about/About";
import AddOrder from "./components/buyerdashboard/buyercrud/AddOrder";
import AddTransaction from "./components/buyerdashboard/buyercrud/AddTransaction";
import EditOrder from "./components/buyerdashboard/buyercrud/EditOrder";
import EditTransaction from "./components/buyerdashboard/buyercrud/EditTransaction";
import BuyerDashboard from "./components/buyerdashboard/BuyerDashboard";
import Ordersf from "./components/buyerdashboard/Ordersf";
import Produceb from "./components/buyerdashboard/Produceb";
import Transactions from "./components/buyerdashboard/Transaction";
import Contact from "./components/contact/Contact";
import Faq from "./components/faq/Faq";
import Earning from "./components/farmerdashboard/Earning";
import Education from "./components/farmerdashboard/Education";
import AddEarning from "./components/farmerdashboard/farmercrud/AddEarning";
import AddNotification from "./components/farmerdashboard/farmercrud/AddNotification";
import AddProduce from "./components/farmerdashboard/farmercrud/AddProduce";
import EditEarning from "./components/farmerdashboard/farmercrud/EditEarning";
import EditNotification from "./components/farmerdashboard/farmercrud/EditNotification";
import EditProduce from "./components/farmerdashboard/farmercrud/EditProduce";
import FarmerDashboard from "./components/farmerdashboard/FarmerDashboard";
import Notification from "./components/farmerdashboard/Notification";
import Orders from "./components/farmerdashboard/Orders";
import Produce from "./components/farmerdashboard/Produce";
import Profile from "./components/farmerdashboard/Profile";
import Help from "./components/help/Help";
import Home from "./components/home/Home";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/farmerprofile" element={<Profile />} />
          <Route path="/produce" element={<Produce />} />
          <Route path="/produceb" element={<Produceb />} />
          <Route path="/ordersf" element={<Ordersf />} />
          <Route path="/earning" element={<Earning />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/fdashboard" element={<FarmerDashboard />} />
          <Route path="/bdashboard" element={<BuyerDashboard />} />
          <Route path="/education" element={<Education />} />
          <Route path="/transaction" element={<Transactions />} />
          <Route path="/addearning" element={<AddEarning />} />
          <Route path="/editearning" element={<EditEarning />} />
          <Route path="/addnotification" element={<AddNotification />} />
          <Route path="/editnotification/:id" element={<EditNotification />} />
          <Route path="/addproduce" element={<AddProduce />} />
          <Route path="/editproduce/:id" element={<EditProduce />} />
          <Route path="/addtransaction" element={<AddTransaction />} />
          <Route path="/edittransaction" element={<EditTransaction />} />
          <Route path="/addorder" element={<AddOrder />} />
          <Route path="/editorder" element={<EditOrder />} />
        </Routes>
      </BrowserRouter> 
    </AuthProvider>
    </>
  );
}

export default App;
