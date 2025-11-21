import React, { useState, useEffect } from "react";
import { api } from "../../services/api"; // Ensure this path is correct
import { useAuth } from "../../context/AuthContext"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import WorkingSectionThree from "../../components/WorkingSectionThree"; // Ensure this path is correct

// --- Operator Data (UPDATED) ---
const operatorCategoryMap = {
  // Prepaid Mobile (Updated IDs based on your request)
  Airtel: { category: "prepaid", id: 1 },
  Vi: { category: "prepaid", id: 2 },
  Jio: { category: "prepaid", id: 4 },
  BSNL: { category: "prepaid", id: 8 },

  // Postpaid Mobile (Kept existing IDs as new data only specified prepaid)
  "Airtel Postpaid": { category: "postpaid", id: 43 },
  "Vi Postpaid": { category: "postpaid", id: 45 },
  "Jio Postpaid": { category: "postpaid", id: 83 },
  "BSNL Postpaid": { category: "postpaid", id: 44 },
};

// --- Circle Data (UPDATED) ---
const circleData = [
  { name: "Andhra Pradesh", id: "5" },
  { name: "Assam", id: "19" },
  { name: "Bihar Jharkhand", id: "17" },
  { name: "Chennai", id: "23" },
  { name: "Delhi NCR", id: "1" },
  { name: "Gujarat", id: "8" },
  { name: "Haryana", id: "16" },
  { name: "Himachal Pradesh", id: "21" },
  { name: "Jammu Kashmir", id: "22" },
  { name: "Karnataka", id: "7" },
  { name: "Kerala", id: "14" },
  { name: "Kolkata", id: "3" },
  { name: "Madhya Pradesh Chhattisgarh", id: "10" },
  { name: "Maharashtra", id: "4" },
  { name: "Mumbai", id: "2" },
  { name: "North East", id: "20" },
  { name: "Odisha", id: "18" },
  { name: "Punjab", id: "15" },
  { name: "Rajasthan", id: "13" },
  { name: "Tamil Nadu", id: "6" },
  { name: "UP East", id: "8" },
  { name: "UP West", id: "11" },
  { name: "West Bengal", id: "12" },
];

const RechargePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [categorizedPlans, setCategorizedPlans] = useState<
    Record<string, any[]>
  >({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Data States
  const [allOperators, setAllOperators] = useState<any[]>([]);

  // Form States
  const [operatorName, setOperatorName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [operatorCode, setOperatorCode] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [circleCode, setCircleCode] = useState<string>("");

  // Removed 'dth' from type
  const [rechargeType, setRechargeType] = useState<"prepaid" | "postpaid">("prepaid");
  const [amount, setAmount] = useState(""); // For Postpaid manual amount

  const { auth } = useAuth();
  const navigate = useNavigate();

  // 🔹 1. Initialize Operators
  useEffect(() => {
    const operatorList = Object.entries(operatorCategoryMap).map(
      ([name, details]) => ({
        name,
        category: details.category,
        id: String(details.id),
      })
    );
    setAllOperators(operatorList);
  }, []);

  // 🔹 2. Filter Operators based on Selection
  const filteredOperators = allOperators.filter(
    (op) => op.category === rechargeType
  );

  // 🔹 3. Reset fields when switching types
  useEffect(() => {
    setOperatorCode("");
    setOperatorName(null);
    setCategorizedPlans({});
    setError(null);
    setCircleCode("");
    setAmount("");
  }, [rechargeType]);

  // 🔹 4. Handle Fetch Plans (PREPAID Only)
  const handleFetchPlansClick = async () => {
    setLoading(true);
    setError(null);

    // Validation
    if (!mobileNumber || mobileNumber.length < 10 || isNaN(Number(mobileNumber))) {
      setLoading(false);
      Swal.fire("Invalid Input", "Please enter a valid 10-digit mobile number.", "error");
      return;
    }

    if (!operatorCode) {
      setLoading(false);
      Swal.fire("Operator Required", "Please select an operator.", "warning");
      return;
    }

    if (rechargeType === "prepaid" && !circleCode) {
      setLoading(false);
      Swal.fire("Circle Required", "Please select your circle.", "warning");
      return;
    }

    try {
      // Auto-detect operator and circle logic (Optional)
      try {
        const operatorResp = await api.get(`/operator/${mobileNumber}`);
        if (operatorResp.data) {
          // Optional: Auto-set operator/circle logic here
        }
      } catch (circleErr) {
        console.warn("Auto-detect operator/circle failed.", circleErr);
      }

      await fetchPlans(operatorCode, circleCode);
    } catch (err: any) {
      console.error("Error fetching plans:", err);
      setError("Could not fetch plans. Please try again.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  // Helper: Call Backend API
  const fetchPlans = async (opCode: string, circleCode: string) => {
    try {
      const plansResp = await api.get(`/plans/${opCode}/${circleCode}`);
      const respData = plansResp.data;

      if (!respData || (typeof respData === "object" && "error" in respData)) {
        setError(respData.error || "No plans found");
        setCategorizedPlans({});
        setShowModal(true);
        return;
      }

      const processedCategorizedPlans: Record<string, any[]> = {};
      for (const category in respData) {
        if (Object.prototype.hasOwnProperty.call(respData, category)) {
          const rawPlans = respData[category];
          if (Array.isArray(rawPlans)) {
            processedCategorizedPlans[category] = rawPlans.map(
              (plan: any, i: number) => ({
                id: `${category}-${i}`,
                amount: Number(plan.rs ?? plan.Amount ?? plan.amount ?? plan.Pr ?? 0) || 0,
                validity: plan.validity ?? plan.Validity ?? "N/A",
                data: plan.desc ?? plan.PlanName ?? plan.Plan ?? JSON.stringify(plan).slice(0, 80),
              })
            );
          }
        }
      }

      if (Object.keys(processedCategorizedPlans).length === 0) {
        setError("No plans found for this operator.");
        setCategorizedPlans({});
      } else {
        setCategorizedPlans(processedCategorizedPlans);
        setActiveTab(Object.keys(processedCategorizedPlans)[0]);
      }
      setShowModal(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "No plans available.");
      setCategorizedPlans({});
      setShowModal(true);
    }
  };

  // 🔹 5. Handle Manual Payment (Postpaid)
  const handleManualPayment = () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      Swal.fire("Invalid Input", "Enter a valid 10-digit Mobile Number.", "error");
      return;
    }
    if (!operatorCode) {
      Swal.fire("Operator Required", "Please select an operator.", "warning");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      Swal.fire("Invalid Amount", "Please enter a valid amount.", "error");
      return;
    }

    // Trigger recharge logic with manual data
    handleRecharge({
      amount: Number(amount),
      data: "Postpaid Bill Payment",
      validity: "Instant",
    });
  };

  // 🔹 6. Handle Recharge Transaction
  const handleRecharge = async (plan: any) => {
    if (!auth.user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login first to proceed.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: { pathname: "/recharge" } } });
        }
      });
      return;
    }

    // Commission Logic
    const employeeCommission = plan.amount * 0.02;
    const companyCommission = plan.amount * 0.015;
    const agentCommission = plan.amount * 0.01;
    const totalCommissions = employeeCommission + companyCommission + agentCommission;
    const totalAmount = plan.amount + totalCommissions;

    Swal.fire({
      title: `Confirm Payment`,
      html: `
        <div style="text-align: left; padding: 0 1rem;">
           <p><strong>Number:</strong> ${mobileNumber}</p>
           <p><strong>Operator:</strong> ${operatorName}</p>
           <hr/>
           <p>Amount: ₹${plan.amount}</p>
           <p>Service Fee: ₹${totalCommissions.toFixed(2)}</p>
           <h4>Total: ₹${totalAmount.toFixed(2)}</h4>
        </div>
      `,
      icon: "question",
      confirmButtonText: "Pay Now",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await initiateRazorpayPayment(
          plan,
          totalAmount,
          employeeCommission,
          companyCommission,
          agentCommission
        );
      }
    });
  };

  // 🔹 7. Razorpay Logic
  const initiateRazorpayPayment = async (
    plan: any,
    totalAmount: number,
    empComm: number,
    compComm: number,
    agentComm: number
  ) => {
    try {
      setLoading(true);

      const orderRes = await api.post("/payment/razorpay-order", {
        amount: totalAmount,
        mobile_number: mobileNumber,
        operator: operatorName || "Not Selected",
        plan_amount: plan.amount,
        employee_commission: empComm,
        company_commission: compComm,
        agent_commission: agentComm,
      });

      const { order_id, currency } = orderRes.data;

      const options = {
        key: "rzp_test_v9bZpQvmrVnUzZ", // Replace with real Key ID in production
        order_id: order_id,
        amount: totalAmount * 100,
        currency: currency,
        name: "Recharge Service",
        description: `Payment for ${mobileNumber}`,
        handler: async (response: any) => {
          try {
            const verifyRes = await api.post("/payment/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              mobile_number: mobileNumber,
              operator_code: operatorCode,
              operator: operatorName || "Not Selected",
              amount: totalAmount,
              plan_amount: plan.amount,
            });

            if (verifyRes.data?.recharge_call?.ok) {
              Swal.fire("Success", "Recharge Successful!", "success");
            } else {
              Swal.fire("Processing", "Payment accepted. Recharge is processing.", "info");
            }
            setShowModal(false);
          } catch (e) {
            Swal.fire("Error", "Payment verification failed", "error");
          }
        },
        prefill: {
          email: auth.user?.email || "",
          contact: mobileNumber,
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment initialization failed", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Filter Plans in Modal
  const filteredPlans =
    activeTab && categorizedPlans[activeTab]
      ? categorizedPlans[activeTab].filter(
          (plan) =>
            plan.amount.toString().includes(searchTerm) ||
            plan.data.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  // CSS Styles
  const toggleStyles = `
    .recharge-toggle { display: flex; justify-content: flex-start; gap: 15px; margin-bottom: 1.5rem; }
    .toggle-btn {
        padding: 10px 25px;
        border-radius: 30px;
        border: 1px solid #dee2e6;
        background: white;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 600;
        color: #6c757d;
    }
    .toggle-btn:hover {
        background: #f8f9fa;
    }
    .toggle-btn.active {
        background-color: indigo;
        color: white;
        border-color: indigo;
        box-shadow: 0 4px 6px rgba(75, 0, 130, 0.2);
    }
    .modal-body-scroll { max-height: 60vh; overflow-y: auto; }
    .form-section-card {
        background: #fff;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        border: 1px solid #f0f0f0;
    }
  `;

  return (
    <div className="container py-5">
      <style>{toggleStyles}</style>
      {/* SPLIT LAYOUT: LEFT FORM | RIGHT IMAGE */}
      <div className="row align-items-center mt-4">
        
        {/* LEFT SIDE: FORM */}
        <div className="col-12 col-lg-6 mb-5 mb-lg-0">
          <div className="p-lg-4">
            <h2 className="fw-bold mb-3 text-dark">Mobile Recharge</h2>
            <p className="text-muted mb-4">Secure and fast prepaid & postpaid recharges.</p>

            {/* Type Selection Toggle */}
            <div className="recharge-toggle">
              <button
                className={`toggle-btn ${rechargeType === "prepaid" ? "active" : ""}`}
                onClick={() => setRechargeType("prepaid")}
              >
                Prepaid
              </button>
              <button
                className={`toggle-btn ${rechargeType === "postpaid" ? "active" : ""}`}
                onClick={() => setRechargeType("postpaid")}
              >
                Postpaid
              </button>
            </div>

            {/* Main Form Card */}
            <div className="form-section-card p-4">
              <div className="row g-3">
                {/* Mobile Input */}
                <div className="col-12">
                  <label className="form-label text-muted small fw-bold">
                    Mobile Number
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">+91</span>
                    <input
                      type="text"
                      placeholder="Enter 10-digit Mobile Number"
                      className="form-control form-control-lg border-start-0 ps-0"
                      value={mobileNumber}
                      onChange={(e) => {
                          const val = e.target.value.replace(/\D/g,''); // Only numbers
                          if(val.length <= 10) setMobileNumber(val);
                      }}
                      maxLength={10}
                    />
                  </div>
                </div>

                {/* Operator Selection Dropdown */}
                <div className="col-12">
                  <label className="form-label text-muted small fw-bold">
                    Operator
                  </label>
                  <select
                    className="form-select form-control-lg"
                    value={operatorCode}
                    onChange={(e) => {
                      const selectedOp = allOperators.find(
                        (op) => op.id === e.target.value
                      );
                      setOperatorCode(e.target.value);
                      setOperatorName(selectedOp ? selectedOp.name : null);
                    }}
                  >
                    <option value="">Select Operator</option>
                    {filteredOperators.map((op) => (
                      <option key={op.id} value={op.id}>
                        {op.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Circle Selection (for Prepaid) */}
                {rechargeType === "prepaid" && (
                  <div className="col-12">
                    <label className="form-label text-muted small fw-bold">
                      Circle
                    </label>
                    <select
                      className="form-select form-control-lg"
                      value={circleCode}
                      onChange={(e) => setCircleCode(e.target.value)}
                    >
                      <option value="">Select Circle</option>
                      {circleData.map((c) => (
                        <option key={c.id + c.name} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Action Buttons / Amount Field */}
                {rechargeType === "prepaid" ? (
                  <div className="col-12 mt-4">
                    <button
                      className="btn fw-bold w-100 py-3 rounded-pill shadow-sm"
                      style={{backgroundColor: 'indigo', color: 'white'}}
                      onClick={handleFetchPlansClick}
                      disabled={loading}
                    >
                      {loading ? (
                        <span><i className="fas fa-spinner fa-spin me-2"></i>Fetching...</span>
                      ) : (
                        "Browse Plans"
                      )}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="col-12">
                      <label className="form-label text-muted small fw-bold">
                        Bill Amount
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">₹</span>
                        <input
                          type="number"
                          placeholder="Enter Amount"
                          className="form-control form-control-lg"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <button
                        className="btn fw-bold w-100 py-3 rounded-pill shadow-sm"
                        style={{backgroundColor: 'indigo', color: 'white'}}
                        onClick={handleManualPayment}
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Proceed to Pay"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: IMAGE */}
        <div className="col-12 col-lg-6 d-none d-md-block text-center">
           {/* You can replace this URL with your own asset */}
           <img 
             src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1685547805~exp=1685548405~hmac=93e08f4c1b7528783145603565424603037" 
             alt="Recharge Illustration" 
             className="img-fluid"
             style={{ maxHeight: '500px', objectFit: 'contain' }}
           />
        </div>
      </div>

      {/* PLANS MODAL (Only for Prepaid) */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Browse Plans - {operatorName}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* Search */}
              <div className="p-3 bg-light">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for plan amount or details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Tabs */}
              {Object.keys(categorizedPlans).length > 0 && (
                <div className="plans-nav border-bottom">
                  <ul className="nav nav-tabs nav-fill">
                    {Object.keys(categorizedPlans).map((cat) => (
                      <li className="nav-item" key={cat}>
                        <button
                          className={`nav-link ${
                            activeTab === cat ? "active" : ""
                          }`}
                          onClick={() => setActiveTab(cat)}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="modal-body modal-body-scroll p-0">
                {error ? (
                  <div className="p-5 text-center text-danger">
                    <h4>{error}</h4>
                    <p>
                      Try selecting a different operator or checking the number.
                    </p>
                  </div>
                ) : (
                  <div className="p-3">
                    {filteredPlans.length > 0 ? (
                      filteredPlans.map((plan) => (
                        <div
                          key={plan.id}
                          className="d-flex flex-column flex-md-row justify-content-between align-items-center border p-3 mb-2 rounded hover-bg-light"
                        >
                          <div className="mb-2 mb-md-0">
                            <h5 className="mb-1 text-primary">
                              <span style={{color: 'indigo'}}>₹{plan.amount}</span>
                            </h5>
                            <div className="small text-muted">
                              <strong>Validity:</strong> {plan.validity}
                            </div>
                            <p
                              className="mb-0 small text-secondary"
                              style={{ maxWidth: "500px" }}
                            >
                              {plan.data}
                            </p>
                          </div>
                          <button
                            className="btn btn-sm px-4 rounded-pill"
                            style={{borderColor: 'indigo', color: 'indigo'}}
                            onClick={() => handleRecharge(plan)}
                          >
                            Select
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-5 text-muted">
                        No plans match your search.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <WorkingSectionThree />
    </div>
  );
};

export default RechargePage;