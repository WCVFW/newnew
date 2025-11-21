import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaWallet } from "react-icons/fa";
import { api } from "../services/api";

// ================= NAVIGATION DATA =================
export const mainNavLinks = [
  {
    label: "Recharge & Bills",
    type: "dropdown",
    submenu: [
      { href: "/recharge/mobile", label: "Mobile Recharge" },
      { href: "/recharge/dth", label: "DTH Recharge" },
      { href: "/recharge/electricity", label: "Electricity Bill" },
      { href: "/recharge/water", label: "Water Bill" },
      { href: "/recharge/gas", label: "Gas Bill" },
      { href: "/recharge/broadband", label: "Broadband / Landline" },
      { href: "/recharge/fastag", label: "FASTag Recharge" },
      { href: "/recharge/lpg", label: "LPG Cylinder Booking" },
      { href: "/recharge/insurance", label: "Insurance Payment" },
      { href: "/recharge/education-fees", label: "Education Fees" },
      { href: "/recharge/municipal-tax", label: "Municipal Tax" },
    ],
  },
  {
    label: "Money & Banking",
    type: "dropdown",
    submenu: [
      { href: "/aeps", label: "AEPS (Aadhaar Withdrawal)" },
      { href: "/micro-atm", label: "Micro ATM" },
      { href: "/dmt", label: "DMT (Money Transfer)" },
      { href: "/upi-collect", label: "UPI Collect / QR Payments" },
      { href: "/wallet-to-bank", label: "Wallet to Bank Transfer" },
      { href: "/verify/bank-account", label: "Bank Account Verification" },
      { href: "/verify/pan", label: "PAN Verification" },
      { href: "/verify/aadhaar-ekyc", label: "Aadhaar eKYC" },
    ],
  },
  {
    label: "Travel Booking",
    type: "dropdown",
    submenu: [
      { href: "/flight", label: "Flight Booking" },
      { href: "/train", label: "Train Booking (IRCTC)" },
      { href: "/bus", label: "Bus Booking" },
      { href: "/hotel", label: "Hotel Booking" },
      { href: "/cab", label: "Cab Booking" },
    ],
  },
  {
    label: "B2B Services",
    type: "dropdown",
    submenu: [
      { href: "/login/partner", label: "Partner Login" },
      { href: "/login/distributor", label: "Distributor Login" },
      { href: "/login/retailer", label: "Retailer Login" },
      { href: "/b2b/commission", label: "Commission Structure" },
      { href: "/b2b/api-docs", label: "API Documentation" },
      { href: "/b2b/create-distributor", label: "Create Distributor" },
      { href: "/b2b/create-retailer", label: "Create Retailer" },
    ],
  },
  {
    label: "Support",
    type: "dropdown",
    submenu: [
      { href: "/support/help-center", label: "Help Center" },
      { href: "/support/complaints", label: "Complaints" },
      { href: "/support/raise-ticket", label: "Raise a Ticket" },
      { href: "/support/api", label: "API Support" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

// =================== HEADER COMPONENT ======================
const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Fetch wallet balance
  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (auth.user) {
        try {
          const response = await api.get("/wallet/balance");
          setWalletBalance(parseFloat(response.data.balance));
        } catch (error) {
          console.error("Failed to fetch wallet balance:", error);
        }
      }
    };

    fetchWalletBalance();
  }, [auth.user]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Close user menu if click is outside
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setUserMenuOpen(false);
      }

      // Close nav dropdown if click is outside
      if (!(event.target as HTMLElement).closest(".nav-item-dropdown")) {
        setOpenDropdown(null);
      }

      // Close mobile menu if click is outside of it and not on the hamburger
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, mobileMenuRef, hamburgerRef]);

  return (
    <header
      className="header-section"
      style={{ fontFamily: "Poppins, sans-serif", padding: "25px" }}
    >
      <div className="container-fluid">
        <div className="header-wrapper d-flex align-items-center justify-content-between">
          {/* ================= LOGO ================== */}
          <div className="logo-menu">
            <Link to="/" className="logo">
              <h4>
                Calzone<span className="text-primary">Pay</span>
              </h4>
            </Link>
          </div>

          {/* ================= DESKTOP NAVIGATION ================== */}
          <ul
            className={`main-menu d-none d-lg-flex ${menuOpen ? "active" : ""}`}
          >
            {mainNavLinks.map((link, idx) => (
              <li
                key={idx}
                className="nav-item-dropdown position-relative"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(
                      openDropdown === link.label ? null : link.label
                    );
                  }}
                  className="d-flex align-items-center bg-transparent border-0"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === link.label}
                >
                  <span>{link.label}</span>
                  <i className="ms-1 material-symbols-outlined">expand_more</i>
                </button>

                {/* ---- Dropdown ---- */}
                <ul
                  className={`sub-menu ${openDropdown === link.label ? "show" : ""
                    }`}
                  style={{
                    position: "absolute",
                    background: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
                    padding: "10px 0",
                    minWidth: "220px",
                    zIndex: 50,
                    display: openDropdown === link.label ? "block" : "none",
                  }}
                >
                  {link.submenu.map((item, i) => (
                    <li key={i}>
                      <Link className="dropdown-item px-3 py-2" to={item.href}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {/* ================= RIGHT SIDE (DESKTOP & MOBILE) ================== */}
          <div className="menu__right d-flex align-items-center gap-3">
            {/* ========== DESKTOP USER MENU ========== */}
            {auth.user ? (
              <div className="d-flex align-items-center gap-3">
                {/* Wallet Balance Display */}
                <div className="d-none d-lg-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-light border">
                  <FaWallet className="text-primary" />
                  <span className="fw-semibold text-dark">
                    ₹ {walletBalance !== null ? walletBalance.toFixed(2) : "0.00"}
                  </span>
                </div>

                <div
                  className="d-none d-lg-flex position-relative"
                  ref={dropdownRef}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen(!userMenuOpen);
                    }}
                    className="d-flex align-items-center gap-2 bg-transparent border-0"
                    aria-label="Open user menu"
                    aria-haspopup="true"
                    aria-expanded={userMenuOpen}
                  >
                    <span className="fw-semibold">{auth.user.name}</span>
                    <FaUserCircle size={34} />
                  </button>

                  {userMenuOpen && (
                    <div
                      className="position-absolute bg-white shadow rounded-3 mt-2"
                      style={{
                        right: 0,
                        top: "100%",
                        minWidth: "180px",
                        border: "1px solid #eee",
                      }}
                    >
                      {auth.user.role === 'ADMIN' ? (
                        <Link
                          to="/admin/dashboard"
                          className="dropdown-item py-2 px-3 fw-bold text-primary"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      ) : auth.user.role === 'EMPLOYEE' ? (
                        <Link
                          to="/dashboard"
                          className="dropdown-item py-2 px-3 fw-bold text-success"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Employee Dashboard
                        </Link>
                      ) : (
                        <Link
                          to="/dashboard"
                          className="dropdown-item py-2 px-3"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="dropdown-item py-2 px-3 text-danger border-0 bg-transparent w-100 text-start"
                      >
                        Logout
                      </button>
                    </div>
                  )}

                </div>
              </div>
            ) : (
              <div className="d-none d-lg-flex gap-3 align-items-center">
                <div className="scroll-to-section">
                  <div className="main-red-button" >
                    <Link to="/login" className="btn btn-primary text-white">Login</Link>
                  </div>
                </div>

                <div className="scroll-to-section">
                  <div className="main-red-button" >
                    <Link to="/signup" className="btn btn-primary text-white">Signup</Link>
                  </div>
                </div>
              </div>
            )}

            {/* ========== MOBILE HAMBURGER ========== */}
            <button
              className="header-bar d-lg-none"
              ref={hamburgerRef}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open main menu"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================== */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`mobile-menu d-lg-none ${menuOpen ? "show" : ""}`}
        >
          <ul className="list-unstyled">
            {mainNavLinks.map((link, index) => (
              <li key={index} className="py-2 border-bottom">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === link.label ? null : link.label
                    )
                  }
                  aria-expanded={openDropdown === link.label}
                  className="w-100 d-flex justify-content-between align-items-center bg-transparent border-0 p-0"
                >
                  <span>{link.label}</span>
                  <i className="material-symbols-outlined">expand_more</i>
                </button>

                {/* Mobile submenu */}
                <div className={`collapse ${openDropdown === link.label ? 'show' : ''}`}>
                  <ul className="ps-3 mt-2 list-unstyled">
                    {link.submenu.map((item, i) => (
                      <li key={i} className="py-1">
                        <Link to={item.href} onClick={() => setMenuOpen(false)}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}

            {/* Mobile Auth */}
            <li className="mt-3">
              {auth.user ? (
                <>
                  {/* Mobile Wallet Balance */}
                  <div className="d-flex align-items-center gap-2 px-3 py-2 mb-3 rounded bg-light border">
                    <FaWallet className="text-primary" />
                    <span className="fw-semibold text-dark">
                      Wallet: ₹ {walletBalance !== null ? walletBalance.toFixed(2) : "0.00"}
                    </span>
                  </div>

                  {auth.user.role === 'ADMIN' ? (
                    <Link
                      to="/admin/dashboard"
                      className="d-block py-2 fw-bold text-primary"
                      onClick={() => setMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  ) : auth.user.role === 'EMPLOYEE' ? (
                    <Link
                      to="/employee/dashboard"
                      className="d-block py-2 fw-bold text-success"
                      onClick={() => setMenuOpen(false)}
                    >
                      Employee Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      className="d-block py-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    className="d-block py-2 text-danger border-0 bg-transparent"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="main-red-button mb-2" >
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="btn btn-primary text-white w-100">
                      Login
                    </Link>
                  </div>
                  <div className="main-red-button" >
                    <Link to="/signup" onClick={() => setMenuOpen(false)} className="btn btn-primary text-white w-100">
                      Signup
                    </Link>
                  </div>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
