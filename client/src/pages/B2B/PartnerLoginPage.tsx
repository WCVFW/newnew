import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PartnerLoginPage: React.FC = () => {
  const [partnerId, setPartnerId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement partner login logic
    console.log('Logging in with:', { partnerId, password });
  };

  return (
    <section className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', background: '#f4f7f6' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold">Partner Login</h3>
                  <p className="text-muted">Access your partner portal</p>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="partnerId"
                      placeholder="Partner ID"
                      value={partnerId}
                      onChange={(e) => setPartnerId(e.target.value)}
                      required
                    />
                    <label htmlFor="partnerId">Partner ID</label>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLoginPage;