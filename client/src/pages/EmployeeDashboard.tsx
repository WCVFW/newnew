import React, { useState, useEffect, ReactNode, FormEvent, ChangeEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { format } from "date-fns";

// --- Icons (Inline SVGs for crisp rendering) ---
const Icons = {
  Dashboard: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  ),
  Commission: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  ),
  Wallet: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
      <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path>
    </svg>
  ),
  Badge: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78"></path>
    </svg>
  ),
  User: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  Gift: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  ),
  Help: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  Search: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  Bell: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  Settings: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  TrendingUp: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  ),
  // Quick Action Icons
  Mobile: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
      <line x1="12" y1="18" x2="12.01" y2="18"></line>
    </svg>
  ),
  DTH: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20L12 4"></path>
      <path d="M12 4L8 8"></path>
      <path d="M12 4L16 8"></path>
      <path d="M20 14a8 8 0 1 0-16 0"></path>
    </svg>
  ),
  Fastag: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5"></path>
      <path d="M19 12l-4 4"></path>
      <path d="M19 12l-4-4"></path>
      <path d="M5 12l4 4"></path>
      <path d="M5 12l4-4"></path>
    </svg>
  ),
  Bill: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  Travel: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12h20"></path>
      <path d="M2 12l5-5"></path>
      <path d="M2 12l5 5"></path>
      <path d="M22 12l-5-5"></path>
      <path d="M22 12l-5 5"></path>
    </svg>
  ),
  AEPS: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12.9V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3.9"></path>
      <path d="M4 12.9V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6.1"></path>
      <path d="M12 12h.01"></path>
      <path d="M8 12h.01"></path>
      <path d="M16 12h.01"></path>
    </svg>
  ),
  MoneyTransfer: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  ),
  Insurance: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  PAN: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  ),
  Loan: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
      <path d="M2 17l10 5 10-5"></path>
      <path d="M2 12l10 5 10-5"></path>
    </svg>
  ),
  Logout: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  ),
  Download: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  ),
  Alert: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  Transactions: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 4v6h6"></path>
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
    </svg>
  ),
};

// --- TypeScript Interfaces for Data ---
interface Transaction {
  plan_amount: any;
  operator: ReactNode;
  agent_commission: any;
  id: number;
  service: string;
  created_at: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
  amount: number;
  cashback: number;
}

interface DashboardData {
  walletBalance: number;
  kycStatus: "VERIFIED" | "PENDING" | "REJECTED";
  memberId: string;
  todaysTransactions: number;
  monthlySummary: number;
  cashbackEarned: number;
  pendingAlerts: number;
  recentTransactions: Transaction[];
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalTransactions: number;
}

interface KycData {
    status: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'NOT_UPLOADED';
    aadhaarUrl: string;
    panUrl: string;
}

