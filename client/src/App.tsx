import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/layout/Footer"; // Assuming Footer component exists

// Core Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import About from "./pages/About";

// Recharge & Bills Pages
import MobileRechargePage from "./pages/recharge/MobileRechargePage";
import DthRechargePage from "./pages/recharge/DthRechargePage";
import ElectricityBillPage from "./pages/recharge/ElectricityBillPage";
import WaterBillPage from "./pages/recharge/WaterBillPage";
import GasBillPage from "./pages/recharge/GasBillPage";
import BroadbandPage from "./pages/recharge/BroadbandPage";
import FastagRechargePage from "./pages/recharge/FastagRechargePage";
import LpgBookingPage from "./pages/recharge/LpgBookingPage";
import InsurancePaymentPage from "./pages/recharge/InsurancePaymentPage";
import EducationFeesPage from "./pages/recharge/EducationFeesPage";
import MunicipalTaxPage from "./pages/recharge/MunicipalTaxPage";

// Money & Banking Pages
import AepsPage from "./pages/money/AepsPage";
import MicroAtmPage from "./pages/money/MicroAtmPage";
import DmtPage from "./pages/money/DmtPage";
import UpiCollectPage from "./pages/money/UpiCollectPage";
import WalletToBankPage from "./pages/money/WalletToBankPage";

// Travel Booking Pages
import FlightBookingPage from "./pages/travel/FlightBookingPage";
import TrainBookingPage from "./pages/travel/TrainBookingPage";
import BusBookingPage from "./pages/travel/BusBookingPage";
import HotelBookingPage from "./pages/travel/HotelBookingPage";
import CabBookingPage from "./pages/travel/CabBookingPage";

// B2B Services Pages
import PartnerLoginPage from "./pages/B2B/PartnerLoginPage";
import DistributorLoginPage from "./pages/B2B/DistributorLoginPage";
import RetailerLoginPage from "./pages/B2B/RetailerLoginPage";
import CommissionPage from "./pages/B2B/CommissionPage";
import ApiDocsPage from "./pages/B2B/ApiDocsPage";
import CreateDistributorPage from "./pages/B2B/CreateDistributorPage";
import CreateRetailerPage from "./pages/B2B/CreateRetailerPage";
import HelpCenterPage from "./pages/support/HelpCenterPage";
import RaiseTicketPage from "./pages/support/RaiseTicketPage";
import ApiSupportPage from "./pages/support/ApiSupportPage";
import ComplaintsPage from "./pages/support/ComplaintsPage"; // Assuming this page exists or will be created
import AdminDashboard from "./pages/AdminDashboard";

// Other Pages (You can create these as needed)
// import AdminDashboard from './pages/AdminDashboard';
// import UserDashboard from './pages/UserDashboard';
// import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            {/* Core Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

            {/* Recharge & Bills Routes */}
            <Route path="/recharge/mobile" element={<MobileRechargePage />} />
            <Route path="/recharge/dth" element={<DthRechargePage />} />
            <Route path="/recharge/electricity" element={<ElectricityBillPage />} />
            <Route path="/recharge/water" element={<WaterBillPage />} />
            <Route path="/recharge/gas" element={<GasBillPage />} />
            <Route path="/recharge/broadband" element={<BroadbandPage />} />
            <Route path="/recharge/fastag" element={<FastagRechargePage />} />
            <Route path="/recharge/lpg" element={<LpgBookingPage />} />
            <Route path="/recharge/insurance" element={<InsurancePaymentPage />} />
            <Route path="/recharge/education-fees" element={<EducationFeesPage />} />
            <Route path="/recharge/municipal-tax" element={<MunicipalTaxPage />} />

            {/* Money & Banking Routes */}
            <Route path="/aeps" element={<AepsPage />} />
            <Route path="/micro-atm" element={<MicroAtmPage />} />
            <Route path="/dmt" element={<DmtPage />} />
            <Route path="/upi-collect" element={<UpiCollectPage />} />
            <Route path="/wallet-to-bank" element={<WalletToBankPage />} />
            {/* Verification routes can be added here once pages are created */}

            {/* Travel Booking Routes */}
            <Route path="/flight" element={<FlightBookingPage />} />
            <Route path="/train" element={<TrainBookingPage />} />
            <Route path="/bus" element={<BusBookingPage />} />
            <Route path="/hotel" element={<HotelBookingPage />} />
            <Route path="/cab" element={<CabBookingPage />} />

          {/* B2B Routes */}
          <Route path="/login/partner" element={<PartnerLoginPage />} />
          <Route path="/login/distributor" element={<DistributorLoginPage />} />
          <Route path="/login/retailer" element={<RetailerLoginPage />} />
          <Route path="/b2b/commission" element={<CommissionPage />} />
          <Route path="/b2b/api-docs" element={<ApiDocsPage />} />
          <Route path="/b2b/create-distributor" element={<CreateDistributorPage />} />
          <Route path="/b2b/create-retailer" element={<CreateRetailerPage />} />

            {/* Support Routes */}
            <Route path="/support/help-center" element={<HelpCenterPage />} />
            <Route path="/support/complaints" element={<ComplaintsPage />} />
            <Route path="/support/raise-ticket" element={<RaiseTicketPage />} />
            <Route path="/support/api" element={<ApiSupportPage />} />
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            {/* The /contact route is already defined in Core Routes */}

            {/* User-specific Routes */}
            {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
            {/* <Route path="/admin" element={<AdminDashboard />} /> */}
            {/* <Route path="/profile" element={<Profile />} /> */}

            {/* Fallback Route for 404 Not Found */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
        <Footer />
    </AuthProvider>
  );
};

export default App;