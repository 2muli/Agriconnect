import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/about/About";
import BuyerDashboard from './components/buyerdashboard/BuyerDashboard';
import Ordersf from './components/buyerdashboard/Ordersf';
import Produceb from './components/buyerdashboard/Produceb';
import Transactions from './components/buyerdashboard/Transaction';
import Contact from "./components/contact/Contact";
import Faq from "./components/faq/Faq";
import Earning from "./components/farmerdashboard/Earning";
import Education from './components/farmerdashboard/Education';
import FarmerDashboard from './components/farmerdashboard/FarmerDashboard';
import Notification from "./components/farmerdashboard/Notification";
import Orders from "./components/farmerdashboard/Orders";
import Produce from "./components/farmerdashboard/Produce";
import Profile from "./components/farmerdashboard/Profile";
import Help from "./components/help/Help";
import Home from "./components/home/Home";
import Layout from "./components/Layout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
    <>
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
          <Route path="/farmerprofile" element={<Profile/>}/>
          <Route path="/produce" element={<Produce/>}/>
          <Route path="/produceb" element={<Produceb/>}/>
          <Route path='/ordersf' element={<Ordersf/>}/>
          <Route path="/earning" element={<Earning/>}/>
          <Route path="/notification" element={<Notification/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path='/fdashboard' element={<FarmerDashboard/>}/>
          <Route path='/bdashboard' element={<BuyerDashboard/>}/>
          <Route path='/education' element={<Education/>}/>
          <Route path='/transaction' element={<Transactions/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
