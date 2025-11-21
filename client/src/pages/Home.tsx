import React from "react";
import { Link } from "react-router-dom";

// Centralized style constants for easier maintenance and consistency
const styleConstants = {
  primaryColor: '#2D1E64',
  primaryText: { color: '#2D1E64' },
  primaryButton: { backgroundColor: '#2D1E64', color: 'white' },
};

const Home: React.FC = () => {
  return (
    <>
<div 
  className="main-banner wow fadeIn" 
  id="top" 
  data-wow-duration="1s" 
  data-wow-delay="0.5s"
  style={{ paddingTop: '100px' }}>
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="left-content header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                <h6>Welcome to Calzone Pay</h6>
                <h2>All Your <em style={styleConstants.primaryText}>Payments</em> &amp; <span style={styleConstants.primaryText}>Bookings</span> In One Place</h2>
                <p>Calzone Pay offers a seamless and secure way to handle all your payments. From mobile recharges to bill payments and ticket bookings, we've got you covered.</p>
                <form id="search" action="#" method="GET"> 
 <fieldset>
 <input type="text" name="mobile" className="email" placeholder="Enter Mobile Number..." autoComplete="on" required />
                  </fieldset>
                  <fieldset>
                    <button type="submit" className="main-button" style={styleConstants.primaryButton}>Recharge Now</button>
                  </fieldset>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                <img src="homeassests/images/banner-right-image.png" alt="Mobile payments illustration"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="about" className="about-us section">
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="left-image wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
            <img src="homeassests/images/digital-payments-main.png" alt="Digital Payments Showcase"/>
          </div>
        </div>
        <div className="col-lg-8 align-self-center">
          <div className="services">
            <div className="row">
              <div className="col-lg-6">
                <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                  <div className="icon">
                    <img src="homeassests/images/icon-recharge-indigo.png" alt="Mobile Recharge Icon"/>
                  </div>
                  <div className="right-text">
                    <h4>Quick Recharges</h4>
                    <p>Top up your mobile or DTH in seconds. Never miss a moment.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.7s">
                  <div className="icon">
                    <img src="homeassests/images/icon-bill-pay-indigo.png" alt="Bill Payment Icon"/>
                  </div>
                  <div className="right-text">
                    <h4>Bill Payments</h4>
                    <p>Handle all utility bills—electricity, water, gas—in one place. Simple and timely.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.9s">
                  <div className="icon">
                    <img src="homeassests/images/icon-booking-indigo.png" alt="Ticket Booking Icon"/>
                  </div>
                  <div className="right-text">
                    <h4>Ticket Booking</h4>
                    <p>Plan your journey effortlessly. Book bus, train, and flight tickets with ease.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="1.1s">
                  <div className="icon">
                    <img src="homeassests/images/icon-transfer-indigo.png" alt="Money Transfer Icon"/>
                  </div>
                  <div className="right-text">
                    <h4>Money Transfer</h4>
                    <p>Transfer funds to any bank account, anytime, with top-tier security.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="services" className="our-services section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 align-self-center  wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.2s">
          <div className="left-image">
            <img src="homeassests/images/services-left-image.png" alt=""/>
          </div>
        </div>
        <div className="col-lg-6 wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.2s">
          <div className="section-heading">
            <h2>Simplify your life with our <em style={styleConstants.primaryText}>Digital</em> services &amp; <span style={styleConstants.primaryText}>Payment</span> Solutions</h2>
            <p>Calzone Pay is designed to make your financial transactions easier and more convenient. We are committed to providing a secure and reliable platform for all your digital payment needs.</p>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="first-bar progress-skill-bar">
                <h4>Mobile Recharge</h4>
                <span style={styleConstants.primaryText}>95%</span>
                <div className="filled-bar" style={{ backgroundColor: styleConstants.primaryColor }}></div>
                <div className="full-bar"></div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="second-bar progress-skill-bar">
                <h4>Bill Payments</h4>
                <span style={styleConstants.primaryText}>92%</span>
                <div className="filled-bar" style={{ backgroundColor: styleConstants.primaryColor }}></div>
                <div className="full-bar"></div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="third-bar progress-skill-bar">
                <h4>User Satisfaction</h4>
                <span style={styleConstants.primaryText}>94%</span>
                <div className="filled-bar" style={{ backgroundColor: styleConstants.primaryColor }}></div>
                <div className="full-bar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="portfolio" className="our-portfolio section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="section-heading  wow bounceIn" data-wow-duration="1s" data-wow-delay="0.2s">
            <h2>Discover Our Core <em style={styleConstants.primaryText}>Services</em> &amp; What We <span style={styleConstants.primaryText}>Provide</span></h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-sm-6">
          <a href="#">
            <div className="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.3s">
              <div className="hidden-content">
                <h4>Mobile & DTH Recharge</h4>
                <p>Instant recharges for all major operators across the country.</p>
              </div>
              <div className="showed-content">
                <img src="homeassests/images/portfolio-image.png" alt=""/>
              </div>
            </div>
          </a>
        </div>
        <div className="col-lg-3 col-sm-6">
          <a href="#">
            <div className="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.4s">
              <div className="hidden-content">
                <h4>Utility Bill Payments</h4>
                <p>Pay electricity, water, gas, broadband and other bills easily.</p>
              </div>
              <div className="showed-content">
                <img src="homeassests/images/portfolio-image.png" alt=""/>
              </div>
            </div>
          </a>
        </div>
        <div className="col-lg-3 col-sm-6">
          <a href="#">
            <div className="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.5s">
              <div className="hidden-content">
                <h4>Travel Ticket Booking</h4>
                <p>Book your bus, train, and flight tickets conveniently.</p>
              </div>
              <div className="showed-content">
                <img src="homeassests/images/portfolio-image.png" alt=""/>
              </div>
            </div>
          </a>
        </div>
        <div className="col-lg-3 col-sm-6">
          <a href="#">
            <div className="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.6s">
              <div className="hidden-content">
                <h4>Secure Money Transfer</h4>
                <p>Transfer money to any bank account, 24/7, with top-notch security.</p>
              </div>
              <div className="showed-content">
                <img src="homeassests/images/portfolio-image.png" alt=""/>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div id="blog" className="our-blog section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.25s">
          <div className="section-heading">
            <h2>Check Out Our <em style={styleConstants.primaryText}>Offers</em> & The Latest <span style={{color: 'indigo'}}>Updates</span></h2>
          </div>
        </div>
        <div className="col-lg-6 wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.25s">
          <div className="top-dec">
            <img src="homeassests/images/blog-dec.png" alt=""/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.25s">
          <div className="left-image">
            <a href="#"><img src="homeassests/images/big-blog-thumb.jpg" alt="Workspace Desktop"/></a>
            <div className="info">
              <div className="inner-content">
                <ul>
                  <li><i className="fa fa-calendar"></i> 15 Oct 2023</li>
                  <li><i className="fa fa-users"></i> Calzone Pay</li>
                  <li><i className="fa fa-folder"></i> Offers</li>
                </ul>
                <a href="#"><h4>Festive Season Cashback Offers</h4></a>
                <p>Get exciting cashback on recharges and bill payments this festive season. Limited time offer, grab it now!</p>
                <div className="main-blue-button">
                  <a href="#" style={styleConstants.primaryButton}>Discover More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.25s">
          <div className="right-list">
            <ul>
              <li>
                <div className="left-content align-self-center">
                  <span><i className="fa fa-calendar"></i> 12 Oct 2023</span>
                  <a href="#"><h4>Simplified Ticket Booking Interface</h4></a>
                  <p>We've updated our app to make booking travel tickets even easier...</p>
                </div>
                <div className="right-image">
                  <a href="#"><img src="homeassests/images/blog-thumb-01.jpg" alt=""/></a>
                </div>
              </li>
              <li>
                <div className="left-content align-self-center">
                  <span><i className="fa fa-calendar"></i> 05 Oct 2023</span>
                  <a href="#"><h4>Introducing UPI Lite for Faster Payments</h4></a>
                  <p>Experience lightning-fast payments for small transactions with UPI Lite...</p>
                </div>
                <div className="right-image">
                  <a href="#"><img src="homeassests/images/blog-thumb-01.jpg" alt=""/></a>
                </div>
              </li>
              <li>
                <div className="left-content align-self-center">
                  <span><i className="fa fa-calendar"></i> 01 Oct 2023</span>
                  <a href="#"><h4>Enhanced Security for Money Transfers</h4></a>
                  <p>Your security is our priority. We've added new layers of protection...</p>
                </div>
                <div className="right-image">
                  <a href="#"><img src="homeassests/images/blog-thumb-01.jpg" alt=""/></a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="contact" className="contact-us section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 align-self-center wow fadeInLeft" data-wow-duration="0.5s" data-wow-delay="0.25s">
          <div className="section-heading">
            <h2>Feel Free To Send Us a Message With Your Questions or Feedback</h2>
            <p>We value your input. Whether you have a question about our services or feedback for improvement, we're here to listen.</p>
            <div className="phone-info">
              <h4>For any enquiry, Call Us: <span><i className="fa fa-phone"></i> <a href="#">010-020-0340</a></span></h4>
            </div>
          </div>
        </div>
        <div className="col-lg-6 wow fadeInRight" data-wow-duration="0.5s" data-wow-delay="0.25s">
          <form id="contact" action="" method="post">
            <div className="row">
              <div className="col-lg-6">
                <fieldset>
                  <input type="name" name="name" id="name" placeholder="Name" autoComplete="on" required />
                </fieldset>
              </div>
              <div className="col-lg-6">
                <fieldset>
                  <input type="surname" name="surname" id="surname" placeholder="Surname" autoComplete="on" required />
                </fieldset>
              </div>
              <div className="col-lg-12">
                <fieldset>
                  <input type="text" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your Email" required />
                </fieldset>
              </div>
              <div className="col-lg-12">
                <fieldset>
                  <textarea name="message" className="form-control" id="message" placeholder="Message" required></textarea>  
                </fieldset>
              </div>
              <div className="col-lg-12">
                <fieldset>
                  <button type="submit" id="form-submit" className="main-button " style={styleConstants.primaryButton}>Send Message</button>
                </fieldset>
              </div>
            </div>
            <div className="contact-dec">
              <img src="homeassests/images/contact-decoration.png" alt=""/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
    </>
  );
};

export default Home;