const B2CDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [transactionsHistory, setTransactionsHistory] = useState<Transaction[]>(
    []
  );
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { auth, refreshUser } = useAuth();
  const [isAddMoneyModalOpen, setAddMoneyModalOpen] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState<number | string>("");
  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  const [kycData, setKycData] = useState<KycData | null>(null);

  // This effect synchronizes the profile form with the authenticated user's data
  useEffect(() => {
    if (auth.user) { setProfileData({ name: auth.user.name, email: auth.user.email }); }
  }, [auth.user]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // MOCK DATA - Replace with your API call
        // const { data } = await api.get<DashboardData>("/dashboard/b2c");
        const mockData: DashboardData = {
          walletBalance: 5230.5,
          kycStatus: "VERIFIED",
          memberId: "CZP12345678",
          todaysTransactions: 12,
          monthlySummary: 14500.0,
          cashbackEarned: 250.75,
          pendingAlerts: 2,
          recentTransactions: [
            {
              id: 1,
              operator: "Jio",
              service: "Mobile Recharge",
              created_at: new Date().toISOString(),
              amount: 299,
              plan_amount: 299,
              status: "COMPLETED",
              cashback: 5.0,
              agent_commission: 5.0,
            },
            {
              id: 2,
              operator: "BSES Delhi",
              service: "Electricity Bill",
              created_at: new Date().toISOString(),
              amount: 1250,
              plan_amount: 1250,
              status: "PENDING",
              cashback: 0,
              agent_commission: 0,
            },
            {
              id: 3,
              operator: "Tata Sky",
              service: "DTH Recharge",
              created_at: new Date().toISOString(),
              amount: 450,
              plan_amount: 450,
              status: "FAILED",
              cashback: 0,
              agent_commission: 0,
            },
          ],
        };
        setDashboardData(mockData);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Could not load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchKycData = async () => {
        if (auth.user) {
            try {
                // Assuming the new KYC routes are mounted under /api/kyc
                const statusRes = await api.get('/kyc/status');
                const status = statusRes.data.kyc_status || 'NOT_UPLOADED';

                setKycData({
                    status: status,
                    aadhaarUrl: `/api/kyc/image/${auth.user.id}/aadhaar`,
                    panUrl: `/api/kyc/image/${auth.user.id}/pan`
                });
            } catch (error) {
                console.error("Failed to fetch KYC data:", error);
            }
        }
    };

    if (auth.user) {
      fetchDashboardData();
      fetchKycData();
    }
  }, [auth.user]);

  const fetchAllTransactions = async (page = 1) => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors

      // --- API CONNECTION POINT ---
      // This now uses your /transactions endpoint.
      // Ensure your API returns an object like: { transactions: [...], pagination: { currentPage, totalPages, ... } }
      const { data } = await api.get(
        `/payment/transactions?page=${page}&limit=10`
      );

      setTransactionsHistory(data.transactions);
      setPagination(data.pagination);
    } catch (err) {
      console.error("Failed to fetch transactions history:", err);
      setError("Could not load transactions history.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    setProfileMessage({ type: '', text: '' }); // Clear previous message
    try {
        // --- API CONNECTION POINT ---
        // Using /auth/profile based on your AuthContext
        const { data } = await api.put('/auth/profile', profileData);
        
        // Refresh user data in the context so it reflects everywhere
        if (refreshUser) {
            await refreshUser();
        }
        
        setProfileMessage({ type: 'success', text: data.message });
    } catch (err: any) {
        console.error("Failed to update profile:", err);
        setProfileMessage({ type: 'error', text: err.response?.data?.message || "An error occurred." });
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Fetch data for the transactions tab if it hasn't been fetched yet
    if (tab === "transactions" && transactionsHistory.length === 0) {
      fetchAllTransactions(1);
    }
  };

  const quickActions = [
    { label: "Recharge", icon: <Icons.Mobile /> },
    { label: "DTH", icon: <Icons.DTH /> },
    { label: "FASTag", icon: <Icons.Fastag /> },
    { label: "Bill Payment", icon: <Icons.Bill /> },
    { label: "Travel", icon: <Icons.Travel /> },
    { label: "AEPS", icon: <Icons.AEPS /> },
  ];

  const handleAddMoney = async () => {
    if (!addMoneyAmount || +addMoneyAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    try {
      console.log(`Initiating payment for ₹${addMoneyAmount}`);
      // --- API CONNECTION POINT ---
      // 1. Create an order on your backend
      // const { data } = await api.post('/payment/create-order', { amount: addMoneyAmount });
      // 2. Open payment gateway (e.g., Razorpay) with order details
      // openRazorpay(data);
      alert(
        `API Call: Proceeding to add ₹${addMoneyAmount}. Replace this with your payment gateway logic.`
      );
      setAddMoneyModalOpen(false);
    } catch (err) {
      console.error("Failed to create payment order", err);
      alert("Could not initiate payment. Please try again.");
    }
  };

  const AddMoneyModal = () => (
    <div className="modal-overlay" onClick={() => setAddMoneyModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Add Money to Wallet</h3>
          <button
            onClick={() => setAddMoneyModalOpen(false)}
            className="modal-close-btn"
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="add-money-form">
            <label htmlFor="amount" className="form-label">
              Enter Amount
            </label>
            <div className="amount-input-wrapper">
              <span className="amount-symbol">₹</span>
              <input
                type="number"
                id="amount"
                className="amount-input"
                placeholder="0.00"
                value={addMoneyAmount}
                onChange={(e) => setAddMoneyAmount(e.target.value)}
              />
            </div>
            <div className="quick-amounts">
              {[100, 500, 1000].map((amount) => (
                <button
                  key={amount}
                  className="quick-amount-btn"
                  onClick={() =>
                    setAddMoneyAmount(
                      (current) => (Number(current) || 0) + amount
                    )
                  }
                >
                  + ₹{amount}
                </button>
              ))}
            </div>
            <button className="btn-primary-full" onClick={handleAddMoney}>
              Proceed to Add Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* INTERNAL CSS FOR MODERN DESIGN */}
      <style>{`
        :root {
          --primary-color: #6366f1; /* Indigo 500 */
          --primary-hover: #4f46e5; /* Indigo 600 */
          --bg-main: #f3f4f6;
          --bg-card: #ffffff;
          --text-main: #111827;
          --text-muted: #6b7280;
          --border-light: #e5e7eb;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --success-bg: #def7ec;
          --success-text: #03543f;
          --warning-bg: #fdf6b2;
          --warning-text: #723b13;
          --info-bg: #e1effe;
          --danger-bg: #fee2e2;
          --danger-text: #991b1b;
          --info-text: #1e429f;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .dashboard-layout {
          display: flex;
          height: 100vh; /* Make layout full screen height */
          overflow: hidden; /* Prevent the whole page from scrolling */
          background-color: var(--bg-main);
          color: var(--text-main);
        }

        /* --- Sidebar Styling --- */
        .sidebar {
          width: 260px;
          flex-shrink: 0; /* Prevent sidebar from shrinking */
          background-color: var(--bg-card);
          border-right: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
        }

        .logo-section {
          padding: 24px 28px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid var(--border-light);
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
          color: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 20px;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .logo-text {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.5px;
        }

        .nav-list {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 15px;
          font-weight: 500;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
        }

        .nav-item:hover {
          background-color: #f9fafb;
          color: var(--primary-color);
        }

        .nav-item.active {
          background-color: #eef2ff;
          color: var(--primary-color);
          font-weight: 600;
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid var(--border-light);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: 12px;
        }

        .avatar-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-details p {
          line-height: 1.3;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
        }

        .user-role {
          font-size: 12px;
          color: var(--text-muted);
        }
        
        .logout-btn {
            margin-left: auto;
            color: var(--text-muted);
        }
        .logout-btn:hover {
            color: var(--danger-text);
        }

        /* --- Main Content Styling --- */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden; /* Prevent main content area from overflowing */
        }

        /* Header */
        .top-header {
          height: 80px;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          padding: 0 40px;
        }

        .search-wrapper {
          position: relative;
          width: 400px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 44px;
          border-radius: 12px;
          border: 1px solid var(--border-light);
          background-color: #f9fafb;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .search-input:focus {
          background-color: #fff;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .header-tools {
          display: flex;
          align-items: center;
          margin-left: auto; /* Push tools to the right */
          gap: 16px;
        }

        .icon-button {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          border: 1px solid var(--border-light);
          background: white;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
        }

        .icon-button:hover {
          background-color: #f9fafb;
          color: var(--text-main);
          border-color: #d1d5db;
        }

        .notification-dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border-radius: 50%;
          border: 2px solid white;
        }

        /* Scrollable Content Area */
        .scroll-area {
          padding: 40px;
          overflow-y: auto; /* Enable vertical scrolling */
          flex: 1; /* Allow this area to grow and fill available space */
        }

        .page-header {
          margin-bottom: 32px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .page-subtitle {
          color: var(--text-muted);
        }

        /* User Overview */
        .user-overview {
            background: linear-gradient(105deg, var(--primary-color) 0%, #4338ca 100%);
            color: white;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .overview-item {
            text-align: center;
        }
        .overview-label {
            font-size: 13px;
            opacity: 0.8;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .overview-value {
            font-size: 18px;
            font-weight: 600;
        }
        .overview-value .badge {
            font-size: 14px;
            padding: 6px 14px;
        }
        .badge-verified {
            background-color: rgba(74, 222, 128, 0.2);
            color: #dcfce7;
        }


        /* Stats Cards */
        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .stat-box {
          background: white;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
        }

        .stat-box:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .stat-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .stat-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-muted);
        }

        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-blue { background: #e0e7ff; color: var(--primary-color); }
        .icon-green { background: #dcfce7; color: #16a34a; }
        .icon-purple { background: #f3e8ff; color: #9333ea; }
        .icon-orange { background: #ffedd5; color: #ea580c; }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 8px;
        }

        .stat-footer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
        }

        .trend-up {
          color: #16a34a;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
        }

        .trend-neutral {
          color: var(--text-muted);
        }

        .withdraw-btn {
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          margin-top: 4px;
          transition: background 0.2s;
        }

        .withdraw-btn:hover {
          background-color: var(--primary-hover);
        }

        /* Quick Actions */
        .quick-actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 16px;
            margin-bottom: 40px;
        }
        .action-card {
            background: white;
            border-radius: 16px;
            padding: 20px;
            border: 1px solid var(--border-light);
            box-shadow: var(--shadow-sm);
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .action-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-md);
            color: var(--primary-color);
        }
        .action-icon {
            color: var(--primary-color);
            margin-bottom: 12px;
        }
        .action-label {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-main);
        }

        /* Table Section */
        .table-card {
          background: white;
          border-radius: 16px;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        .table-header {
          padding: 24px;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-title {
          font-size: 18px;
          font-weight: 700;
        }

        .btn-outline {
          padding: 8px 16px;
          border: 1px solid var(--border-light);
          background: white;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-outline:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          text-align: left;
          padding: 16px 24px;
          background-color: #f9fafb;
          color: var(--text-muted);
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.5px;
          border-bottom: 1px solid var(--border-light);
        }

        .data-table td {
          padding: 16px 24px;
          border-bottom: 1px solid var(--border-light);
          font-size: 14px;
          color: var(--text-main);
        }

        .data-table tr:last-child td {
          border-bottom: none;
        }

        .data-table tr:hover td {
          background-color: #f9fafb;
        }

        .trx-code {
          font-family: 'Courier New', monospace;
          font-weight: 600;
          color: var(--text-muted);
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background-color: #eef2ff;
          color: var(--primary-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }

        .amount-cell {
          font-weight: 600;
          color: var(--text-main);
        }

        .badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }
        
        /* Pagination Styles */
        .pagination-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 24px;
            border-top: 1px solid var(--border-light);
        }
        .pagination-info { font-size: 14px; color: var(--text-muted); }
        .pagination-buttons button {
            margin-left: 8px;
        }
        .pagination-buttons button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }



        .badge-completed { background-color: var(--success-bg); color: var(--success-text); }
        .badge-pending { background-color: var(--warning-bg); color: var(--warning-text); }
        .badge-processing { background-color: var(--info-bg); color: var(--info-text); }
        .badge-failed { background-color: var(--danger-bg); color: var(--danger-text); }


        /* Wallet Summary Card */
        .wallet-summary-card {
            background: linear-gradient(105deg, var(--primary-color) 0%, #4338ca 100%);
            color: white;
            border-radius: 16px;
            padding: 32px;
            margin-bottom: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .wallet-balance-section .balance-label {
            font-size: 16px;
            opacity: 0.8;
            margin-bottom: 8px;
        }
        .wallet-balance-section .balance-amount {
            font-size: 48px;
            font-weight: 700;
            letter-spacing: -1px;
        }
        .wallet-actions .btn-wallet-action {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .wallet-actions .btn-wallet-action:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        /* Add Money Modal */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .modal-content {
            background: white;
            border-radius: 16px;
            width: 100%;
            animation: modal-fade-in 0.3s ease-out;
            max-width: 420px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .modal-header {
            padding: 20px 24px;
            border-bottom: 1px solid var(--border-light);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-title { font-size: 18px; font-weight: 600; }
        .modal-close-btn { font-size: 28px; color: var(--text-muted); background: none; border: none; cursor: pointer; line-height: 1; }
        .modal-body { padding: 24px; }
        .form-label { font-size: 14px; font-weight: 500; color: var(--text-muted); margin-bottom: 8px; display: block; }
        .amount-input-wrapper { display: flex; align-items: center; border: 1px solid var(--border-light); border-radius: 12px; margin-bottom: 16px; }
        .amount-input-wrapper:focus-within { border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1); }
        .amount-symbol { font-size: 24px; font-weight: 600; color: var(--text-muted); padding-left: 16px; }
        .amount-input { border: none; outline: none; background: transparent; padding: 16px; font-size: 32px; font-weight: 700; width: 100%; }
        .quick-amounts { display: flex; gap: 12px; margin-bottom: 24px; }
        .quick-amount-btn { flex: 1; background: #f3f4f6; border: 1px solid var(--border-light); border-radius: 8px; padding: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .quick-amount-btn:hover { background: #eef2ff; color: var(--primary-color); border-color: var(--primary-color); }
        .btn-primary-full {
            width: 100%;
            background: var(--primary-color);
            color: white;
            padding: 16px;
            border-radius: 12px;
            border: none;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn-primary-full:hover { background: var(--primary-hover); }


        /* Profile Page Styles */
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .form-group { margin-bottom: 20px; }
        .form-input {
            width: 100%;
            padding: 12px 16px;
            border-radius: 12px;
            border: 1px solid var(--border-light);
            background-color: #f9fafb;
            font-size: 14px;
            outline: none;
            transition: all 0.2s;
        }
        .form-input:focus {
            background-color: #fff;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .form-footer {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 12px;
            padding: 20px 24px;
            border-top: 1px solid var(--border-light);
        }
        .profile-message {
            padding: 10px 16px;
            border-radius: 8px;
            font-size: 14px;
        }
        .profile-message.success { background-color: var(--success-bg); color: var(--success-text); }
        .profile-message.error { background-color: var(--danger-bg); color: var(--danger-text); }

        @keyframes modal-fade-in {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .main-content {
            margin-left: 0;
            width: 100%;
          }
          .search-wrapper {
            width: 250px;
          }
        }
      `}</style>
      {/* KYC Document Styles */}
      <style>{`
        .kyc-docs-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            padding: 24px;
        }
        .doc-card {
            border: 1px solid var(--border-light);
            border-radius: 12px;
            padding: 16px;
        }
        .doc-card-header { font-weight: 600; margin-bottom: 12px; }
        .doc-image-placeholder {
            width: 100%;
            height: 180px;
            background-color: #f3f4f6;
            border-radius: 8px;
            overflow: hidden; /* To contain the image */
        }
        .doc-image-placeholder img { width: 100%; height: 100%; object-fit: cover; }
      `}</style>

      <div className="dashboard-layout">
        {isAddMoneyModalOpen && <AddMoneyModal />}
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo-section">
            {/* <div className="logo-icon">V</div> */}
            <span className="logo-text">YourBrand Pay</span>
          </div>

          <nav className="nav-list">
            <button
              className={`nav-item ${
                activeTab === "dashboard" ? "active" : ""
              }`}
              onClick={() => handleTabClick("dashboard")}
            >
              <Icons.Dashboard /> Overview
            </button>
            <button
              className={`nav-item ${activeTab === "recharge" ? "active" : ""}`}
              onClick={() => handleTabClick("recharge")}
            >
              <Icons.Bill /> Recharge & Bills
            </button>
            <button
              className={`nav-item ${activeTab === "wallet" ? "active" : ""}`}
              onClick={() => handleTabClick("wallet")}
            >
              <Icons.Wallet /> Wallet
            </button>
            <button
              className={`nav-item ${
                activeTab === "transactions" ? "active" : ""
              }`}
              onClick={() => handleTabClick("transactions")}
            >
              <Icons.Transactions /> Transactions
            </button>
            <button
              className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => handleTabClick("profile")}
            >
              <Icons.User /> Profile & KYC
            </button>
            <button
              className={`nav-item ${activeTab === "support" ? "active" : ""}`}
              onClick={() => handleTabClick("support")}
            >
              <Icons.Help /> Support
            </button>
          </nav>

          <div className="sidebar-footer">
            <div className="user-profile">
              <img
                src={`https://ui-avatars.com/api/?name=${auth.user?.name}&background=4f46e5&color=fff`}
                alt="User"
                className="avatar-img"
              />
              <div className="user-details">
                <p className="user-name">{auth.user?.name || "User"}</p>
                <p className="user-role">{auth.user?.role || "User"}</p>
              </div>
              <button className="icon-button logout-btn">
                <Icons.Logout />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {/* Top Navigation Header */}
          <header className="top-header">
            <div className="search-wrapper">
              <span className="search-icon">
                <Icons.Search />
              </span>
              <input
                type="text"
                className="search-input"
                placeholder="Search transactions, customers..."
              />
            </div>

            <div className="header-tools">
              <button className="icon-button">
                <Icons.Bell />
                <span className="notification-dot"></span>
              </button>
              <button className="icon-button">
                <Icons.Settings />
              </button>
            </div>
          </header>

          {/* Scrollable Dashboard Body */}
          <div className="scroll-area">
            {activeTab === "dashboard" && (
              <>
                <div className="page-header">
                  <h1 className="page-title">Dashboard</h1>
                  <p className="page-subtitle">
                    Welcome back, {auth.user?.name?.split(" ")[0]}. Here's
                    what's happening with your account today.
                  </p>
                </div>

                {/* 1. User Overview */}
                <div className="user-overview">
                  <div className="overview-item">
                    <div className="overview-label">Wallet Balance</div>
                    <div className="overview-value">
                      ₹
                      {loading
                        ? "..."
                        : dashboardData?.walletBalance.toFixed(2) ?? "0.00"}
                    </div>
                  </div>
                  <div className="overview-item">
                    <div className="overview-label">KYC Status</div>
                    <div className="overview-value">
                      <span
                        className={`badge badge-${dashboardData?.kycStatus.toLowerCase()}`}
                      >
                        {dashboardData?.kycStatus ?? "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="overview-item">
                    <div className="overview-label">Member ID</div>
                    <div className="overview-value">
                      {dashboardData?.memberId ?? "N/A"}
                    </div>
                  </div>
                </div>

                {/* 2. Quick Actions */}
                <div className="page-header" style={{ marginBottom: "16px" }}>
                  <h2 className="page-title" style={{ fontSize: "22px" }}>
                    Quick Actions
                  </h2>
                </div>
                <div className="quick-actions-grid">
                  {quickActions.map((action) => (
                    <div key={action.label} className="action-card">
                      <div className="action-icon">{action.icon}</div>
                      <span className="action-label">{action.label}</span>
                    </div>
                  ))}
                </div>

                {/* 3. Widgets */}
                <div className="stats-container">
                  {/* Today's Transactions */}
                  <div className="stat-box">
                    <div className="stat-top">
                      <span className="stat-label">Today's Transactions</span>
                      <div className="stat-icon-wrapper icon-blue">
                        <Icons.Transactions />
                      </div>
                    </div>
                    <div className="stat-number">
                      {loading ? "..." : dashboardData?.todaysTransactions ?? 0}
                    </div>
                    <div className="stat-footer">
                      <span className="trend-neutral">
                        Updated in real-time
                      </span>
                    </div>
                  </div>

                  {/* Monthly Summary */}
                  <div className="stat-box">
                    <div className="stat-top">
                      <span className="stat-label">Monthly Summary</span>
                      <div className="stat-icon-wrapper icon-purple">
                        <Icons.Commission />
                      </div>
                    </div>
                    <div className="stat-number">
                      ₹
                      {loading
                        ? "..."
                        : dashboardData?.monthlySummary.toFixed(2) ?? "0.00"}
                    </div>
                    <div className="stat-footer">
                      <span className="trend-neutral">
                        For {format(new Date(), "MMMM")}
                      </span>
                    </div>
                  </div>

                  {/* Cashback Earned */}
                  <div className="stat-box">
                    <div className="stat-top">
                      <span className="stat-label">
                        Cashback Earned (Total)
                      </span>
                      <div className="stat-icon-wrapper icon-green">
                        <Icons.Gift />
                      </div>
                    </div>
                    <div className="stat-number">
                      ₹
                      {loading
                        ? "..."
                        : dashboardData?.cashbackEarned.toFixed(2) ?? "0.00"}
                    </div>
                    <div className="stat-footer">
                      <span className="trend-neutral">
                        Across all transactions
                      </span>
                    </div>
                  </div>

                  {/* Failed/Pending Alerts */}
                  <div className="stat-box">
                    <div className="stat-top">
                      <span className="stat-label">
                        Pending / Failed Alerts
                      </span>
                      <div className="stat-icon-wrapper icon-orange">
                        <Icons.Alert />
                      </div>
                    </div>
                    <div className="stat-number">
                      {loading ? "..." : dashboardData?.pendingAlerts ?? 0}
                    </div>
                    <button
                      className="withdraw-btn"
                      style={{ background: "#f97316" }}
                    >
                      Review Now
                    </button>
                  </div>
                </div>

                {/* 4. Recent Transactions Table */}
                <div className="table-card">
                  <div className="table-header">
                    <h3 className="table-title">Recent Activity</h3>
                    <button
                      className="btn-outline"
                      onClick={() => handleTabClick("transactions")}
                    >
                      View All Activity
                    </button>
                  </div>

                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Service</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Cashback</th>
                          <th>Invoice</th>
                        </tr>
                      </thead>
                      {loading ? (
                        <tbody>
                          <tr>
                            <td
                              colSpan={5}
                              style={{ textAlign: "center", padding: "40px" }}
                            >
                              Loading...
                            </td>
                          </tr>
                        </tbody>
                      ) : error ? (
                        <tbody>
                          <tr>
                            <td
                              colSpan={5}
                              style={{
                                textAlign: "center",
                                padding: "40px",
                                color: "red",
                              }}
                            >
                              {error}
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          {dashboardData?.recentTransactions.map((tx) => (
                            <tr key={tx.id}>
                              <td style={{ color: "#6b7280" }}>
                                {format(
                                  new Date(tx.created_at),
                                  "MMM dd, h:mm a"
                                )}
                              </td>
                              <td>{tx.service}</td>
                              <td className="amount-cell">
                                ₹{Number(tx.amount).toFixed(2)}
                              </td>
                              <td>
                                <span
                                  className={`badge badge-${tx.status.toLowerCase()}`}
                                >
                                  {tx.status}
                                </span>
                              </td>
                              <td
                                className="amount-cell"
                                style={{ color: "#16a34a" }}
                              >
                                + ₹{Number(tx.cashback).toFixed(2)}
                              </td>
                              <td>
                                <button
                                  className="icon-button"
                                  style={{ width: "36px", height: "36px" }}
                                >
                                  <Icons.Download />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {dashboardData?.recentTransactions.length === 0 && (
                            <tr>
                              <td
                                colSpan={5}
                                style={{ textAlign: "center", padding: "40px" }}
                              >
                                No recent activity found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === "recharge" && (
              <>
                <div className="page-header">
                  <h1 className="page-title">Recharge & Bill Payments</h1>
                  <p className="page-subtitle">
                    Pay for all your essential services in one place.
                  </p>
                </div>
                <div className="table-card">
                  <div
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "var(--text-muted)",
                    }}
                  >
                    Recharge and Bill Payment forms will be here.
                  </div>
                </div>
              </>
            )}

            {activeTab === "wallet" && (
              <>
                <div className="page-header">
                  <h1 className="page-title">Wallet & Transactions</h1>
                  <p className="page-subtitle">
                    Manage your funds and view your complete transaction
                    history.
                  </p>
                </div>

                <div className="wallet-summary-card">
                  <div className="wallet-balance-section">
                    <div className="balance-label">Available Balance</div>
                    <div className="balance-amount">
                      ₹
                      {loading
                        ? "..."
                        : dashboardData?.walletBalance.toFixed(2) ?? "0.00"}
                    </div>
                  </div>
                  <div className="wallet-actions">
                    <button
                      className="btn-wallet-action"
                      onClick={() => setAddMoneyModalOpen(true)}
                    >
                      + Add Money
                    </button>
                  </div>
                </div>
                <div className="table-card">
                  <div
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "var(--text-muted)",
                    }}
                  >
                    Wallet History and Cashback Info will be displayed here.
                  </div>
                </div>
              </>
            )}

            {activeTab === "transactions" && (
              <>
                <div className="page-header">
                  <h1 className="page-title">All Transactions</h1>
                  <p className="page-subtitle">
                    A complete record of all your account activity.
                  </p>
                </div>

                <div className="table-card">
                  <div className="table-wrapper">
                    <table className="data-table">
                      {/* Table structure is the same as recent activity */}
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Service</th>
                          <th style={{ textAlign: "right" }}>Amount</th>
                          <th>Commission</th>
                          <th>Status</th>
                          <th>Invoice</th>
                        </tr>
                      </thead>
                      {/* Table Body for History */}
                      {loading ? (
                        <tbody>
                          <tr>
                            <td
                              colSpan={6}
                              style={{ textAlign: "center", padding: "40px" }}
                            >
                              Loading Transactions...
                            </td>
                          </tr>
                        </tbody>
                      ) : error ? (
                        <tbody>
                          <tr>
                            <td
                              colSpan={6}
                              style={{
                                textAlign: "center",
                                padding: "40px",
                                color: "red",
                              }}
                            >
                              {error}
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          {transactionsHistory.map((tx) => (
                            <tr key={tx.id}>
                              <td style={{ color: "#6b7280" }}>
                                {format(
                                  new Date(tx.created_at),
                                  "MMM dd, yyyy, h:mm a"
                                )}
                              </td>
                              <td>{tx.operator}</td>
                              <td
                                className="amount-cell"
                                style={{ textAlign: "right" }}
                              >
                                ₹{Number(tx.plan_amount).toFixed(2)}
                              </td>
                              <td
                                className="amount-cell"
                                style={{ color: "#16a34a" }}
                              >
                                ₹{Number(tx.agent_commission).toFixed(2)}
                              </td>
                              <td>
                                <span
                                  className={`badge badge-${tx.status.toLowerCase()}`}
                                >
                                  {tx.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="icon-button"
                                  style={{ width: "36px", height: "36px" }}
                                >
                                  <Icons.Download />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {transactionsHistory.length === 0 && (
                            <tr>
                              <td
                                colSpan={6}
                                style={{ textAlign: "center", padding: "40px" }}
                              >
                                No transactions found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      )}
                    </table>
                  </div>
                  {/* Pagination Controls */}
                  {pagination && pagination.totalPages > 1 && (
                    <div className="pagination-controls">
                      <span className="pagination-info">
                        Page {pagination.currentPage} of {pagination.totalPages}
                      </span>
                      <div className="pagination-buttons">
                        <button
                          className="btn-outline"
                          onClick={() =>
                            fetchAllTransactions(pagination.currentPage - 1)
                          }
                          disabled={pagination.currentPage <= 1}
                        >
                          Previous
                        </button>
                        <button
                          className="btn-outline"
                          onClick={() =>
                            fetchAllTransactions(pagination.currentPage + 1)
                          }
                          disabled={
                            pagination.currentPage >= pagination.totalPages
                          }
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === "profile" && (
              <>
                <div className="page-header">
                  <h1 className="page-title">Profile & KYC</h1>
                  <p className="page-subtitle">
                    Manage your personal information and complete your KYC.
                  </p>
                </div>
                <div className="table-card" style={{marginBottom: '32px'}}>
                    <div className="table-header">
                        <h3 className="table-title">Personal Information</h3>
                    </div>
                    <form onSubmit={handleUpdateProfile}>
                        <div style={{padding: '24px'}}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input type="text" id="name" name="name" className="form-input" value={profileData.name} onChange={handleProfileInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email" id="email" name="email" className="form-input" value={profileData.email} onChange={handleProfileInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="form-footer">
                            {profileMessage.text && <span className={`profile-message ${profileMessage.type}`}>{profileMessage.text}</span>}
                            <button type="submit" className="btn-outline" style={{backgroundColor: 'var(--primary-color)', color: 'white', borderColor: 'var(--primary-color)'}}>Save Changes</button>
                        </div>
                    </form>
                </div>

                <div className="table-card" style={{marginBottom: '32px'}}>
                    <div className="table-header">
                        <h3 className="table-title">KYC Documents</h3>
                        {kycData && <span className={`badge badge-${kycData.status.toLowerCase()}`}>{kycData.status.replace('_', ' ')}</span>}
                    </div>
                    {kycData ? (
                        <div className="kyc-docs-grid">
                            <div className="doc-card">
                                <p className="doc-card-header">Aadhaar Card</p>
                                <div className="doc-image-placeholder">
                                    <img src={kycData.aadhaarUrl} alt="Aadhaar Card not uploaded" />
                                </div>
                            </div>
                            <div className="doc-card">
                                <p className="doc-card-header">PAN Card</p>
                                <div className="doc-image-placeholder">
                                    <img src={kycData.panUrl} alt="PAN Card not uploaded" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading KYC Information...</div>
                    )}
                    <div className="form-footer"><button className="btn-outline">Upload/Update Documents</button></div>
                </div>
              </>
            )}

            {activeTab === "support" && (
              <>
                <div className="page-header">
                  <h1 className="page-title">Help & Support</h1>
                  <p className="page-subtitle">
                    Get help with your account and transactions.
                  </p>
                </div>
                <div className="table-card">
                  <div
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "var(--text-muted)",
                    }}
                  >
                    Helpdesk Form, Ticket System, and FAQs will be here.
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default B2CDashboard;
