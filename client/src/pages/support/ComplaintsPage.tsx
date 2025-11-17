import React from 'react';
import { Link } from 'react-router-dom';

const ComplaintsPage: React.FC = () => {
  return (
    <section className="pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section__header section__center wow fadeInDown">
              <h2>Grievance Redressal</h2>
              <p>We are committed to resolving your issues in a fair and timely manner.</p>
            </div>
            <div className="card shadow-sm mb-4">
              <div className="card-body p-4">
                <h5 className="card-title">Level 1: Customer Support</h5>
                <p>
                  For any initial complaints or issues, please raise a support ticket. Our team aims to resolve all tickets within 48 hours.
                </p>
                <Link to="/support/raise-ticket" className="btn btn-primary cmn__btn">
                  Raise a Ticket
                </Link>
              </div>
            </div>
            <div className="card shadow-sm mb-4">
              <div className="card-body p-4">
                <h5 className="card-title">Level 2: Grievance Officer</h5>
                <p>
                  If you are not satisfied with the resolution from our customer support team, you can escalate the issue to our Grievance Officer. Please include your original ticket number in the email.
                </p>
                <p><strong>Email:</strong> <a href="mailto:grievance@calzonepay.com">grievance@calzonepay.com</a></p>
                <p>We will acknowledge your complaint within 24 hours and provide a final resolution within 15 business days.</p>
              </div>
            </div>
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h5 className="card-title">Level 3: Nodal Officer</h5>
                <p>
                  If your issue remains unresolved, you may contact our Nodal Officer.
                </p>
                <p><strong>Email:</strong> <a href="mailto:nodal.officer@calzonepay.com">nodal.officer@calzonepay.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplaintsPage;