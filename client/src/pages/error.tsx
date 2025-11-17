import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <section className="error__section d-flex justify-content-center pt-5 mt-4">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-7">
            <div className="error__content">
              <img src="assets/img/signup/error.png" className="error__thumb mb-4" alt="error" style={{ maxWidth: '350px' }} />
              <h2 className="mb-3">
                Oops! Page Not Found
              </h2>
              <p className="lead text-muted">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>
              <Link to="/" className="cmn__btn">
                <span>
                  Back to home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;