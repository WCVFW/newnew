import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import EmployeeRoute from './components/EmployeeRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Kyc from './pages/Kyc';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import ErrorPage from './pages/error';

// Recharge Pages
import MobileRechargePage from './pages/recharge/MobileRechargePage';
import DthRechargePage from './pages/recharge/DthRechargePage';
import ElectricityBillPage from './pages/recharge/ElectricityBillPage';
import WaterBillPage from './pages/recharge/WaterBillPage';
import GasBillPage from './pages/recharge/GasBillPage';
import BroadbandPage from './pages/recharge/BroadbandPage';
import LandlinePage from './pages/Landline';
import FastagRechargePage from './pages/recharge/FastagRechargePage';
import LpgBookingPage from './pages/recharge/LpgBookingPage';
import EducationFeesPage from './pages/recharge/EducationFeesPage';
import InsurancePaymentPage from './pages/recharge/InsurancePaymentPage';
import MunicipalTaxPage from './pages/recharge/MunicipalTaxPage';

// Travel Pages
import FlightBookingPage from './pages/travel/FlightBookingPage';
import HotelBookingPage from './pages/travel/HotelBookingPage';
import TrainBookingPage from './pages/travel/TrainBookingPage';
import BusBookingPage from './pages/travel/BusBookingPage';
import CabBookingPage from './pages/travel/CabBookingPage';

// Money Pages
import UpiCollectPage from './pages/money/UpiCollectPage';
import AepsPage from './pages/money/AepsPage';
import DmtPage from './pages/money/DmtPage';
import MicroAtmPage from './pages/money/MicroAtmPage';
import WalletToBankPage from './pages/money/WalletToBankPage';

// Partner Pages
import PartnerDashboard from './pages/partner/PartnerDashboard';
import PartnerRegister from './pages/partner/PartnerRegister';

// B2B Pages
import ApiDocsPage from './pages/B2B/ApiDocsPage';
import CommissionPage from './pages/B2B/CommissionPage';
import CreateDistributorPage from './pages/B2B/CreateDistributorPage';
import CreateRetailerPage from './pages/B2B/CreateRetailerPage';
import DistributorLoginPage from './pages/B2B/DistributorLoginPage';
import PartnerLoginPage from './pages/B2B/PartnerLoginPage';
import RetailerLoginPage from './pages/B2B/RetailerLoginPage';

// Support Pages
import HelpCenterPage from './pages/support/HelpCenterPage';
import ApiSupportPage from './pages/support/ApiSupportPage';
import ComplaintsPage from './pages/support/ComplaintsPage';
import RaiseTicketPage from './pages/support/RaiseTicketPage';

function App() {
    const location = useLocation();
    // Do not show Navbar and Footer on dashboard routes
    const isDashboardRoute = location.pathname === '/dashboard' || location.pathname === '/employee';

    return (
        <div className="App">
            {!isDashboardRoute && <Navbar />}
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/kyc" element={<ProtectedRoute><Kyc /></ProtectedRoute>} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

                {/* Employee Routes */}
                <Route path="/employee" element={<EmployeeRoute><EmployeeDashboard /></EmployeeRoute>} />

                {/* Recharge & Bill Payment Routes */}
                <Route path="/recharge/mobile" element={<ProtectedRoute><MobileRechargePage /></ProtectedRoute>} />
                <Route path="/recharge/dth" element={<ProtectedRoute><DthRechargePage /></ProtectedRoute>} />
                <Route path="/recharge/electricity" element={<ProtectedRoute><ElectricityBillPage /></ProtectedRoute>} />
                <Route path="/recharge/water" element={<ProtectedRoute><WaterBillPage /></ProtectedRoute>} />
                <Route path="/recharge/gas" element={<ProtectedRoute><GasBillPage /></ProtectedRoute>} />
                <Route path="/recharge/broadband" element={<ProtectedRoute><BroadbandPage /></ProtectedRoute>} />
                <Route path="/recharge/landline" element={<ProtectedRoute><LandlinePage /></ProtectedRoute>} />
                <Route path="/recharge/fastag" element={<ProtectedRoute><FastagRechargePage /></ProtectedRoute>} />
                <Route path="/recharge/lpg" element={<ProtectedRoute><LpgBookingPage /></ProtectedRoute>} />
                <Route path="/recharge/education" element={<ProtectedRoute><EducationFeesPage /></ProtectedRoute>} />
                <Route path="/recharge/insurance" element={<ProtectedRoute><InsurancePaymentPage /></ProtectedRoute>} />
                <Route path="/recharge/municipal" element={<ProtectedRoute><MunicipalTaxPage /></ProtectedRoute>} />

                {/* Travel Routes */}
                <Route path="/travel/flight" element={<ProtectedRoute><FlightBookingPage /></ProtectedRoute>} />
                <Route path="/travel/hotel" element={<ProtectedRoute><HotelBookingPage /></ProtectedRoute>} />
                <Route path="/travel/train" element={<ProtectedRoute><TrainBookingPage /></ProtectedRoute>} />
                <Route path="/travel/bus" element={<ProtectedRoute><BusBookingPage /></ProtectedRoute>} />
                <Route path="/travel/cab" element={<ProtectedRoute><CabBookingPage /></ProtectedRoute>} />

                {/* Money Routes */}
                <Route path="/money/upi" element={<ProtectedRoute><UpiCollectPage /></ProtectedRoute>} />
                <Route path="/money/aeps" element={<ProtectedRoute><AepsPage /></ProtectedRoute>} />
                <Route path="/money/dmt" element={<ProtectedRoute><DmtPage /></ProtectedRoute>} />
                <Route path="/money/micro-atm" element={<ProtectedRoute><MicroAtmPage /></ProtectedRoute>} />
                <Route path="/money/wallet-to-bank" element={<ProtectedRoute><WalletToBankPage /></ProtectedRoute>} />

                {/* Partner Routes */}
                <Route path="/partner" element={<ProtectedRoute><PartnerDashboard /></ProtectedRoute>} />
                <Route path="/partner/register" element={<ProtectedRoute><PartnerRegister /></ProtectedRoute>} />

                {/* B2B Routes */}
                <Route path="/b2b/api-docs" element={<ApiDocsPage />} />
                <Route path="/b2b/commission" element={<CommissionPage />} />
                <Route path="/b2b/create-distributor" element={<ProtectedRoute><CreateDistributorPage /></ProtectedRoute>} />
                <Route path="/b2b/create-retailer" element={<ProtectedRoute><CreateRetailerPage /></ProtectedRoute>} />
                <Route path="/b2b/distributor-login" element={<DistributorLoginPage />} />
                <Route path="/b2b/partner-login" element={<PartnerLoginPage />} />
                <Route path="/b2b/retailer-login" element={<RetailerLoginPage />} />

                {/* Support Routes */}
                <Route path="/support" element={<HelpCenterPage />} />
                <Route path="/support/api" element={<ApiSupportPage />} />
                <Route path="/support/complaints" element={<ComplaintsPage />} />
                <Route path="/support/tickets" element={<ProtectedRoute><RaiseTicketPage /></ProtectedRoute>} />

                {/* 404 Error Page */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            {!isDashboardRoute && <Footer />}
        </div>
    );
}

export default App;
