import React from "react";
import { FaPlane, FaMapMarkerAlt, FaCalendarDay } from "react-icons/fa";

const FlightPage: React.FC = () => {
  return (
    <>

<section className="hotel__booksection flight__booksection">
   <div className="container">
      <div className="row">
         <div className="col-xxl-6 col-xl-7 col-lg-8">
            <div className="hotel__content">
               <h1 className="wow fadeInDown" data-wow-duration="2s">
                  Let's Travel The World with us
               </h1>
               <p className="wow fadeInUp" data-wow-duration="2s">
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration...
               </p>
               <div className="cmn__grp">
                  <a href="flight-oneway.html" className="cmn__btn">
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
            </div> {/* Closing div for hotel__content */}
         </div> {/* Closing div for col-xxl-6 col-xl-7 col-lg-8 */}
      </div>
   </div>
</section>
<div className="hotelbokking__categoris">
   <div className="container">
      <div className="hotelbooking__categoris__wrap">
         <div className="dating__body">
            <h5 className="hoteltitle"> 
               Book Domestic and International Flights
            </h5>
            <div className="dating__body"> {/* Removed duplicate dating__body */}
               <div className="booking__radio mb__30">
                  <div className="b__radio">
                     <input className="form-check-input" type="radio" name="flexRadioDefault" id="bradios1s" defaultChecked />
                     <label className="form-check-label" htmlFor="bradios1s">
                        One Way
                     </label>
                  </div>
                  <div className="b__radio">
                     <input className="form-check-input" type="radio" name="flexRadioDefault" id="bradios2s" />
                     <label className="form-check-label" htmlFor="bradios2s">
                        Round Trip
                     </label>
                  </div>
               </div>
               <div className="dating__body__box dating__flight">
                 <div className="row justify-content-center g-3">
                     <div className="col-xxl-2 col-xl-6 col-lg-3 col-md-6 col-sm-12">
                        <div className="dating__item dating__hidden">
                           <input type="text" placeholder="From" />
                           <span className="calendaricon">
                              <i className="material-symbols-outlined">
                                 location_on
                              </i>
                           </span>
                        </div>
                     </div>
                     <div className="col-xxl-2 col-xl-6 col-lg-3 col-md-6 col-sm-12">
                        <div className="dating__item dating__hidden">
                           <input type="text" placeholder="To" />
                           <span className="calendaricon">
                              <i className="material-symbols-outlined">
                                 location_on
                              </i>
                           </span>
                        </div>
                     </div>
                     <div className="col-xxl-2 col-xl-6 col-lg-3 col-md-6 col-sm-12">
                        <div className="dating__item dating__hidden">
                           <div id="datepicker" className="input-group date" data-date-format="dd-mm-yyyy">
                              <input className="form-control" type="text" placeholder="Depart Date" readOnly />
                              <span className="calendaricon">
                                 <i className="material-symbols-outlined">
                                    calendar_month
                                 </i>
                              </span>
                              <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                        </div>
                        </div>
                     </div>
                     <div className="col-xxl-2 col-xl-6 col-lg-3 col-md-6 col-sm-12">
                        <div className="dating__item dating__hidden">
                           <div id="datepicker2" className="input-group date" data-date-format="dd-mm-yyyy">
                              <input className="form-control" type="text" placeholder="Return Date" readOnly />
                              <span className="calendaricon">
                                 <i className="material-symbols-outlined">
                                    calendar_month
                                 </i>
                              </span>
                              <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                        </div>
                        </div>
                     </div>
                     <div className="col-xxl-2 col-xl-6 col-lg-3 col-md-6 col-sm-12">
                        <div className="dating__item select__border">
                           <select name="room">
                              <option value="1">
                                 className
                              </option>
                              <option value="2">
                                 className Standard
                              </option>
                              <option value="3">
                                 className Standard
                              </option>
                           </select>
                        </div>
                     </div>
                     <div className="col-xxl-2 col-xl-6 col-lg-3 col-md-6 col-sm-12">
                        <div className="dating__item">
                           <button type="submit" className="cmn__btn">
                              <span>
                                 Search Flights
                              </span>
                           </button>
                        </div>
                     </div>
                 </div>
               </div>
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
   </div>
   <div className="flight__brachslider owl-theme owl-carousel">
      <div className="brach__flight__item">
         <img src="assets/img/flights/paris1.jpg" alt="img"/>
         <a href="flight-oneway.html" className="flitposition">
            <span className="location">
               <span className="icon">
                  <img src="assets/img/booking/locate.png" alt="img"/>
               </span>
               <span className="text">
                  England
               </span>
            </span>
            <span className="pages leftrightb pt__10 mt__20">
               <span className="text">
                  14 Tour Packages
               </span>
               <span className="arrow">
                  <i className="material-symbols-outlined">
                     chevron_right
                  </i>
               </span>
            </span>
         </a>
      </div>
      <div className="brach__flight__item">
         <img src="assets/img/flights/paris2.jpg" alt="img"/>
         <a href="flight-oneway.html" className="flitposition">
            <span className="location">
               <span className="icon">
                  <img src="assets/img/booking/locate.png" alt="img"/>
               </span>
               <span className="text">
                  Canada
               </span>
            </span>
            <span className="pages leftrightb pt__10 mt__20">
               <span className="text">
                  14 Tour Packages
               </span>
               <span className="arrow">
                  <i className="material-symbols-outlined">
                     chevron_right
                  </i>
               </span>
            </span>
         </a>
      </div>
      <div className="brach__flight__item">
         <img src="assets/img/flights/paris3.jpg" alt="img"/>
         <a href="flight-oneway.html" className="flitposition">
            <span className="location">
               <span className="icon">
                  <img src="assets/img/booking/locate.png" alt="img"/>
               </span>
               <span className="text">
                  Kasmir
               </span>
            </span>
            <span className="pages leftrightb pt__10 mt__20">
               <span className="text">
                  14 Tour Packages
               </span>
               <span className="arrow">
                  <i className="material-symbols-outlined">
                     chevron_right
                  </i>
               </span>
            </span>
         </a>
      </div>
      <div className="brach__flight__item">
         <img src="assets/img/flights/paris4.jpg" alt="img"/>
         <a href="flight-oneway.html" className="flitposition">
            <span className="location">
               <span className="icon">
                  <img src="assets/img/booking/locate.png" alt="img"/>
               </span>
               <span className="text">
                  Switzerland
               </span>
            </span>
            <span className="pages leftrightb pt__10 mt__20">
               <span className="text">
                  14 Tour Packages
               </span>
               <span className="arrow">
                  <i className="material-symbols-outlined">
                     chevron_right
                  </i>
               </span>
            </span>
         </a>
      </div>
      <div className="brach__flight__item">
         <img src="assets/img/flights/paris5.jpg" alt="img"/>
         <a href="flight-oneway.html" className="flitposition">
            <span className="location">
               <span className="icon">
                  <img src="assets/img/booking/locate.png" alt="img"/>
               </span>
               <span className="text">
                  New Zealand
               </span>
            </span>
            <span className="pages leftrightb pt__10 mt__20">
               <span className="text">
                  14 Tour Packages
               </span>
               <span className="arrow">
                  <i className="material-symbols-outlined">
                     chevron_right
                  </i>
               </span>
            </span>
         </a>
      </div>
      <div className="brach__flight__item">
         <img src="assets/img/flights/paris6.jpg" alt="img"/>
         <a href="flight-oneway.html" className="flitposition">
            <span className="location">
               <span className="icon">
                  <img src="assets/img/booking/locate.png" alt="img"/>
               </span>
               <span className="text">
                  Sydney
               </span>
            </span>
            <span className="pages leftrightb pt__10 mt__20">
               <span className="text">
                  14 Tour Packages
               </span>
               <span className="arrow">
                  <i className="material-symbols-outlined">
                     chevron_right
                  </i>
               </span>
            </span>
         </a>
      </div>
      <div className="brach__flight__item">
         <img src="assets/img/flights/paris3.jpg" alt="img"/>
         <a href="flight-oneway.html" className="flitposition">
            <span className="location">
               <span className="icon">
                  <img src="assets/img/booking/locate.png" alt="img"/>
               </span>
               <span className="text">
                  England
               </span>
            </span>
            <span className="pages leftrightb pt__10 mt__20">
               <span className="text">
                  14 Tour Packages
               </span>
               <span className="arrow">
                  <i className="material-symbols-outlined">
                     chevron_right
                  </i>
               </span>
            </span>
         </a>
      </div>
      <div className="brach__flight__item">
         <img src="assets/img/flights/paris5.jpg" alt="img"/>
         <a href="flight-oneway.html" className="flitposition">
            <span className="location">
               <span className="icon">
                  <img src="assets/img/booking/locate.png" alt="img"/>
               </span>
               <span className="text">
                  Dubai
               </span>
            </span>
            <span className="pages leftrightb pt__10 mt__20">
               <span className="text">
                  14 Tour Packages
               </span>
               <span className="arrow">
                  <i className="material-symbols-outlined">
                     chevron_right
                  </i>
               </span>
            </span>
         </a>
      </div>
      <div className="brach__flight__item">
         <img src="assets/img/flights/paris1.jpg" alt="img"/>
         <a href="flight-oneway.html" className="flitposition">
            <span className="location">
               <span className="icon">
                  <img src="assets/img/booking/locate.png" alt="img"/>
               </span>
               <span className="text">
                  England
               </span>
            </span>
            <span className="pages leftrightb pt__10 mt__20">
               <span className="text">
                  14 Tour Packages
               </span>
               <span className="arrow">
                  <i className="material-symbols-outlined">
                     chevron_right
                  </i>
               </span>
            </span>
         </a>
      </div>
      <div className="brach__flight__item">
         <img src="assets/img/flights/paris2.jpg" alt="img"/>
         <a href="flight-oneway.html" className="flitposition">
            <span className="location">
               <span className="icon">
                  <img src="assets/img/booking/locate.png" alt="img"/>
               </span>
               <span className="text">
                  Canada
               </span>
            </span>
            <span className="pages leftrightb pt__10 mt__20">
               <span className="text">
                  14 Tour Packages
               </span>
               <span className="arrow">
                  <i className="material-symbols-outlined">
                     chevron_right
                  </i>
               </span>
            </span>
         </a>
      </div>
      <div className="brach__flight__item">
         <img src="assets/img/flights/paris3.jpg" alt="img"/>
         <a href="flight-oneway.html" className="flitposition">
            <span className="location">
               <span className="icon">
                  <img src="assets/img/booking/locate.png" alt="img"/>
               </span>
               <span className="text">
                  Kasmir
               </span>
            </span>
            <span className="pages leftrightb pt__10 mt__20">
               <span className="text">
                  14 Tour Packages
               </span>
               <span className="arrow">
                  <i className="material-symbols-outlined">
                     chevron_right
                  </i>
               </span>
            </span>
         </a>
      </div>
   </div>
</section>
<section className="flight__tour  pb-120 pt-120">
   <div className="container">
      <div className="row justify-content-between">
         <div className="col-xx-6 col-xl-6 col-lg-6"></div>
         <div className="col-xx-6 col-xl-6 col-lg-6">
            <div className="section__header">
               <h2>
                  We provide the best destinations especially for you Book now
               </h2>
               <p className="pb__40">
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators...
               </p>
               <a href="flight-round.html" className="cmn__btn">
                  <span>
                     Explore deals
                  </span>
               </a>
            </div>
         </div>
      </div>
   </div>
   <div className="bshape1">
      <img src="assets/img/flights/btourshape.png" alt="img"/>
   </div>
   <div className="bshape2">
      <img src="assets/img/flights/ttourshape.png" alt="img"/>
   </div>
</section>
<section className="hotel__facilities pt-120 pb-120">
   <div className="container">
      <div className="row justify-content-center"> 
         <div className="col-xxl-6 col-xl-7 col-lg-7 wow fadeInDown">
            <div className="section__header section__center pb__60">
               <h2>
                  Flight Facilities
               </h2>
               <p>
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
               </p>
            </div>
         </div>
      </div>
      <div className="flight__facilites__wrap">
         <div className="row g-4 justify-content-center">
            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="1.2s">
               <div className="hotel__facilities__item">
                  <div className="head__wrap">
                     <img src="assets/img/room/breakfast.png" alt="img"/>
                     <h5>
                        <a href="flight-oneway.html">
                           Breakfast
                        </a>
                     </h5>
                  </div>
                  <p>
                     It is a long established fact that a reader will be distracted by the...
                  </p>
               </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="1.6s">
               <div className="hotel__facilities__item">
                  <div className="head__wrap">
                     <img src="assets/img/room/seats.png" alt="img"/>
                     <h5>
                        <a href="flight-oneway.html">
                           Comfortable seats
                        </a>
                     </h5>
                  </div>
                  <p>
                     It is a long established fact that a reader will be distracted by the...
                  </p>
               </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="1.9s">
               <div className="hotel__facilities__item">
                  <div className="head__wrap">
                     <img src="assets/img/room/wifi.png" alt="img"/>
                     <h5>
                        <a href="flight-oneway.html">
                           Sunlimited WIFI
                        </a>
                     </h5>
                  </div>
                  <p>
                     It is a long established fact that a reader will be distracted by the...
                  </p>
               </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="2.1s">
               <div className="hotel__facilities__item">
                  <div className="head__wrap">
                     <img src="assets/img/room/drinkss.png" alt="img"/>
                     <h5>
                        <a href="flight-oneway.html">
                           Cold Drinks
                        </a>
                     </h5>
                  </div>
                  <p>
                     It is a long established fact that a reader will be distracted by the...
                  </p>
               </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="2.2s">
               <div className="hotel__facilities__item">
                  <div className="head__wrap">
                     <img src="assets/img/room/hotcoffee.png" alt="img"/>
                     <h5>
                        <a href="flight-oneway.html">
                           Hot Coffee
                        </a>
                     </h5>
                  </div>
                  <p>
                     It is a long established fact that a reader will be distracted by the...
                  </p>
               </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="2.3s">
               <div className="hotel__facilities__item">
                  <div className="head__wrap">
                     <img src="assets/img/room/salat.png" alt="img"/>
                     <h5>
                        <a href="flight-oneway.html">
                           Place of Religion Pray
                        </a>
                     </h5>
                  </div>
                  <p>
                     It is a long established fact that a reader will be distracted by the...
                  </p>
               </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="2.3s">
               <div className="hotel__facilities__item">
                  <div className="head__wrap">
                     <img src="assets/img/room/medical.png" alt="img"/>
                     <h5>
                        <a href="flight-oneway.html">
                           Medical treatment
                        </a>
                     </h5>
                  </div>
                  <p>
                     It is a long established fact that a reader will be distracted by the...
                  </p>
               </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="2.3s">
               <div className="hotel__facilities__item">
                  <div className="head__wrap">
                     <img src="assets/img/room/supports.png" alt="img"/>
                     <h5>
                        <a href="flight-oneway.html">
                           Unlimited Support
                        </a>
                     </h5>
                  </div>
                  <p>
                     It is a long established fact that a reader will be distracted by the...
                  </p>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<section className="discount__travel bgsection pt-120 pb-120">
   <div className="container">
      <div className="row justify-content-center"> 
         <div className="col-xxl-6 col-xl-7 col-lg-7 wow fadeInDown">
            <div className="section__header section__center pb__60">
               <h2>
                  Travels Discount
               </h2>
               <p>
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
               </p>
            </div>
         </div>
      </div>
      <div className="row g-4 justify-content-center">
         <div className="col-xxl-6 col-xl-6 col-lg-6">
            <div className="travel__dicount__item ">
               <img src="assets/img/flights/discount1.jpg" alt="img"/>
               <div className="bestoffer__content">
                  <h4 className="cheap">
                     Fly Now, Pay Later
                  </h4>
                  <p className="usa">
                     USA cheap flight deals
                  </p>
                  <h1 className="offfertitle">
                     <span className="uptoget">
                        <span className="upto d-block">
                           Get 
                        </span>
                        <span className="upto">
                           upto
                        </span>
                     </span>
                     45
                     <span className="offs">
                        % OFF
                     </span>
                  </h1>
                  <a href="flight-oneway.html" className="cmn__btn cmn__green">
                     <span>
                        Book Now
                     </span>
                  </a>
               </div>
            </div>
         </div>
         <div className="col-xxl-6 col-xl-6 col-lg-6">
            <div className="travel__dicount__item ">
               <img src="assets/img/flights/discount2.jpg" alt="img"/>
               <div className="content">
                 <div className="boxeswidth">
                     <h1 className="fivepercent">
                        5%
                     </h1>
                     <h4 className="instant">
                        INSTANT
                        DISCOUNT
                     </h4>
                     <p className="flightbook">
                        on Flight Booking
                     </p>
                     <a href="flight-oneway.html" className="cmn__btn cmn__meron">
                        <span>
                           Book Now
                        </span>
                     </a>
                 </div>
               </div>
            </div>
         </div>
         <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
            <div className="travel__dicount__item">
               <img src="assets/img/flights/discount3.jpg" alt="img"/>
               <div className="content">
                  <h4 className="fivtin">
                     Get 15% off
                  </h4>
                  <p className="winter pb__20">
                     Fly to Dubai & Enjoy
                  </p>
                  <a href="flight-oneway.html" className="cmn__btn cmn__base">
                     <span>
                        Book Now
                     </span>
                  </a>
               </div>
            </div>
         </div>
         <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
            <div className="travel__dicount__item">
               <img src="assets/img/flights/discount4.jpg" alt="img"/>
               <div className="content">
                  <h4 className="cheap">
                     Cheap Flight Deal
                  </h4>
                  <p className="winter">
                     Winter holidays in Switzerland
                  </p>
                  <span className="tharthy pb__20">
                     30% OFF
                  </span>
                  <a href="flight-oneway.html" className="cmn__btn cmn__base">
                     <span>
                        Book Now
                     </span>
                  </a>
               </div>
            </div>
         </div>
         <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
            <div className="travel__dicount__item">
               <img src="assets/img/flights/discount5.jpg" alt="img"/>
               <div className="content">
                  <h4 className="cheap">
                     Hot Flight Deal
                  </h4>
                  <p className="winter">
                     Summer vacation in Hong Kong
                  </p>
                  <span className="tharthy pb__20">
                     50% OFF
                  </span>
                  <a href="flight-oneway.html" className="cmn__btn cmn__green">
                     <span>
                        Book Now
                     </span>
                  </a>
               </div>
            </div>
         </div>
      </div>
      <div className="more__btn text-center pt__40">
         <a href="flight-oneway.html" className="cmn__btn">
            <span>
               See All Offer
            </span>
         </a>
      </div>
   </div>
</section>
<section className="flight__section pt-120 pb-120">
   <div className="container">
      <div className="row justify-content-center"> 
         <div className="col-xxl-6 col-xl-7 col-lg-7 wow fadeInDown">
            <div className="section__header section__center pb__60">
               <h2>
                  What does the client say?
               </h2>
               <p>
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
               </p>
            </div>
         </div>
      </div>
      <div className="flight__client__wrap owl-theme owl-carousel">
         <div className="flight__client__item">
            <div className="header">
               <img src="assets/img/testimonial/commonquote.png" alt="img"/>
               <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
               </p>
            </div>
            <div className="lastcommon">
               <img src="assets/img/testimonial/devid.png" alt="img"/>
               <ul className="ratting">
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/wihtstar.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/wihtstar.png" alt="img"/>
                  </li>
               </ul>
               <h5>
                  Devid Warner
               </h5>
               <span className="degisnation">
                  Customer
               </span>
            </div>
         </div>
         <div className="flight__client__item">
            <div className="header">
               <img src="assets/img/testimonial/commonquote.png" alt="img"/>
               <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
               </p>
            </div>
            <div className="lastcommon">
               <img src="assets/img/testimonial/wilsond.png" alt="img"/>
               <ul className="ratting">
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/wihtstar.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/wihtstar.png" alt="img"/>
                  </li>
               </ul>
               <h5>
                  Jenny Wilson
               </h5>
               <span className="degisnation">
                  Marketing Coordinator
               </span>
            </div>
         </div>
         <div className="flight__client__item">
            <div className="header">
               <img src="assets/img/testimonial/commonquote.png" alt="img"/>
               <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
               </p>
            </div>
            <div className="lastcommon">
               <img src="assets/img/testimonial/cody.png" alt="img"/>
               <ul className="ratting">
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/wihtstar.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/wihtstar.png" alt="img"/>
                  </li>
               </ul>
               <h5>
                  Cody Fisher
               </h5>
               <span className="degisnation">
                  Medical Assistant
               </span>
            </div>
         </div>
         <div className="flight__client__item">
            <div className="header">
               <img src="assets/img/testimonial/commonquote.png" alt="img"/>
               <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
               </p>
            </div>
            <div className="lastcommon">
               <img src="assets/img/testimonial/wilsond.png" alt="img"/>
               <ul className="ratting">
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/wihtstar.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/wihtstar.png" alt="img"/>
                  </li>
               </ul>
               <h5>
                  Jenny Wilson
               </h5>
               <span className="degisnation">
                  Marketing Coordinator
               </span>
            </div>
         </div>
         <div className="flight__client__item">
            <div className="header">
               <img src="assets/img/testimonial/commonquote.png" alt="img"/>
               <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
               </p>
            </div>
            <div className="lastcommon">
               <img src="assets/img/testimonial/devid.png" alt="img"/>
               <ul className="ratting">
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/star.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/wihtstar.png" alt="img"/>
                  </li>
                  <li>
                     <img src="assets/img/testimonial/wihtstar.png" alt="img"/>
                  </li>
               </ul>
               <h5>
                  Devid Warner
               </h5>
               <span className="degisnation">
                  Customer
               </span>
            </div>
         </div>
      </div>
   </div>
</section>

<section className="conplaint__service hidd">
   <div className="container-fluid p-0">
      <div className="row g-0">
         <div className="col-xxl-7 col-xl-7 col-lg-7">
            <div className="complaint__content row justify-content-center align-items-center">
               <div className="complaint__content__box">
                  <div className="section__header pb__40">
                     <h2>
                        You can make any complaint our service
                     </h2>
                     <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour...
                     </p>
                  </div>
                  <form action="javascript:void(0)"> {/* Added form tag around inputs */}
                     {/* Removed duplicate inputs */}
                     {/* Removed duplicate textarea */}
                     <input type="text" placeholder="Your name" />
                     <input type="email" placeholder="Your email" />
                     <textarea cols={30} rows={3} placeholder="Your complaint"></textarea>
                  <div className="agree__chek pb__40">
                     <input className="form-check-input" type="checkbox" id="agree" checked />
                     <label className="form-check-label" htmlFor="agree">
                        I Agree support terms & condition
                     </label>
                  </div>
                  <button type="submit" className="cmn__btn">
                     <span>
                        Submit
                     </span>
                  </button>
                  </form>
               </div>
            </div>
         </div>
         <div className="col-xxl-5 col-xl-5 col-lg-5">
            <div className="conplaint__thumb">
               
            </div>
         </div>
      </div>
   </div>
</section>
<section className="sponsor__section booking__sponsor pt__60 pb__60">
   <div className="container">
      <div className="logo__sponsor owl-theme owl-carousel">
         <div className="item">
            <img src="assets/img/sponsor/s1.png" alt="img"/>
         </div>
         <div className="item">
            <img src="assets/img/sponsor/s2.png" alt="img"/>
         </div>
         <div className="item">
            <img src="assets/img/sponsor/s3.png" alt="img"/>
         </div>
         <div className="item">
            <img src="assets/img/sponsor/s4.png" alt="img"/>
         </div>
         <div className="item">
            <img src="assets/img/sponsor/s5.png" alt="img"/>
         </div>
         <div className="item">
            <img src="assets/img/sponsor/s6.png" alt="img"/>
         </div>
         <div className="item">
            <img src="assets/img/sponsor/s7.png" alt="img"/>
         </div>
         <div className="item">
            <img src="assets/img/sponsor/s2.png" alt="img"/>
         </div>
         <div className="item">
            <img src="assets/img/sponsor/s3.png" alt="img"/>
         </div>
         <div className="item">
            <img src="assets/img/sponsor/s4.png" alt="img"/>
         </div>
         <div className="item">
            <img src="assets/img/sponsor/s5.png" alt="img"/>
         </div>
      </div>
   </div>
</section>
    </>
  );
};

export default FlightPage;