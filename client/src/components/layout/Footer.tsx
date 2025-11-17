import React from 'react';
import { Link } from 'react-router-dom';
import { mainNavLinks } from '../Navbar'; // Import the navigation data

const FooterStyles = () => (
  <style>
    {`
      .footer-section {
        background-color: #1A222E;
        color: #adb5bd;
        padding: 60px 0 0;
      }
      .footer-section .footer-logo {
        margin-bottom: 20px;
        max-width: 150px;
      }
      .footer-section p {
        font-size: 0.9rem;
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
        background-color: #E15D67;
      }
      .footer-links {
        list-style: none;
        padding-left: 0;
      }
      .footer-links li {
        margin-bottom: 10px;
      }
      .footer-links a {
        color: #adb5bd;
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
        background-color: #2c3440;
        color: #ffffff;
        margin-right: 10px;
        transition: background-color 0.3s, transform 0.3s;
      }
      .social-icons a:hover {
        background-color: #E15D67;
        transform: translateY(-3px);
      }
      .footer-bottom {
        background-color: #111821;
        padding: 20px 0;
        margin-top: 40px;
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
            {/* About Section */}
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <Link to="/">
                <img src="assets/img/logo/logo.png" alt="logo" className="footer-logo" />
              </Link>
              <p>
                Your one-stop solution for seamless mobile recharges, bill payments, and secure money transfers. We are committed to providing a fast, secure, and reliable service.
              </p>
            </div>

            {/* Dynamically Generated Navigation Links */}
            {mainNavLinks.slice(0, 2).map((navGroup) => (
              // We only want to show dropdowns in the footer columns
              navGroup.type === 'dropdown' && (
                <div key={navGroup.label} className="col-lg-2 col-md-3 col-sm-6 mb-4 mb-lg-0">
                  <div className="footer-links-wrapper">
                    <h5>{navGroup.label}</h5>
                    <ul className="footer-links">
                      {navGroup.submenu?.slice(0, 6).map((link) => ( // Limit to 6 items per column
                        <li key={link.label}>
                          <Link to={link.href}>{link.label.split('(')[0].trim()}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            ))}

            {/* Social Media */}
            <div className="col-lg-3 col-md-6">
              <h5>Follow Us</h5>
              <p>Stay connected with us on social media for the latest updates and offers.</p>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom text-center">
          <div className="container">
            <p className="mb-0 text-white">
              &copy; {new Date().getFullYear()} Calzone Pay. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;