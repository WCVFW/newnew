import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

const RetailerLoginPage: React.FC = () => {
  const [retailerId, setRetailerId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement retailer login logic
    console.log('Logging in with:', { retailerId, password });
  };

  return (
    <section className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', background: '#f4f7f6' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold">Retailer Login</h3>
                  <p className="text-muted">Access your retailer dashboard</p>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="retailerId"
                      placeholder="Retailer ID"
                      value={retailerId}
                      onChange={(e) => setRetailerId(e.target.value)}
                      required
                    />
                    <label htmlFor="retailerId">Retailer ID</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary cmn__btn btn-lg">
                      Login
                    </button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <Link to="/b2b/create-retailer" className="small">Not a retailer? Register here</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetailerLoginPage;