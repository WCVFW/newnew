import React from "react";
import { FaHotel, FaCalendarAlt, FaUserFriends } from "react-icons/fa";

const HotelPage: React.FC = () => {
  return (
    <>
<section className="hotel__booksection">
   {/* <header className="header-section">
      <div className="container">
         <div className="header-wrapper">
            <div className="logo-menu">
               <a href="index.html" className="logo">
                  <img src="assets/img/logo/logo.png" alt="logo"/>
               </a>
               <a href="index.html" className="small__logo d-xl-none">
                  <img src="assets/img/logo/favicon.png" alt="logo"/>
               </a>
            </div>
            <div className="menu__right__components d-flex align-items-center">
               <div className="sigup__grp d-lg-none">
               <a href="signin.html" className="cmn__btn outline__btn">
                  <span>
                     Signin
                  </span>
               </a>
               <a href="signup.html" className="cmn__btn">
                  <span>
                     Signup
                  </span>
               </a>
            </div>
               <div className="header-bar d-lg-none">
                  <span></span>
                  <span></span>
                  <span></span>
               </div>
            </div>
            <ul className="main-menu">
            <li className="grid__style">
               <a href="javascript:void(0)" className="d-flex">
                  <span>
                     Home 
                  </span>
                   <span className="icons">
                      <i className="material-symbols-outlined">
                         expand_more
                      </i>
                   </span>
                </a>
               <ul className="sub-menu">
                  <li className="subtwohober">
                     <a href="javascript:void(0)" className="d-flex align-items-center justify-content-between">
                        <span className="text">
                           Recharge & Bill Payment
                        </span>
                        <span className="icon">
                           <i className="material-symbols-outlined">
                              add
                           </i>
                        </span>  
                     </a>
                     <ul className="sub-two">
                        <li className="subtwohober">
                           <a href="index.html">Recharge & Bill Payment [1]</a>
                        </li>
                        <li>
                           <a href="index-2.html">Recharge & Bill Payment [2]</a>
                        </li>
                        <li>
                           <a href="index-3.html">Recharge & Bill Payment [3]</a>
                        </li>
                     </ul>
                  </li>
                  <li className="subtwohober">
                     <a href="javascript:void(0)" className="d-flex align-items-center justify-content-between">
                        <span className="text">
                           Booking Landing
                        </span>
                        <span className="icon">
                           <i className="material-symbols-outlined">
                              add
                           </i>
                        </span>  
                     </a>
                     <ul className="sub-two">
                        <li>
                           <a href="booking-landing1.html">
                              Booking Landing [1]
                           </a>
                        </li>
                        <li>
                           <a href="booking-landing2.html">
                              Booking Landing [2]
                           </a>
                        </li>
                        <li>
                           <a href="booking-landing3.html">
                              Booking Landing [3]
                           </a>
                        </li>
                     </ul>
                  </li>
                  <li className="subtwohober">
                     <a href="hotel-book.html">Hotel Booking</a>
                  </li>
                  <li>
                     <a href="flight-book.html">Flight Booking</a>
                  </li>
                  <li>
                     <a href="train-book.html">Train Booking</a>
                  </li>
                  <li>
                     <a href="bus-book.html">Bus Booking</a>
                  </li>
                  <li>
                     <a href="cars-book.html">Car Booking</a>
                  </li>
               </ul>
            </li>
            <li className="grid__style">
               <a href="javascript:void(0)" className="d-flex">
                  <span>
                     Recharge & Bill Payment 
                  </span>
                   <span className="icons">
                      <i className="material-symbols-outlined">
                         expand_more
                      </i>
                   </span>
                </a>
               <ul className="sub-menu submenu__recharge">
                  <li className="subtwohober">
                     <a href="index.html">Recharge & Bill Payment [1]</a>
                  </li>
                  <li>
                     <a href="index-2.html">Recharge & Bill Payment [2]</a>
                  </li>
                  <li>
                     <a href="index-3.html">Recharge & Bill Payment [3]</a>
                  </li>
                  <li>
                     <a href="mobile3.html">Mobile</a>
                  </li>
                  <li>
                     <a href="card.html">Card</a>
                  </li>
                  <li>
                     <a href="broadband.html">Broadband</a>
                  </li>
                  <li>
                     <a href="landline.html">Landline</a>
                  </li>
                  <li>
                     <a href="cabletv.html">Cable Tv</a>
                  </li>
                  <li>
                     <a href="electricity.html">Electricity</a>
                  </li>
                  <li>
                     <a href="gas.html">Gas</a>
                  </li>
                  <li>
                     <a href="water.html">Water</a>
                  </li>
               </ul>
            </li>
            <li>
               <a href="javascript:void(0)" className="d-flex">
                 <span>
                     Booking 
                 </span>
                  <span className="icons">
                     <i className="material-symbols-outlined">
                        expand_more
                     </i>
                  </span>
               </a>
               <ul className="sub-menu submenu__booking">
                  <li className="d subtwohober">
                     <a href="javascript:void(0)">
                        <span className="fz-18 dtext d-block fw-700 lato">
                           Hotel
                        </span>
                     </a>
                     <a href="hotel-book.html">
                        Hotel Booking
                     </a>
                     <a href="hotel-list.html">
                        Hotel List
                     </a>
                     <a href="hotel-grid.html">
                        Hotel Grid
                     </a>
                     <a href="hotel-details.html">
                        Hotel Details
                     </a>
                     <a href="hotel-details-confirm.html">
                        Confirm Details
                     </a>
                     <a href="hotel-payment.html">
                        Payment
                     </a>
                     <a href="hotel-invoice.html">
                        Invoice
                     </a>
                     <a href="hotel-email.html">
                        Email Template
                     </a>
                  </li>
                  <li className="d">
                     <a href="javascript:void(0)">
                        <span className="fz-18 dtext d-block fw-700 lato">
                           Flight
                        </span>
                     </a>
                     <a href="flight-book.html">
                        Flights Booking
                     </a>
                     <a href="flight-round.html">
                        Flights One Way
                     </a>
                     <a href="flight-oneway.html">
                        Flights Round Trip
                     </a>
                     <a href="flight-confirm-details.html">
                        Confirm Details
                     </a>
                     <a href="flight-payment.html">
                        Flight Payment
                     </a>
                     <a href="flight-invoice.html">
                        Flight Invoice
                     </a>
                     <a href="flight-email.html">
                        Flight Email Template
                     </a>
                  </li>
                  <li className="d">
                     <a href="javascript:void(0)">
                        <span className="fz-18 dtext d-block fw-700 lato">
                           Train
                        </span>
                     </a>
                     <a href="train-book.html">
                        Train Booking
                     </a>
                     <a href="train-list.html">
                        Train List
                     </a>
                     <a href="train-grid.html">
                        Train Grid
                     </a>
                     <a href="train-oneway.html">
                        Train Round Trip
                     </a>
                     <a href="train-bookingsystem.html">
                        Booking System
                     </a>
                     <a href="train-confirm-details.html">
                        Confirm Details
                     </a>
                     <a href="train-payment.html">
                        Train Payment
                     </a>
                     <a href="train-invocie.html">
                        Train Invoice
                     </a>
                     <a href="train-email.html">
                        Train Email Template
                     </a>
                  </li>
                  <li className="d">
                     <a href="javascript:void(0)">
                        <span className="fz-18 dtext d-block fw-700 lato">
                           Bus
                        </span>
                     </a>
                     <a href="bus-book.html">
                        Bus Booking
                     </a>
                     <a href="bus-list.html">
                        Bus List
                     </a>
                     <a href="bus-oneway.html">
                        Round Trip
                     </a>
                     <a href="bus-bookingsystem.html">
                        Bus Booking System
                     </a>
                     <a href="bus-confirm-details.html">
                        Confirm Details
                     </a>
                     <a href="bus-payment.html">
                        Bus Payment
                     </a>
                     <a href="bus-invocie.html">
                        Bus Invoice
                     </a>
                     <a href="bus-email.html">
                        Bus Email Template
                     </a>
                  </li>
                  <li className="d">
                     <a href="javascript:void(0)">
                        <span className="fz-18 dtext d-block fw-700 lato">
                           Car
                        </span>
                     </a>
                     <a href="cars-book.html">
                        Car Booking
                     </a>
                     <a href="car-list.html">
                        Car List
                     </a>
                     <a href="car-grid.html">
                        Car Grid
                     </a>
                     <a href="car-confirm-details.html">
                        Confirm Details
                     </a>
                     <a href="car-payment.html">
                        Car Payment
                     </a>
                     <a href="car-invocie.html">
                        Car Invoice
                     </a>
                     <a href="car-email.html">
                        Car Email Template
                     </a>
                  </li>
               </ul>
            </li>
            <li className="grid__style">
               <a href="javascript:void(0)" className="d-flex">
                  <span>
                     Blog 
                  </span>
                   <span className="icons">
                      <i className="material-symbols-outlined">
                         expand_more
                      </i>
                   </span>
                </a>
               <ul className="sub-menu">
                  <li className="subtwohober">
                     <a href="blog-list.html">Blog List</a>
                  </li>
                  <li><a href="blog-grid.html">Blog Grid</a></li>
                  <li><a href="blog-details.html">Blog Details</a></li>
               </ul>
            </li>
            <li className="grid__style">
               <a href="javascript:void(0)" className="d-flex">
                  <span>
                     Pages 
                  </span>
                   <span className="icons">
                      <i className="material-symbols-outlined">
                         expand_more
                      </i>
                   </span>
                </a>
               <ul className="sub-menu">
                  <li className="subtwohober">
                     <a href="javascript:void(0)" className="d-flex align-items-center justify-content-between">
                        <span className="text">
                           About
                        </span>
                        <span className="icon">
                           <i className="material-symbols-outlined">
                              add
                           </i>
                        </span>  
                     </a>
                     <ul className="sub-two">
                        <li>
                           <a href="about.html">
                              About us
                           </a>
                        </li>
                        <li>
                           <a href="chat-us.html">
                              Chat us
                           </a>
                        </li>
                        <li>
                           <a href="favourites.html">
                              Favorites
                           </a>
                        </li>
                        <li>
                           <a href="help.html">
                              Help page
                           </a>
                        </li>
                     </ul>
                  </li>
                  <li className="subtwohober">
                     <a href="javascript:void(0)" className="d-flex align-items-center justify-content-between">
                        <span className="text">
                           Support
                        </span>
                        <span className="icon">
                           <i className="material-symbols-outlined">
                              add
                           </i>
                        </span>  
                     </a>
                     <ul className="sub-two">
                        <li>
                           <a href="help-support.html">
                             Support
                           </a>
                        </li>
                        <li>
                           <a href="help-knowledge.html">
                              Support Knowledge
                           </a>
                        </li>
                        <li>
                           <a href="help-knowledge-details.html">
                              Support Details
                           </a>
                        </li>
                        <li>
                           <a href="video-tutorial.html">
                              Support Tutorial
                           </a>
                        </li>
                        <li>
                           <a href="submit-ticket.html">
                              Submit Ticket
                           </a>
                        </li>
                     </ul>
                  </li>
                  <li className="subtwohober">
                     <a href="javascript:void(0)" className="d-flex align-items-center justify-content-between">
                        <span className="text">
                           My Profile
                        </span>
                        <span className="icon">
                           <i className="material-symbols-outlined">
                              add
                           </i>
                        </span>  
                     </a>
                     <ul className="sub-two">
                        <li>
                           <a href="personal-information.html">
                             Personal info
                           </a>
                        </li>
                        <li>
                           <a href="login-security.html">
                              Login Security
                           </a>
                        </li>
                        <li>
                           <a href="favourites.html">
                              Favourites
                           </a>
                        </li>
                        <li>
                           <a href="transaction.html">
                              Transaction
                           </a>
                        </li>
                        <li>
                           <a href="password-change.html">
                              Change Password
                           </a>
                        </li>
                        <li>
                           <a href="notification.html">
                              Notification
                           </a>
                        </li>
                     </ul>
                  </li>
                  <li className="subtwohober">
                     <a href="javascript:void(0)" className="d-flex align-items-center justify-content-between">
                        <span className="text">
                           Signup & Register
                        </span>
                        <span className="icon">
                           <i className="material-symbols-outlined">
                              add
                           </i>
                        </span>  
                     </a>
                     <ul className="sub-two">
                        <li>
                           <a href="signup.html">
                             Signup Register
                           </a>
                        </li>
                        <li>
                           <a href="password.html">
                              Password Change
                           </a>
                        </li>
                        <li>
                           <a href="number-toreach.html">
                              Signup Number 
                           </a>
                        </li>
                        <li>
                           <a href="varified-number.html">
                              Varified Number 
                           </a>
                        </li>
                        <li>
                           <a href="signin.html">
                              Sign in 
                           </a>
                        </li>
                     </ul>
                  </li>
                  <li><a href="faq.html">Faq Page</a></li>
                  <li><a href="contact.html">Contact</a></li>
                  <li><a href="error.html">404</a></li>
               </ul>
            </li>
            <li>
               <a href="javascript:void(0)" className="d-flex">
                 <span>
                     Elements 
                 </span>
                  <span className="icons">
                     <i className="material-symbols-outlined">
                        expand_more
                     </i>
                  </span>
               </a>
               <ul className="sub-menu submenu__element">
                  <li className="subtwohober">
                     <a href="typography.html" className="d-lg-none">Typography</a>
                     <a href="typography.html" className="mh__img">
                        Typography
                     </a>
                  </li>
                  <li>
                     <a href="blocks-home.html" className="d-lg-none">Banner</a>
                     <a href="blocks-home.html" className="mh__img">
                        Banner
                     </a>
                  </li>
                  <li>
                     <a href="blocks-allblocks.html" className="d-lg-none">All Blocks</a>
                     <a href="blocks-allblocks.html" className="mh__img">
                        All Blocks
                     </a>
                  </li>
                  <li>
                     <a href="blocks-ordersystem.html" className="d-lg-none">Order System</a>
                     <a href="blocks-ordersystem.html" className="mh__img">
                        Order System
                     </a>
                  </li>
                  <li>
                     <a href="blocks-about.html" className="d-lg-none">About & Refer</a>
                     <a href="blocks-about.html" className="mh__img">
                        About & Refer
                     </a>
                  </li>
                  <li>
                     <a href="blocks-list.html" className="d-lg-none">Page List</a>
                     <a href="blocks-list.html" className="mh__img">
                        Page List
                     </a>
                  </li>
                  <li className="subtwohober">
                     <a href="blocks-grid.html" className="d-lg-none">Page Grid</a>
                     <a href="blocks-grid.html" className="mh__img">
                        Page Grid
                     </a>
                  </li>
                  <li>
                     <a href="blocks-invoice.html" className="d-lg-none">Invoice/Email</a>
                     <a href="blocks-invoice.html" className="mh__img">
                        Invoice/Email
                     </a>
                  </li>
                  <li>
                     <a href="blocks-signin.html" className="d-lg-none">Sigin/sigup</a>
                     <a href="blocks-signin.html" className="mh__img">
                        Sigin/sigup
                     </a>
                  </li>
                  <li>
                     <a href="blocks-confirm-details.html" className="d-lg-none">Confirm Details</a>
                     <a href="blocks-confirm-details.html" className="mh__img">
                        Confirm Details
                     </a>
                  </li>
                  <li>
                     <a href="blocks-payments.html" className="d-lg-none">Payment System</a>
                     <a href="blocks-payments.html" className="mh__img">
                        Payment System
                     </a>
                  </li>
                  <li>
                     <a href="successful.html" className="d-lg-none">Successful</a>
                     <a href="successful.html" className="mh__img">
                        Successful
                     </a>
                  </li>
                  <li>
                     <a href="blocks-personalinfo.html" className="d-lg-none">Personal Info</a>
                     <a href="blocks-personalinfo.html" className="mh__img">
                        Personal Info
                     </a>
                  </li>
                  <li>
                     <a href="blocks-testimonial.html" className="d-lg-none">Testimonial</a>
                     <a href="blocks-testimonial.html" className="mh__img">
                        Testimonial
                     </a>
                  </li>
                  <li>
                     <a href="blocks-faqs.html" className="d-lg-none">Faq</a>
                     <a href="blocks-faqs.html" className="mh__img">
                        Faq
                     </a>
                  </li>
                  <li>
                     <a href="blocks-support.html" className="d-lg-none">Support</a>
                     <a href="blocks-support.html" className="mh__img">
                        Support
                     </a>
                  </li>
                  <li>
                     <a href="blocks-contact.html" className="d-lg-none">Contact Us</a>
                     <a href="blocks-contact.html" className="mh__img">
                        Contact Us
                     </a>
                  </li>
                  <li>
                     <a href="blocks-error.html" className="d-lg-none">Error</a>
                     <a href="blocks-error.html" className="mh__img">
                        Error
                     </a>
                  </li>
               </ul>
            </li>
            <li className="sigup__grp d-lg-none d-flex align-items-center">
               <a href="signin.html" className="cmn__btn outline__btn">
                  <span>
                     Signin
                  </span>
               </a>
               <a href="signup.html" className="cmn__btn">
                  <span>
                     Signup
                  </span>
               </a>
            </li>
         </ul>
         <div className="sigin__grp d-flex align-items-center">
            <a href="signin.html" className="cmn__btn outline__btn">
               <span>
                  Signin
               </span>
            </a>
            <a href="signup.html" className="cmn__btn">
               <span>
                  Signup
               </span>
            </a>
         </div>
         </div>
      </div>
   </header> */}
   <div className="container">
      <div className="row">
         <div className="col-xxl-6 col-xl-7 col-lg-8">
            <div className="hotel__content">
               <h1 className="wow fadeInDown" data-wow-duration="2s">
                  Great discounts on hotels around the world
               </h1>
               <p className="wow fadeInUp" data-wow-duration="2s">
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration...
               </p>
               <div className="cmn__grp">
                  <a href="hotel-list.html" className="cmn__btn">
                     <span>
                        Explore deals
                     </span>
                  </a>
                  <a href="about.html" className="cmn__btn outline__btn">
                     <span>
                        About us
                     </span>
                  </a>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<div className="hotelbokking__categoris">
   <div className="container">
      <div className="hotelbooking__categoris__wrap">
         <div className="dating__body">
            <h5 className="hoteltitle"> 
               Book Domestic and isternational Hotels
            </h5>
            <div className="dating__body__box mb__30">
               <div className="dating__item dating__hidden">
                  <input type="text" placeholder="Enter Locality City"/>
               </div>
               <div className="dating__item dating__hidden">
                  <div id="datepicker" className="input-group date" data-date-format="dd-mm-yyyy">
                     <input className="form-control" type="text" placeholder="Check in" readOnly/>
                     <span className="calendaricon">
                        <i className="material-symbols-outlined">
                           calendar_month
                        </i>
                     </span>
                     <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                  </div>
               </div>
               <div className="dating__item dating__hidden">
                  <div id="datepicker2" className="input-group date" data-date-format="dd-mm-yyyy">
                     <input className="form-control" type="text" placeholder="Check Out" readOnly/>
                     <span className="calendaricon">
                        <i className="material-symbols-outlined">
                           calendar_month
                        </i>
                     </span>
                     <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                  </div>
               </div>
               <div className="dating__item dating__inetial select__border">
                  <select name="room">
                     <option value="1">
                        Room
                     </option>
                     <option value="2">
                        Single Room
                     </option>
                     <option value="3">
                        Dobble Room
                     </option>
                  </select>
               </div>
               <div className="dating__item">
                  <button type="submit" className="cmn__btn">
                     <span>
                        Search Hotels
                     </span>
                  </button>
               </div>
            </div>
            <div className="boock__check">
               <input className="form-check-input" type="checkbox" value="" id="bcheckbok"/>
               <label className="form-check-label" htmlFor="bcheckbok">
                  I Agree support terms & condition
               </label>
            </div>
         </div>
      </div>
   </div>
</div>

<section className="hotel__bookslider1 pb-120">
   <div className="container">
      <div className="row">
         <div className="col-xxl-6 col-xl-7 col-lg-7 wow fadeInDown">
            <div className="section__header pb__60">
               <h2>
                  Popular Destinations
               </h2>
               <p>
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
               </p>
            </div>
         </div>
      </div>
      <div className="row g-4 wow fadeInUp">
         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6">
            <div className="hurray__hoteltabs">
               <div className="nav nav-tabshur" id="nav-tabeurope" role="tablist">
                  <button className="nav-link active" id="nav-home-tabeurope" data-bs-toggle="tab" data-bs-target="#nav-homeeurope" type="button" role="tab" aria-controls="nav-homeeurope" aria-selected="true">
                     01.  Asia Pacific
                  </button>
                  <button className="nav-link" id="nav-profile-tabeurope" data-bs-toggle="tab" data-bs-target="#nav-profileeurope" type="button" role="tab" aria-controls="nav-profileeurope" aria-selected="false">
                     02. The America
                  </button>
                  <button className="nav-link" id="nav-contact-tabeurope" data-bs-toggle="tab" data-bs-target="#nav-contacteurope" type="button" role="tab" aria-controls="nav-contacteurope" aria-selected="false">
                     03. Europe
                  </button>
                  <button className="nav-link" id="nav-home-tabafrica" data-bs-toggle="tab" data-bs-target="#nav-homeafrica" type="button" role="tab" aria-controls="nav-homeafrica" aria-selected="true">
                     04. Middle East
                  </button>
                  <button className="nav-link" id="nav-profile-tabafrica" data-bs-toggle="tab" data-bs-target="#nav-profileafrica" type="button" role="tab" aria-controls="nav-profileafrica" aria-selected="false">
                     05. Africa
                  </button>
                  <button className="nav-link" id="nav-contact-tabafrica" data-bs-toggle="tab" data-bs-target="#nav-contactafrica" type="button" role="tab" aria-controls="nav-contactafrica" aria-selected="false">
                     06. Australia
                  </button>
               </div>
            </div>
         </div>
         <div className="col-xxl-9 col-xl-9 col-lg-9">
            <div className="tab-content" id="nav-tabContent">
               <div className="tab-pane fade show active" id="nav-homeeurope" role="tabpanel" aria-labelledby="nav-home-tabeurope">
                  <div className="hurray__hotel1 owl-theme owl-carousel">
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/booking/tokyo.png" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Tokyo
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/booking/mumbai.png" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                             Mumbai
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/booking/dhaka.png" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Dhaka
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/booking/mumbai.png" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hungary
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/booking/dhaka.png" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Thailad
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/booking/tokyo.png" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hungary
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                  </div>
               </div>
               <div className="tab-pane fade" id="nav-profileeurope" role="tabpanel" aria-labelledby="nav-profile-tabeurope">
                  <div className="hurray__hotel1 owl-theme owl-carousel">
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps1.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hurry up!
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps2.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                             Thailand
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps3.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              United Kingdom
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps4.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hungary
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps2.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Thailad
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps4.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hungary
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                  </div>
               </div>
               <div className="tab-pane fade" id="nav-contacteurope" role="tabpanel" aria-labelledby="nav-contact-tabeurope">
                  <div className="hurray__hotel1 owl-theme owl-carousel">
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps1.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hurry up!
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps2.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                             Thailand
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps3.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              United Kingdom
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps4.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hungary
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps2.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Thailad
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps4.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hungary
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                  </div>
               </div>
               <div className="tab-pane fade" id="nav-homeafrica" role="tabpanel" aria-labelledby="nav-home-tabafrica">
                  <div className="hurray__hotel1 owl-theme owl-carousel">
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps1.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hurry up!
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps2.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                             Thailand
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps3.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              United Kingdom
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps4.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hungary
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps2.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Thailad
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps4.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hungary
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                  </div>
               </div>
               <div className="tab-pane fade" id="nav-profileafrica" role="tabpanel" aria-labelledby="nav-profile-tabafrica">
                  <div className="hurray__hotel1 owl-theme owl-carousel">
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps1.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hurry up!
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps2.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                             Thailand
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps3.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              United Kingdom
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps4.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hungary
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps2.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Thailad
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps4.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hungary
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                  </div>
               </div>
               <div className="tab-pane fade" id="nav-contactafrica" role="tabpanel" aria-labelledby="nav-contact-tabafrica">
                  <div className="hurray__hotel1 owl-theme owl-carousel">
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps1.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hurry up!
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps2.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                             Thailand
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps3.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              United Kingdom
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps4.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hungary
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps2.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Thailad
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                     <a href="hotel-list.html" className="hurray__offer">
                        <div className="thumb">
                           <img src="assets/img/slider/ps4.jpg" alt="img"/>
                        </div>
                        <span className="country__select">
                           <span>
                              Hungary
                           </span>
                           <span className="icon">
                              <i className="material-symbols-outlined">
                                 chevron_right
                              </i>
                           </span>
                        </span>
                     </a>
                  </div>
               </div>
             </div>
         </div>
      </div>
   </div>
</section>
<section className="customer__seection bgsection pt-120 pb-120">
   <div className="container">
      <div className="row align-items-center justify-content-between flex-row-reverse">
         <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-7">
            <div className="customer__content">
               <div className="section__header pb__40 wow fadeInDown">
                  <h2>
                     We provide best service to all our customers
                  </h2>
                  <p className="hoteltext">
                     Our Hotel has been present for over 20 years
                  </p>
                  <p>
                     There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing...
                  </p>
               </div>
               <div className="customer wow fadeInUp">
                  <div className="thumb">
                     <img src="assets/img/customer/wilson.png" alt="img"/>
                  </div>
                  <div className="content">
                     <h5>
                        Jenny Wilson
                     </h5>
                     <span>
                        CEO
                     </span>
                  </div>
               </div>
               <div className="signeture fadeInDown">
                  <img src="assets/img/customer/signeture.png" alt="img"/>
               </div>
            </div>
         </div>
         <div className="col-xxl-5 col-xl-6 col-lg-6 col-md-5">
            <div className="customer__thumb">
               <img src="assets/img/customer/customer.png" alt="img"/>
               <div className="rounttop wow fadeInDown" data-wow-duration="2s">
                  <img src="assets/img/customer/customertop.png" alt="img"/>
               </div>
               <div className="rountbottom wow fadeInUp" data-wow-duration="2s">
                  <img src="assets/img/customer/customerbottom.png" alt="img"/>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<section className="roomsuites__section pt-120 pb-120">
   <div className="container">
      <div className="section__header section__center pb__60 wow fadeInDown">
         <h2>
            Rooms & Suites
         </h2>
         <p className="max600">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
         </p>
      </div>
      <div className="row g-4">
         <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 wow fadeInDown" data-wow-duration="1.8s">
            <div className="rooms">
               <div className="row g-4">
                  <div className="col-xl-12 col-lg-12">
                     <div className="rooms__items">
                        <img src="assets/img/room/largbed1.jpg" alt="img"/>
                        <div className="content__wrap">
                           <div className="content">
                              <h6>
                                 $100/Night
                              </h6>
                              <h4>
                                 <a href="hotel-list.html">
                                    Single Bed Room
                                 </a>
                              </h4>
                           </div>
                        </div>
                        <a href="https://www.youtube.com/watch?v=ypVYsNZJKTg" className="video video-btn">
                           <i className="material-symbols-outlined">
                              play_circle
                           </i>
                        </a>
                     </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                     <div className="rooms__items">
                        <img src="assets/img/room/sing1.jpg" alt="img"/>
                        <div className="content__wrap">
                           <div className="content">
                              <h6>
                                 $300/Night
                              </h6>
                              <h4>
                                 <a href="hotel-list.html">
                                    Double Bed
                                 </a>
                              </h4>
                           </div>
                        </div>
                        <a href="https://www.youtube.com/watch?v=ypVYsNZJKTg" className="video video-btn">
                           <i className="material-symbols-outlined">
                              play_circle
                           </i>
                        </a>
                     </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                     <div className="rooms__items">
                        <img src="assets/img/room/sing2.jpg" alt="img"/>
                        <div className="content__wrap">
                           <div className="content">
                              <h6>
                                 $300/Night
                              </h6>
                              <h4>
                                 <a href="hotel-list.html">
                                    Family Room
                                 </a>
                              </h4>
                           </div>
                        </div>
                        <a href="https://www.youtube.com/watch?v=ypVYsNZJKTg" className="video video-btn">
                           <i className="material-symbols-outlined">
                              play_circle
                           </i>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="2.2s">
            <div className="rooms">
               <div className="row g-4">
                  <div className="col-xl-6 col-lg-6">
                     <div className="rooms__items">
                        <img src="assets/img/room/single3.jpg" alt="img"/>
                        <div className="content__wrap">
                           <div className="content">
                              <h6>
                                 $300/Night
                              </h6>
                              <h4>
                                 <a href="hotel-list.html">
                                    Double bed
                                 </a>
                              </h4>
                           </div>
                        </div>
                        <a href="https://www.youtube.com/watch?v=ypVYsNZJKTg" className="video video-btn">
                           <i className="material-symbols-outlined">
                              play_circle
                           </i>
                        </a>
                     </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                     <div className="rooms__items">
                        <img src="assets/img/room/single4.jpg" alt="img"/>
                        <div className="content__wrap">
                           <div className="content">
                              <h6>
                                 $100/Night
                              </h6>
                              <h4>
                                 <a href="hotel-list.html">
                                    Single Bed
                                 </a>
                              </h4>
                           </div>
                        </div>
                        <a href="https://www.youtube.com/watch?v=ypVYsNZJKTg" className="video video-btn">
                           <i className="material-symbols-outlined">
                              play_circle
                           </i>
                        </a>
                     </div>
                  </div>
                  <div className="col-xl-12 col-lg-12">
                     <div className="rooms__items">
                        <img src="assets/img/room/largibed2.jpg" alt="img"/>
                        <div className="content__wrap">
                           <div className="content">
                              <h6>
                                 $700/Night
                              </h6>
                              <h4>
                                 <a href="hotel-list.html">
                                    Lusury Be Room
                                 </a>
                              </h4>
                           </div>
                        </div>
                        <a href="https://www.youtube.com/watch?v=ypVYsNZJKTg" className="video video-btn">
                           <i className="material-symbols-outlined">
                              play_circle
                           </i>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<section className="room__samble">
   <div className="container-fluid p-0">
      <div className="row g-0 flex-row-reverse">
         <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="samble__content">
               <div className="content__box">
                  <div className="section__header">
                     <h2>
                        Restaurant Service
                     </h2>
                     <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use
                     </p>
                     <a href="hotel-list.html" className="cmn__btn">
                        <span>
                           Explore deals
                        </span>
                     </a>
                  </div>
               </div>
               <div className="shapesamble">
                  <img src="assets/img/room/shapeflower.png" alt="img"/>
               </div>
            </div>
         </div>
         <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="samble__thumb">
               <img src="assets/img/room/samble1.jpg" alt="img"/>
            </div>
         </div>
      </div>
      <div className="row g-0">
         <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="samble__content">
               <div className="content__box">
                  <div className="section__header">
                     <h2>
                        Restaurant Service
                     </h2>
                     <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use
                     </p>
                     <a href="hotel-list.html" className="cmn__btn">
                        <span>
                           Explore deals
                        </span>
                     </a>
                  </div>
               </div>
               <div className="shapesamble">
                  <img src="assets/img/room/shapeflower.png" alt="img"/>
               </div>
            </div>
         </div>
         <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="samble__thumb">
               <img src="assets/img/room/samble2.jpg" alt="img"/>
            </div>
         </div>
      </div>
   </div>
</section>
<section className="hotel__facilities pt-120 pb-120">
   <div className="container">
      <div className="row justify-content-center"> 
         <div className="col-xxl-6 col-xl-7 col-lg-7 wow fadeInDown">
            <div className="section__header section__center pb__60">
               <h2>
                  Hotel Facilities
               </h2>
               <p>
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
               </p>
            </div>
         </div>
      </div>
      <div className="row g-4">
         <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="1.2s">
            <div className="hotel__facilities__item">
               <div className="head__wrap">
                  <img src="assets/img/room/pickdrop.png" alt="img"/>
                  <h5>
                     <a href="hotel-list.html">
                        Pick up & drop
                     </a>
                  </h5>
               </div>
               <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
               </p>
            </div>
         </div>
         <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="1.6s">
            <div className="hotel__facilities__item">
               <div className="head__wrap">
                  <img src="assets/img/room/prking.png" alt="img"/>
                  <h5>
                     <a href="hotel-list.html">
                        Parking Space
                     </a>
                  </h5>
               </div>
               <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
               </p>
            </div>
         </div>
         <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="1.9s">
            <div className="hotel__facilities__item">
               <div className="head__wrap">
                  <img src="assets/img/room/roomservice.png" alt="img"/>
                  <h5>
                     <a href="hotel-list.html">
                        Rooom Service
                     </a>
                  </h5>
               </div>
               <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
               </p>
            </div>
         </div>
         <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="2.1s">
            <div className="hotel__facilities__item">
               <div className="head__wrap">
                  <img src="assets/img/room/swimming.png" alt="img"/>
                  <h5>
                     <a href="hotel-list.html">
                        Swimming Pool
                     </a>
                  </h5>
               </div>
               <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
               </p>
            </div>
         </div>
         <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="2.2s">
            <div className="hotel__facilities__item">
               <div className="head__wrap">
                  <img src="assets/img/room/internetfibra.png" alt="img"/>
                  <h5>
                     <a href="hotel-list.html">
                        Fibra Internet
                     </a>
                  </h5>
               </div>
               <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
               </p>
            </div>
         </div>
         <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="2.3s">
            <div className="hotel__facilities__item">
               <div className="head__wrap">
                  <img src="assets/img/room/hotbrekfast.png" alt="img"/>
                  <h5>
                     <a href="hotel-list.html">
                        Beakfast
                     </a>
                  </h5>
               </div>
               <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
               </p>
            </div>
         </div>
      </div>
   </div>
</section>
<section className="hotel__swmminrest">
   <div className="container-fluid p-0">
      <div className="row g-0 justify-content-center">
         <div className="col-xxl-5 col-xl-5 col-lg-5">
            <div className="hotelrest__swimming">
               <img src="assets/img/room/swimmingpool.jpg" alt="img"/>
            </div>
         </div>
         <div className="col-xxl-7 col-xl-7 col-lg-7">
            <div className="hotelswimming__slider__bg">
               <div className="resting__swmming row justify-content-center">
                  <div className="col-xxl-8 col-xl-12 col-lg-12">
                     <div className="testimoial__wrap__swimming owl-theme owl-carousel">
                        <div className="testimonial__item">
                           <div className="quotes">
                              <img src="assets/img/testimonial/quote.png" alt="img"/>
                           </div>
                           <span className="said">
                              You said  about us
                           </span>
                           <span className="moment">
                              Unique moments
                           </span>
                           <p className="fz-18 fw-600">
                              “Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
                           </p>
                           <div className="client">
                              <div className="thumb">
                                 <img src="assets/img/testimonial/jenlia.png" alt="img"/>
                              </div>
                              <div className="content">
                                 <h6 className="name">
                                    Jenelia D’suza
                                 </h6>
                                 <span className="desination">
                                    Student
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="testimonial__item">
                           <div className="quotes">
                              <img src="assets/img/testimonial/quote.png" alt="img"/>
                           </div>
                           <span className="said">
                              You said  about us
                           </span>
                           <span className="moment">
                              Amazing Hotel
                           </span>
                           <p className="fz-18 fw-600">
                              “Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
                           </p>
                           <div className="client">
                              <div className="thumb">
                                 <img src="assets/img/room/kriri.png" alt="img"/>
                              </div>
                              <div className="content">
                                 <h6 className="name">
                                    Kriri Lara
                                 </h6>
                                 <span className="desination">
                                    Doctor
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="testimonial__item">
                           <div className="quotes">
                              <img src="assets/img/testimonial/quote.png" alt="img"/>
                           </div>
                           <span className="said">
                              You said  about us
                           </span>
                           <span className="moment">
                              Unique moments
                           </span>
                           <p className="fz-18 fw-600">
                              “Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
                           </p>
                           <div className="client">
                              <div className="thumb">
                                 <img src="assets/img/testimonial/jenlia.png" alt="img"/>
                              </div>
                              <div className="content">
                                 <h6 className="name">
                                    Jenelia D’suza
                                 </h6>
                                 <span className="desination">
                                    Student
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="testimonial__item">
                           <div className="quotes">
                              <img src="assets/img/testimonial/quote.png" alt="img"/>
                           </div>
                           <span className="said">
                              You said  about us
                           </span>
                           <span className="moment">
                              Amazing Hotel
                           </span>
                           <p className="fz-18 fw-600">
                              “Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
                           </p>
                           <div className="client">
                              <div className="thumb">
                                 <img src="assets/img/room/kriri.png" alt="img"/>
                              </div>
                              <div className="content">
                                 <h6 className="name">
                                    Kriri Lara
                                 </h6>
                                 <span className="desination">
                                    Doctor
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="testimonial__item">
                           <div className="quotes">
                              <img src="assets/img/testimonial/quote.png" alt="img"/>
                           </div>
                           <span className="said">
                              You said  about us
                           </span>
                           <span className="moment">
                              Unique moments
                           </span>
                           <p className="fz-18 fw-600">
                              “Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
                           </p>
                           <div className="client">
                              <div className="thumb">
                                 <img src="assets/img/testimonial/jenlia.png" alt="img"/>
                              </div>
                              <div className="content">
                                 <h6 className="name">
                                    Jenelia D’suza
                                 </h6>
                                 <span className="desination">
                                    Student
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="testimonial__item">
                           <div className="quotes">
                              <img src="assets/img/testimonial/quote.png" alt="img"/>
                           </div>
                           <span className="said">
                              You said  about us
                           </span>
                           <span className="moment">
                              Amazing Hotel
                           </span>
                           <p className="fz-18 fw-600">
                              “Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
                           </p>
                           <div className="client">
                              <div className="thumb">
                                 <img src="assets/img/room/kriri.png" alt="img"/>
                              </div>
                              <div className="content">
                                 <h6 className="name">
                                    Kriri Lara
                                 </h6>
                                 <span className="desination">
                                    Doctor
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flower__shape">
                  <img src="assets/img/room/shapeflower.png" alt="img"/>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<section className="hotel__pricing pt-120 pb-120">
   <div className="container">
      <div className="row justify-content-between">
         <div className="col-xxl-6 col-xl-7 col-lg-7">
            <div className="hotel__pricing__wrapper owl-theme owl-carousel">
               <div className="hotel__price__item">
                  <div className="header">
                     <h5>
                        Basic
                     </h5>
                     <h3>
                        <span className="dollar">
                           $
                        </span>
                        29
                        <span className="dollar">
                           .99
                        </span>
                     </h3>
                  </div>
                  <ul className="pricing__list bordert pt__25">
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Food take-way option
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Easy to access door
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Unlimited drinks
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Gym & other equipment
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Support 24/7 online
                        </span>
                     </li>
                  </ul>
                  <a href="signup.html" className="cmn__btn">
                     <span>
                        Make your offer
                     </span>
                  </a>
               </div>
               <div className="hotel__price__item">
                  <div className="header">
                     <h5>
                        Advanced
                     </h5>
                     <h3>
                        <span className="dollar">
                           $
                        </span>
                        99
                        <span className="dollar">
                           .99
                        </span>
                     </h3>
                  </div>
                  <ul className="pricing__list bordert pt__25">
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Food take-way option
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Easy to access door
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Unlimited drinks
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Gym & other equipment
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Support 24/7 online
                        </span>
                     </li>
                  </ul>
                  <a href="signup.html" className="cmn__btn">
                     <span>
                        Make your offer
                     </span>
                  </a>
               </div>
               <div className="hotel__price__item">
                  <div className="header">
                     <h5>
                        Basic
                     </h5>
                     <h3>
                        <span className="dollar">
                           $
                        </span>
                        29
                        <span className="dollar">
                           .99
                        </span>
                     </h3>
                  </div>
                  <ul className="pricing__list bordert pt__25">
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Food take-way option
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Easy to access door
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Unlimited drinks
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Gym & other equipment
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Support 24/7 online
                        </span>
                     </li>
                  </ul>
                  <a href="signup.html" className="cmn__btn">
                     <span>
                        Make your offer
                     </span>
                  </a>
               </div>
               <div className="hotel__price__item">
                  <div className="header">
                     <h5>
                        Advanced
                     </h5>
                     <h3>
                        <span className="dollar">
                           $
                        </span>
                        99
                        <span className="dollar">
                           .99
                        </span>
                     </h3>
                  </div>
                  <ul className="pricing__list pt__25 bordert">
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Food take-way option
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Easy to access door
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Unlimited drinks
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Gym & other equipment
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Support 24/7 online
                        </span>
                     </li>
                  </ul>
                  <a href="signup.html" className="cmn__btn">
                     <span>
                        Make your offer
                     </span>
                  </a>
               </div>
               <div className="hotel__price__item">
                  <div className="header">
                     <h5>
                        Basic
                     </h5>
                     <h3>
                        <span className="dollar">
                           $
                        </span>
                        29
                        <span className="dollar">
                           .99
                        </span>
                     </h3>
                  </div>
                  <ul className="pricing__list pt__25 bordert">
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Food take-way option
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Easy to access door
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Unlimited drinks
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Gym & other equipment
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Support 24/7 online
                        </span>
                     </li>
                  </ul>
                  <a href="signup.html" className="cmn__btn">
                     <span>
                        Make your offer
                     </span>
                  </a>
               </div>
               <div className="hotel__price__item">
                  <div className="header">
                     <h5>
                        Advanced
                     </h5>
                     <h3>
                        <span className="dollar">
                           $
                        </span>
                        99
                        <span className="dollar">
                           .99
                        </span>
                     </h3>
                  </div>
                  <ul className="pricing__list pt__25 bordert">
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Food take-way option
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Easy to access door
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Unlimited drinks
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Gym & other equipment
                        </span>
                     </li>
                     <li>
                        <span className="icon">
                           <img src="assets/img/pricing/check.svg" alt="img"/>
                        </span>
                        <span className="text">
                           Support 24/7 online
                        </span>
                     </li>
                  </ul>
                  <a href="signup.html" className="cmn__btn">
                     <span>
                        Make your offer
                     </span>
                  </a>
               </div>
            </div>
         </div>
         <div className="col-xxl-5 col-xl-5 col-lg-5">
            <div className="hotel__price__content">
               <div className="section__header pb__20 wow fadeInDown wow fadeInDown" data-wow-duration="1.2s">
                  <h2>
                     Hotel Special Pricing plans
                  </h2>
                  <p>
                     There are many variations of passages of Lorem Ipsum available, but the  have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable....
                  </p>
               </div>
               <div className="refer__wrap">
                  <div className="refer__item wow fadeInUp" data-wow-duration="1.2s">
                     <div className="icon">
                        <img src="assets/img/pricing/price.png" alt="img"/>
                     </div>
                     <div className="content">
                        <h5>
                           Flexible Price
                        </h5>
                        <p>There are many variations of passages of Lorem Ipsum...</p>
                     </div>
                  </div>
                  <div className="refer__item wow fadeInUp" data-wow-duration="1.4s">
                     <div className="icon">
                        <img src="assets/img/pricing/calender.png" alt="img"/>
                     </div>
                     <div className="content">
                        <h5>
                           Anytime Discharge
                        </h5>
                        <p>There are many variations of passages of Lorem Ipsum...</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div className="pricing__shap1">
      <img src="assets/img/pricing/pricingshape1.png" alt=""/>
   </div>
   <div className="pricing__shap2">
      <img src="assets/img/pricing/pricingshape2.png" alt=""/>
   </div>
</section>

<section className="question__section__three bgsection pt-120 pb-120">
   <div className="container-fluid p-0">
      <div className="row g-0 justify-content-center">
         <div className="offsetcustom-2 col-xxl-4 col-xl-5 col-lg-9">
            <div className="qustion__content hotel__qustioncontent">
               <div className="section__header pb__40 wow fadeInDown" data-wow-duration="">
                  <h2>
                     If you got questions we have answer
                  </h2>
                  <p>
                     There are many variations of passages of Lorem Ipsum available, but the         have suffered alteration in some form, by injected humour, or randomised      words which don't look even slightly believable. If you are going to use...
                  </p>
               </div>
               <div className="accordion__wrap">
                  <div className="accordion" id="accordionExample">
                     <div className="accordion-item wow fadeInUp" data-wow-duration="1.2s">
                        <h2 className="accordion-header" id="headingOne">
                           <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              What is e recharge?
                           </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                           <div className="accordion-body">
                              <p>
                                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when  
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="accordion-item wow fadeInUp" data-wow-duration="1.4s">
                        <h2 className="accordion-header" id="headingTwo">
                           <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                              How reliable is recharge com?
                           </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                           <div className="accordion-body">
                              <p>
                                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when  
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="accordion-item wow fadeInUp" data-wow-duration="1.6s">
                        <h2 className="accordion-header" id="headingThree">
                           <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                              What is recharge credit?
                           </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                           <div className="accordion-body">
                              <p>
                                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when  
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="col-xxl-6 col-xl-6 col-lg-9">
           <div className="hotel__qustionslider owl-theme owl-carousel">
               <div className="qustion__item">
                  <img src="assets/img/slider/hqustion1.jpg" alt="img"/>
               </div>
               <div className="qustion__item">
                  <img src="assets/img/slider/hqustion2.jpg" alt="img"/>
               </div>
               <div className="qustion__item">
                  <img src="assets/img/slider/hqustion1.jpg" alt="img"/>
               </div>
               <div className="qustion__item">
                  <img src="assets/img/slider/hqustion2.jpg" alt="img"/>
               </div>
               <div className="qustion__item">
                  <img src="assets/img/slider/hqustion1.jpg" alt="img"/>
               </div>
               <div className="qustion__item">
                  <img src="assets/img/slider/hqustion2.jpg" alt="img"/>
               </div>
               <div className="qustion__item">
                  <img src="assets/img/slider/hqustion1.jpg" alt="img"/>
               </div>
               <div className="qustion__item">
                  <img src="assets/img/slider/hqustion2.jpg" alt="img"/>
               </div>
           </div>
         </div>
      </div>
   </div>
</section>
<section className="hotel__gallery pt-120 pb-120">
   <div className="container">
      <div className="row justify-content-center wow fadeInDown">
         <div className="section__header section__center pb__60">
            <h2>
               Our gallery
            </h2>
            <p className="max600">
               There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
            </p>
         </div>
      </div>
   </div>
   <div className="hotel__gallerywrap owl-theme owl-carousel">
      <div className="galleryhotel__item">
         <img src="assets/img/slider/g1.jpg" alt="img"/>
      </div>
      <div className="galleryhotel__item">
         <img src="assets/img/slider/g2.jpg" alt="img"/>
      </div>
      <div className="galleryhotel__item">
         <img src="assets/img/slider/g3.jpg" alt="img"/>
      </div>
      <div className="galleryhotel__item">
         <img src="assets/img/slider/g4.jpg" alt="img"/>
      </div>
      <div className="galleryhotel__item">
         <img src="assets/img/slider/g5.jpg" alt="img"/>
      </div>
      <div className="galleryhotel__item">
         <img src="assets/img/slider/g2.jpg" alt="img"/>
      </div>
      <div className="galleryhotel__item">
         <img src="assets/img/slider/g4.jpg" alt="img"/>
      </div>
      <div className="galleryhotel__item">
         <img src="assets/img/slider/g4.jpg" alt="img"/>
      </div>
      <div className="galleryhotel__item">
         <img src="assets/img/slider/g5.jpg" alt="img"/>
      </div>
      <div className="galleryhotel__item">
         <img src="assets/img/slider/g2.jpg" alt="img"/>
      </div>
      <div className="galleryhotel__item">
         <img src="assets/img/slider/g4.jpg" alt="img"/>
      </div>
   </div>
</section>
</>
  );
};

export default HotelPage;