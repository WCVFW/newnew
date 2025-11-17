import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaBook, FaLifeRing } from 'react-icons/fa';

const ApiSupportPage: React.FC = () => {
  return (
    <section className="pt-120 pb-120 bg-light">
      <div className="container">
        <div className="section__header section__center wow fadeInDown">
          <h2>API Support</h2>
          <p>Dedicated support for our developers and B2B partners.</p>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 text-center p-4 shadow-sm">
              <FaBook size={40} className="mx-auto text-primary mb-3" />
              <div className="card-body">
                <h5 className="card-title">Read the Docs</h5>
                <p className="card-text">
                  Most questions can be answered by our comprehensive API documentation.
                </p>
                <Link to="/b2b/api-docs" className="btn btn-primary cmn__btn">
                  Go to API Docs
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 text-center p-4 shadow-sm">
              <FaEnvelope size={40} className="mx-auto text-success mb-3" />
              <div className="card-body">
                <h5 className="card-title">Email Support</h5>
                <p className="card-text">
                  For technical issues, integration help, or partnership inquiries.
                </p>
                <a href="mailto:api.support@calzonepay.com" className="btn btn-success">
                  api.support@calzonepay.com
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 text-center p-4 shadow-sm">
              <FaLifeRing size={40} className="mx-auto text-danger mb-3" />
              <div className="card-body">
                <h5 className="card-title">Urgent Issues</h5>
                <p className="card-text">
                  For critical system outages or security-related concerns.
                </p>
                <a href="mailto:emergency@calzonepay.com" className="btn btn-danger">
                  Contact Emergency Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiSupportPage;