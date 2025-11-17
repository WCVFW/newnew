import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/layout/Footer";
import Loader from "./components/Loader";

// --- Lazy Load Pages for Code Splitting and Suspense ---
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Contact = React.lazy(() => import("./pages/Contact"));
const About = React.lazy(() => import("./pages/About"));
const MobileRechargePage = React.lazy(() => import("./pages/recharge/MobileRechargePage"));
const DthRechargePage = React.lazy(() => import("./pages/recharge/DthRechargePage"));
const ElectricityBillPage = React.lazy(() => import("./pages/recharge/ElectricityBillPage"));
const WaterBillPage = React.lazy(() => import("./pages/recharge/WaterBillPage"));
const GasBillPage = React.lazy(() => import("./pages/recharge/GasBillPage"));
const BroadbandPage = React.lazy(() => import("./pages/recharge/BroadbandPage"));
const FastagRechargePage = React.lazy(() => import("./pages/recharge/FastagRechargePage"));
const LpgBookingPage = React.lazy(() => import("./pages/recharge/LpgBookingPage"));
const InsurancePaymentPage = React.lazy(() => import("./pages/recharge/InsurancePaymentPage"));
const EducationFeesPage = React.lazy(() => import("./pages/recharge/EducationFeesPage"));
const MunicipalTaxPage = React.lazy(() => import("./pages/recharge/MunicipalTaxPage"));
const AepsPage = React.lazy(() => import("./pages/money/AepsPage"));
const MicroAtmPage = React.lazy(() => import("./pages/money/MicroAtmPage"));
const DmtPage = React.lazy(() => import("./pages/money/DmtPage"));
const UpiCollectPage = React.lazy(() => import("./pages/money/UpiCollectPage"));
const WalletToBankPage = React.lazy(() => import("./pages/money/WalletToBankPage"));
const FlightBookingPage = React.lazy(() => import("./pages/travel/FlightBookingPage"));
const TrainBookingPage = React.lazy(() => import("./pages/travel/TrainBookingPage"));
const BusBookingPage = React.lazy(() => import("./pages/travel/BusBookingPage"));
const HotelBookingPage = React.lazy(() => import("./pages/travel/HotelBookingPage"));
const CabBookingPage = React.lazy(() => import("./pages/travel/CabBookingPage"));
const PartnerLoginPage = React.lazy(() => import("./pages/B2B/PartnerLoginPage"));
const DistributorLoginPage = React.lazy(() => import("./pages/B2B/DistributorLoginPage"));
const RetailerLoginPage = React.lazy(() => import("./pages/B2B/RetailerLoginPage"));
const CommissionPage = React.lazy(() => import("./pages/B2B/CommissionPage"));
const ApiDocsPage = React.lazy(() => import("./pages/B2B/ApiDocsPage"));
const CreateDistributorPage = React.lazy(() => import("./pages/B2B/CreateDistributorPage"));
const CreateRetailerPage = React.lazy(() => import("./pages/B2B/CreateRetailerPage"));
const HelpCenterPage = React.lazy(() => import("./pages/support/HelpCenterPage"));
const RaiseTicketPage = React.lazy(() => import("./pages/support/RaiseTicketPage"));
const ApiSupportPage = React.lazy(() => import("./pages/support/ApiSupportPage"));
const ComplaintsPage = React.lazy(() => import("./pages/support/ComplaintsPage"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));

const FullPageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999,
  }}>
    <Loader />
  </div>
);

const App: React.FC = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const location = useLocation();
  // We will show the main layout (Navbar, Footer) on all pages except the admin dashboard
  const showMainLayout = !location.pathname.startsWith('/admin/dashboard');

  useEffect(() => {
    // Enforce a minimum 2-second loading screen on the initial app load.
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);

    // Cleanup the timer if the component unmounts before the time is up.
    return () => clearTimeout(timer);
  }, []); // The empty dependency array ensures this effect runs only once.

  if (isInitialLoading) {
    return <FullPageLoader />;
  }

  return (
    <>
        {showMainLayout && <Navbar />}
        <main>
          <Suspense fallback={<FullPageLoader />}>
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
          </Suspense>
        </main>
        {showMainLayout && <Footer />}
    </>
  );
};

export default App;