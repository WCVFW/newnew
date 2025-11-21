import React, { useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import WorkingSectionThree from "../../components/WorkingSectionThree";

// --- DTH Operator Data ---
const dthOperators = [
  { name: "Tata Play (Tata Sky)", id: "32", code: "TATASKY" },
  { name: "Dish TV", id: "31", code: "DISHTV" },
  { name: "Sun Direct", id: "33", code: "SUNDIRECT" },
  { name: "Videocon D2H", id: "34", code: "VIDEOCON" },
  { name: "Airtel Digital TV", id: "36", code: "AIRTEL" },
];

const DTHRechargePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [dthPlans, setDthPlans] = useState<Record<string, any[]>>({});
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalError, setModalError] = useState<string | null>(null);

  // Form States
  const [operator, setOperator] = useState("");
  const [subscriberId, setSubscriberId] = useState("");
  const [amount, setAmount] = useState("");

  const { auth } = useAuth();
  const navigate = useNavigate();

  // 🔹 Handle Browse Plans
  const handleBrowsePlans = async () => {
    if (!operator) {
      Swal.fire("Operator Required", "Please select your DTH Operator first.", "warning");
      return;
    }

    setLoading(true);
    setModalError(null);

    try {
      const response = await api.get(`/dth-plans/${operator}`);
      const plansData = response.data;

      if (!plansData || (typeof plansData === "object" && "error" in plansData)) {
        setModalError(plansData.error || "No plans found for this operator.");
        setDthPlans({});
      } else {
        const processedPlans: Record<string, any[]> = {};

        for (const category in plansData) {
          if (Object.prototype.hasOwnProperty.call(plansData, category)) {
            const categoryData = plansData[category];
            if (Array.isArray(categoryData)) {
              processedPlans[category] = categoryData.map(
                (plan: any, i: number) => ({
                  id: `${category}-${i}`,
                  amount: Number(plan.rs ?? plan.amount ?? plan.price ?? 0),
                  validity: plan.validity ?? plan.validity_period ?? "N/A",
                  data: plan.desc ?? plan.description ?? "N/A",
                })
              );
            }
          }
        }
        setDthPlans(processedPlans);
        if (Object.keys(processedPlans).length > 0) {
          setActiveTab(Object.keys(processedPlans)[0]);
        } else {
          setModalError("No plan categories found.");
        }
      }
    } catch (err: any) {
      console.error("Failed to fetch DTH plans:", err);
      setModalError("Could not fetch plans. Please try again.");
      setDthPlans({});
    } finally {
      setLoading(false);
      setShowPlansModal(true);
    }
  };

  // 🔹 Handle Payment
  const handlePayment = async () => {
    if (!subscriberId) {
      Swal.fire("Invalid Input", "Please enter your Subscriber ID / VC Number.", "error");
      return;
    }
    if (!operator) {
      Swal.fire("Operator Required", "Please select your DTH Operator.", "warning");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      Swal.fire("Invalid Amount", "Please enter a valid recharge amount.", "error");
      return;
    }

    if (!auth.user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to proceed with recharge.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {
            state: { from: { pathname: "/dth-recharge" } },
          });
        }
      });
      return;
    }

    setLoading(true);
    const selectedOp = dthOperators.find((op) => op.id === operator);

    try {
      // You can pass hardcoded commissions here if you want to test specific values
      // Example: { amount, api_commission: 2, agent_commission: 1, company_commission: 1 }
      const feesRes = await api.post("/payment/calculate-fees", { amount });
      const {
        planAmount,
        agentCommission,
        companyCommission,
        apiCommission,
        totalAmount,
      } = feesRes.data;

      Swal.fire({
        title: "Confirm Recharge",
        html: `
          <div style="text-align: left; padding: 0 1rem;">
             <p><strong>Subscriber ID:</strong> ${subscriberId}</p>
             <p><strong>Operator:</strong> ${selectedOp?.name}</p>
             <hr/>
             <p>Recharge Amount: ₹${planAmount.toFixed(2)}</p>
             <p>Processing Fees: ₹${(agentCommission + companyCommission + apiCommission).toFixed(2)}</p>
             <h4 class="text-primary">Total Payable: ₹${totalAmount.toFixed(2)}</h4>
          </div>
        `,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Pay Now",
        confirmButtonColor: "#0d6efd",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await initiateRazorpay(
            selectedOp?.code || "",
            planAmount,
            totalAmount,
            selectedOp?.name || "DTH",
            { agentCommission, companyCommission, apiCommission }
          );
        }
      });
    } catch (err) {
      console.error("Fee calculation failed:", err);
      Swal.fire("Error", "Could not calculate fees. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Razorpay Logic
  const initiateRazorpay = async (
    operatorCode: string,
    planAmount: number,
    totalAmount: number,
    operatorName: string,
    commissions: {
      agentCommission: number;
      companyCommission: number;
      apiCommission: number;
    }
  ) => {
    try {
      setLoading(true);

      const orderRes = await api.post("/payment/razorpay-order", {
        amount: Math.round(totalAmount * 100), // Convert Total Amount to paise
        mobile_number: subscriberId,
        operator: operatorName,
        plan_amount: planAmount, // Original Plan Amount
        service_type: "DTH",
        agent_commission: commissions.agentCommission,
        company_commission: commissions.companyCommission,
        api_commission: commissions.apiCommission,
      });

      const { order_id, currency } = orderRes.data;

      const options = {
        key: "rzp_test_v9bZpQvmrVnUzZ", // Replace with valid Key
        order_id: order_id,
        amount: totalAmount * 100,
        currency: currency,
        name: "DTH Recharge",
        description: `Recharge for ${subscriberId}`,
        handler: async (response: any) => {
          try {
            const verifyRes = await api.post("/payment/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              mobile_number: subscriberId,
              operator_code: operatorCode,
              operator: operatorName,
              plan_amount: planAmount,
              amount: totalAmount, // Add the missing total amount field
              agent_commission: commissions.agentCommission,
              company_commission: commissions.companyCommission,
              api_commission: commissions.apiCommission
            });

            if (verifyRes.data?.recharge_call?.ok) {
              Swal.fire("Success", "DTH Recharge Successful!", "success");
              setAmount("");
              setSubscriberId("");
              setOperator("");
            } else {
              console.warn("Recharge Response:", verifyRes.data);
              Swal.fire(
                "Processing",
                "Payment accepted. Recharge is processing.",
                "info"
              );
            }
          } catch (e) {
            console.error(e);
            Swal.fire("Error", "Payment verification failed", "error");
          }
        },
        prefill: {
          email: auth.user?.email || "",
          contact: auth.user?.mobile || "",
        },
        theme: { color: "indigo" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not initiate payment. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Filter Plans
  const filteredPlans =
    activeTab && dthPlans[activeTab]
      ? dthPlans[activeTab].filter(
          (plan) =>
            plan.amount.toString().includes(searchTerm) ||
            plan.data.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  // CSS Styles
  const styles = `
    .form-section-card { background: #fff; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.08); padding: 2.5rem; border: 1px solid #f1f1f1; }
    .hero-image { max-width: 100%; height: auto; border-radius: 20px; animation: float 6s ease-in-out infinite; }
    .feature-card { background: white; border-radius: 12px; padding: 2rem; text-align: center; border: 1px solid #eef0f2; transition: all 0.3s ease; }
    .feature-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); border-color: #0d6efd; }
    .feature-icon { font-size: 2.5rem; color: indigo; margin-bottom: 1rem; }
    .step-circle { width: 60px; height: 60px; background: #e7f1ff; color: #0d6efd; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; margin: 0 auto 1rem auto; }
    .operator-card { border: 1px solid #dee2e6; border-radius: 10px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.2s; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; }
    .operator-card:hover { border-color: indigo; background-color: #f8f9fa; }
    .faq-section { background: #f8f9fa; padding: 60px 0; margin-top: 60px; }
    .accordion-button:not(.collapsed) { color: indigo; background-color: #e8eaf6; }
    .promo-banner { background: linear-gradient(90deg, indigo 0%, #3f51b5 100%); color: white; border-radius: 15px; padding: 3rem; margin: 4rem 0; position: relative; overflow: hidden; }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        {/* --- HERO SECTION --- */}
        <div className="row align-items-center mb-5" style={{ marginTop: "50px" }}>
          <div className="col-12 col-lg-6 mb-5 mb-lg-0">
            <h1 className="display-5 fw-bold mb-2 text-dark">DTH Recharge</h1>
            <p className="lead text-muted mb-4">
              Never miss your favorite shows. Recharge Dish TV, Tata Play,
              Airtel, and more instantly.
            </p>
            <div className="form-section-card">
              <div className="row g-4">
                <div className="col-12">
                  <label className="form-label fw-bold text-muted small">
                    Select Operator
                  </label>
                  <select
                    className="form-select form-select-lg"
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                  >
                    <option value="">Choose your provider...</option>
                    {dthOperators.map((op) => (
                      <option key={op.id} value={op.id}>
                        {op.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold text-muted small">
                    Subscriber ID / VC Number
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-secondary">
                      <i className="fas fa-id-card"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="e.g. 1023456789"
                      value={subscriberId}
                      onChange={(e) => setSubscriberId(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold text-muted small">
                    Amount
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-secondary">
                      ₹
                    </span>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      placeholder="Enter Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleBrowsePlans}
                      disabled={loading}
                    >
                      {loading && !showPlansModal ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        "Browse Plans"
                      )}
                    </button>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <button
                    className="btn w-100 py-3 fw-bold rounded-pill shadow"
                    style={{
                      backgroundColor: "var(--bs-primary)",
                      color: "white",
                    }}
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading && !showPlansModal ? (
                      <span>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Processing...
                      </span>
                    ) : (
                      "Proceed to Recharge"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 text-center">
            <img
              src="https://img.freepik.com/free-vector/family-watching-tv-living-room_74855-5335.jpg"
              alt="DTH Entertainment"
              className="hero-image"
              style={{ maxHeight: "450px" }}
            />
          </div>
        </div>

        {/* --- OPERATORS GRID --- */}
        <div className="mb-5">
          <h4 className="fw-bold text-center mb-4">Supported Operators</h4>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3">
            {dthOperators.map((op) => (
              <div className="col" key={op.id}>
                <div
                  className={`operator-card ${
                    operator === op.id ? "border-primary bg-light" : ""
                  }`}
                  onClick={() => setOperator(op.id)}
                >
                  <i className="fas fa-satellite-dish fa-2x mb-2 text-secondary"></i>
                  <h6 className="mb-0 small fw-bold">{op.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- WHY CHOOSE US --- */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="feature-card">
              <i className="fas fa-bolt feature-icon"></i>
              <h5 className="fw-bold">Instant Activation</h5>
              <p className="text-muted small">
                Your plan activates within seconds of successful payment.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <i className="fas fa-shield-alt feature-icon"></i>
              <h5 className="fw-bold">100% Secure</h5>
              <p className="text-muted small">
                We use bank-grade encryption to ensure your payment details
                remain safe.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <i className="fas fa-gift feature-icon"></i>
              <h5 className="fw-bold">Rewards & Offers</h5>
              <p className="text-muted small">
                Earn scratch cards and cashback on every 3rd recharge you make.
              </p>
            </div>
          </div>
        </div>

        {/* --- FAQ SECTION --- */}
        <section className="faq-section">
          <div className="container">
            <h2 className="text-center fw-bold mb-5">
              Frequently Asked Questions
            </h2>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="accordion" id="dthFaq">
                  <div className="accordion-item border-0 shadow-sm mb-3 rounded overflow-hidden">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq1"
                      >
                        Where can I find my Subscriber ID?
                      </button>
                    </h2>
                    <div
                      id="faq1"
                      className="accordion-collapse collapse"
                      data-bs-parent="#dthFaq"
                    >
                      <div className="accordion-body text-muted">
                        Press the <strong>Home</strong> or <strong>Menu</strong>{" "}
                        button on your remote. Your Subscriber ID/VC Number is
                        usually displayed at the bottom of the menu screen.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border-0 shadow-sm mb-3 rounded overflow-hidden">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq2"
                      >
                        How long does it take for channels to activate?
                      </button>
                    </h2>
                    <div
                      id="faq2"
                      className="accordion-collapse collapse"
                      data-bs-parent="#dthFaq"
                    >
                      <div className="accordion-body text-muted">
                        Recharges are typically instant. If your channels don't
                        resume within 5 minutes, try keeping your Set-Top Box
                        on.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WorkingSectionThree />

        {/* --- PLANS MODAL --- */}
        {showPlansModal && (
          <div
            className="modal fade show"
            style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Browse DTH Plans</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowPlansModal(false)}
                  ></button>
                </div>
                <div className="p-3 bg-light">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for plan amount or details..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {Object.keys(dthPlans).length > 0 && (
                  <div className="plans-nav border-bottom">
                    <ul className="nav nav-tabs nav-fill">
                      {Object.keys(dthPlans).map((cat) => (
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
                <div
                  className="modal-body"
                  style={{ maxHeight: "60vh", overflowY: "auto" }}
                >
                  {modalError ? (
                    <div className="p-5 text-center text-danger">
                      <h4>{modalError}</h4>
                    </div>
                  ) : (
                    <div className="p-3">
                      {filteredPlans.length > 0 ? (
                        filteredPlans.map((plan) => (
                          <div
                            key={plan.id}
                            className="d-flex flex-column flex-md-row justify-content-between align-items-center border p-3 mb-2 rounded"
                          >
                            <div className="mb-2 mb-md-0">
                              <h5 className="mb-1 text-primary">
                                <span style={{ color: "var(--bs-primary)" }}>
                                  ₹{plan.amount}
                                </span>
                              </h5>
                              <p
                                className="mb-0 small text-secondary"
                                style={{ maxWidth: "500px" }}
                              >
                                {plan.data}
                              </p>
                            </div>
                            <button
                              className="btn btn-sm px-4 rounded-pill"
                              style={{
                                borderColor: "var(--bs-primary)",
                                color: "var(--bs-primary)",
                              }}
                              onClick={() => {
                                setAmount(String(plan.amount));
                                setShowPlansModal(false);
                              }}
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
      </div>
    </>
  );
};

export default DTHRechargePage;