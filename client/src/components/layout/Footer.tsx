import React from 'react';
import { Link } from 'react-router-dom';
import { mainNavLinks } from '../Navbar'; // Import the navigation data

const FooterStyles = () => (
  <style>
    {`
      .footer-section {
        background-color: var(--bs-primary);
        color: rgba(255, 255, 255, 0.7);
        padding: 60px 0 0;
      }
      .footer-section .footer-logo {
        margin-bottom: 20px;
        max-width: 150px;
      }
      .footer-section p {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.8);
      }
      .footer-section h5 {
        color: #ffffff;
        font-weight: 600;
        margin-bottom: 20px;
        position: relative;
        padding-bottom: 10px;
      }
      .footer-section h5::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 40px;
        height: 2px;
        background-color: rgba(255, 255, 255, 0.2);
      }
      .footer-links {
        list-style: none;
        padding-left: 0;
      }
      .footer-links li {
        margin-bottom: 10px;
      }
      .footer-links a {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        transition: color 0.3s, padding-left 0.3s;
      }
      .footer-links a:hover {
        color: #ffffff;
        padding-left: 5px;
      }
      .social-icons a {
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.1);
        color: #ffffff;
        margin-right: 10px;
        transition: background-color 0.3s, transform 0.3s;
      }
      .social-icons a:hover {
        background-color: #ffffff;
        color: var(--bs-primary);
        transform: translateY(-3px);
      }
      .footer-bottom {
        background-color: var(--secondary-color); /* A darker shade of indigo */
        padding: 20px 0;
        margin-top: 50px;
        font-size: 0.85rem;
      }
    `}
  </style>
);

const Footer: React.FC = () => {
  return (
    <>
      <FooterStyles />
      <footer className="footer-section">
        <div className="container">
          <div className="row">
            {/* About & Social Section */}
            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
              <Link to="/">
                <h4 style={{ color: 'white', fontWeight: 'bold' }}>Calzone<span style={{ fontWeight: 'normal' }}>Pay</span></h4>
              </Link>
              <p>
                Your one-stop solution for seamless mobile recharges, bill payments, and secure money transfers. We are committed to providing a fast, secure, and reliable service.
              </p>
              <h5 className="mt-4">Follow Us</h5>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>

            {/* Dynamically Generated Navigation Links */}
            {mainNavLinks.map((navGroup) => (
              navGroup.type === 'dropdown' && (
                <div key={navGroup.label} className="col-lg col-md-4 col-sm-6 mb-4 mb-lg-0">
                  <h5>{navGroup.label}</h5>
                  <ul className="footer-links">
                    {navGroup.submenu?.map((link) => (
                      <li key={link.label}>
                        <Link to={link.href}>{link.label.split('(')[0].trim()}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom text-center">
          <div className="container">
            <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              &copy; {new Date().getFullYear()} Calzone Pay. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;