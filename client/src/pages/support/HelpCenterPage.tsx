import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBook, FaCreditCard, FaQuestionCircle } from 'react-icons/fa';

const HelpCenterPage: React.FC = () => {
  return (
    <section className="pt-120 pb-120 bg-light">
      <div className="container">
        <div className="section__header section__center wow fadeInDown mb-5">
          <h2>Help Center</h2>
          <p>How can we help you today?</p>
        </div>
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="input-group input-group-lg shadow-sm">
              <input type="text" className="form-control" placeholder="Search for answers..." aria-label="Search Help Center" />
              <button className="btn btn-primary cmn__btn" type="button"><FaSearch className="me-2" /> Search</button>
            </div>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 text-center p-4 shadow-sm border-0">
              <FaBook size={40} className="mx-auto text-primary mb-3" />
              <div className="card-body">
                <h5 className="card-title">Getting Started</h5>
                <p className="card-text">Learn the basics of creating an account, KYC, and more.</p>
                <Link to="#" className="btn btn-outline-primary mt-3">View Articles</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 text-center p-4 shadow-sm border-0">
              <FaCreditCard size={40} className="mx-auto text-success mb-3" />
              <div className="card-body">
                <h5 className="card-title">Payments & Recharges</h5>
                <p className="card-text">Find solutions for payment failures, pending recharges, and refunds.</p>
                <Link to="#" className="btn btn-outline-success mt-3">View Articles</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 text-center p-4 shadow-sm border-0">
              <FaQuestionCircle size={40} className="mx-auto text-info mb-3" />
              <div className="card-body">
                <h5 className="card-title">Account & Profile</h5>
                <p className="card-text">Manage your profile, password, and security settings.</p>
                <Link to="#" className="btn btn-outline-info mt-3">View Articles</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpCenterPage;