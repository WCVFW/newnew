import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Swal from "sweetalert2";
import { FaWallet } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [kycPendingCount, setKycPendingCount] = useState(0);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [totalCommission, setTotalCommission] = useState<number | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, [auth.user, navigate]);

  // Fetch KYC pending count for admin
  useEffect(() => {
    if (auth.user?.role === "ADMIN") {
      fetchKycPendingCount();
    }
  }, [auth.user?.role]);

  // Fetch wallet balance for user
  useEffect(() => {
    if (auth.user && auth.user.role !== "ADMIN") {
      fetchWalletBalance();
    }
  }, [auth.user]);

  const fetchKycPendingCount = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/kyc-pending");
      setKycPendingCount(res.data?.length || 0);
    } catch (err) {
      console.error("Error fetching KYC pending:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWalletBalance = async () => {
    try {
      const response = await api.get("/wallet/balance");
      setWalletBalance(parseFloat(response.data.balance));
      setTotalCommission(parseFloat(response.data.total_commission || 0));
    } catch (error) {
      console.error("Failed to fetch wallet balance:", error);
    }
  };

  // ============ ADMIN DASHBOARD ============
  if (auth.user?.role === "ADMIN") {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">
              <i className="material-symbols-outlined me-2">admin_panel_settings</i>
              Admin Dashboard
            </h2>
            <p className="text-muted">Welcome, {auth.user.name}!</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="text-muted mb-1">KYC Pending</h6>
                    <h3 className="mb-0">{kycPendingCount}</h3>
                  </div>
                  <i className="material-symbols-outlined text-warning" style={{ fontSize: "40px" }}>
                    pending_actions
                  </i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="text-muted mb-1">Users Registered</h6>
                    <h3 className="mb-0">--</h3>
                  </div>
                  <i className="material-symbols-outlined text-info" style={{ fontSize: "40px" }}>
                    people
                  </i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="text-muted mb-1">Total Transactions</h6>
                    <h3 className="mb-0">--</h3>
                  </div>
                  <i className="material-symbols-outlined text-success" style={{ fontSize: "40px" }}>
                    trending_up
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="row">
          <div className="col-12">
            <h5 className="mb-3">Quick Actions</h5>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="card-title mb-3">
                  <i className="material-symbols-outlined me-2">assignment</i>
                  KYC Verification
                </h6>
                <p className="text-muted small mb-3">Review and approve/reject pending KYC documents</p>
                <button
                  onClick={() => navigate("/admin")}
                  className="btn btn-primary btn-sm"
                >
                  View Pending KYC ({kycPendingCount})
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="card-title mb-3">
                  <i className="material-symbols-outlined me-2">settings</i>
                  Settings
                </h6>
                <p className="text-muted small mb-3">Manage application settings and configuration</p>
                <button className="btn btn-secondary btn-sm" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ USER DASHBOARD ============
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">
            <i className="material-symbols-outlined me-2">person</i>
            My Dashboard
          </h2>
          <p className="text-muted">Welcome, {auth.user?.name}!</p>
        </div>
      </div>

      {/* Wallet Balance Card */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card border-0 shadow-sm bg-primary text-white">
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="mb-2 text-white-50">Wallet Balance</h6>
                  <h2 className="mb-0 fw-bold">
                    ₹ {walletBalance !== null ? walletBalance.toFixed(2) : "0.00"}
                  </h2>
                  {walletBalance !== null && (
                    <small className="text-white-50 mt-1 d-block">
                      Total Commission Earned: ₹ {totalCommission !== null ? totalCommission.toFixed(2) : "0.00"}
                    </small>
                  )}
                </div>
                <div className="bg-white bg-opacity-25 p-3 rounded-circle">
                  <FaWallet size={32} className="text-white" />
                </div>
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-light btn-sm fw-semibold text-primary me-2"
                  onClick={() => navigate("/wallet/add-money")}
                >
                  <i className="material-symbols-outlined align-middle me-1" style={{ fontSize: "16px" }}>add</i>
                  Add Money
                </button>
                <button
                  className="btn btn-outline-light btn-sm fw-semibold"
                  onClick={() => navigate("/wallet/history")}
                >
                  <i className="material-symbols-outlined align-middle me-1" style={{ fontSize: "16px" }}>history</i>
                  History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Info Card */}
      <div className="row mb-5">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="card-title mb-3">
                <i className="material-symbols-outlined me-2">account_circle</i>
                Profile Information
              </h6>
              <div className="mb-3">
                <span className="text-muted small">Name:</span>
                <div className="fw-bold">{auth.user?.name}</div>
              </div>
              <div className="mb-3">
                <span className="text-muted small">Email:</span>
                <div className="fw-bold">{auth.user?.email}</div>
              </div>
              <div className="mb-3">
                <span className="text-muted small">Phone:</span>
                <div className="fw-bold">{auth.user?.phone || "Not provided"}</div>
              </div>
              <div className="mb-3">
                <span className="text-muted small">KYC Status:</span>
                <div>
                  <span
                    className={`badge ${auth.user?.is_active ? "bg-success" : "bg-warning"
                      }`}
                  >
                    {auth.user?.is_active ? "✅ Approved" : "⏳ Pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="card-title mb-3">
                <i className="material-symbols-outlined me-2">quick_reference</i>
                Quick Actions
              </h6>
              <button
                onClick={() => navigate("/recharge")}
                className="btn btn-primary btn-sm w-100 mb-2"
              >
                <i className="material-symbols-outlined me-2" style={{ fontSize: "16px" }}>
                  payment
                </i>
                Mobile Recharge
              </button>
              <button
                onClick={() => navigate("/kyc")}
                className="btn btn-outline-primary btn-sm w-100 mb-2"
              >
                <i className="material-symbols-outlined me-2" style={{ fontSize: "16px" }}>
                  assignment
                </i>
                Complete KYC
              </button>
              <button className="btn btn-outline-secondary btn-sm w-100" disabled>
                <i className="material-symbols-outlined me-2" style={{ fontSize: "16px" }}>
                  history
                </i>
                Transaction History (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Status Info */}
      {!auth.user?.is_active && (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-warning d-flex align-items-center" role="alert">
              <i className="material-symbols-outlined me-2">info</i>
              <div>
                <strong>KYC Verification Pending</strong>
                <p className="mb-0 small mt-1">
                  Your KYC submission is under review. Please complete your KYC to unlock full features.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {auth.user?.is_active && (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-success d-flex align-items-center" role="alert">
              <i className="material-symbols-outlined me-2">check_circle</i>
              <div>
                <strong>KYC Verified</strong>
                <p className="mb-0 small mt-1">
                  Your account is fully verified. You can now perform all transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
