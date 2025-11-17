import React from "react";
import { FaTrain, FaMapPin, FaCalendarCheck } from "react-icons/fa";

const IrctcPage: React.FC = () => {
  return (
    <>
      {/* train booking Here */}
      <section className="hotel__booksection train__booksection">
        <div className="container">
          <div className="row">
            <div className="col-xxl-7 col-xl-7 col-lg-8">
              <div className="hotel__content">
                <h1 className="wow fadeInDown" data-wow-duration="2s">
                  Discover traveling the world by train
               </h1>
                <p className="wow fadeInUp max-636" data-wow-duration="2s">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration...
               </p>
                <div className="cmn__grp">
                  <a href="train-list.html" className="cmn__btn">
                    <span>Explore deals</span>
                  </a>
                  <a href="about.html" className="cmn__btn outline__btn">
                    <span>About us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="trainshpe">
          <img src="assets/img/train/trainthumb.png" alt="img" />
        </div>
      </section>
      {/* train booking End */}

      {/* train booking Categoris Here */}
      <div className="hotelbokking__categoris">
        <div className="container">
          <div className="hotelbooking__categoris__wrap spacebottom__none">
            <div className="dating__body">
              <h5 className="hoteltitle">Book Train Tickets</h5>
              <div className="dating__body">
                <div className="booking__radio mb__30">
                  <div className="b__radio">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="bradios1s"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="bradios1s">
                      One Way
                    </label>
                  </div>
                  <div className="b__radio">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="bradios2s"
                    />
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
                        <div
                          id="datepicker"
                          className="input-group date"
                          data-date-format="dd-mm-yyyy"
                        >
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Depart Date"
                            readOnly
                          />
                          <span className="calendaricon">
                            <i className="material-symbols-outlined">
                              calendar_month
                            </i>
                          </span>
                          <span className="input-group-addon">
                            <i className="glyphicon glyphicon-calendar"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-6 col-lg-3 col-md-6 col-sm-12">
                      <div className="dating__item dating__hidden">
                        <div
                          id="datepicker2"
                          className="input-group date"
                          data-date-format="dd-mm-yyyy"
                        >
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Return Date"
                            readOnly
                          />
                          <span className="calendaricon">
                            <i className="material-symbols-outlined">
                              calendar_month
                            </i>
                          </span>
                          <span className="input-group-addon">
                            <i className="glyphicon glyphicon-calendar"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-6 col-lg-3 col-md-6 col-sm-12">
                      <div className="dating__item select__border">
                        <select name="room">
                          <option value="1">Class</option>
                          <option value="2">Class Standard</option>
                          <option value="3">Class Standard</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-6 col-lg-3 col-md-6 col-sm-12">
                      <div className="dating__item">
                        <button type="submit" className="cmn__btn">
                          <span>Search Trains</span>
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
      {/* train booking Categoris end */}

      {/* train ticket here */}
      <section className="train__ticket">
        <div className="container">
          <div className="row flex-row-reverse align-items-center justify-content-between">
            <div className="col-xxl-6 col-xl-6 col-lg-6">
              <div className="train__ticket__content">
                <div className="section__header mb__30">
                  <h2>Different Types of Train Ticket Booking</h2>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the have suffered alteration in some form, by
                    injected humour, or randomised words which don't look even
                    slightly believable. If you are going to use...
                  </p>
                </div>
                <ul className="offer__list pb__40">
                  <li>
                    <span className="thumb">
                      <img src="assets/img/train/unoffer.png" alt="img" />
                    </span>
                    <span className="text">Unlimited Offers</span>
                  </li>
                  <li>
                    <span className="thumb">
                      <img src="assets/img/train/suppor24.png" alt="img" />
                    </span>
                    <span className="text">24X7 Support</span>
                  </li>
                  <li>
                    <span className="thumb">
                      <img src="assets/img/train/secure100.png" alt="img" />
                    </span>
                    <span className="text">100% Secure</span>
                  </li>
                  <li>
                    <span className="thumb">
                      <img src="assets/img/train/truspay.png" alt="img" />
                    </span>
                    <span className="text">Trust pay</span>
                  </li>
                </ul>
                <a href="train-list.html" className="cmn__btn">
                  <span>Explore deals</span>
                </a>
              </div>
            </div>
            <div className="col-xxl-5 col-xl-5 col-lg-5">
              <div className="trainticket__thumb">
                <img src="assets/img/train/trainticket.png" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* train ticket end */}

      {/* train ticketeasily Here */}
      <section className="ticketeasily__section">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-xxl-6 col-xl-7 col-lg-7">
              <div className="refer__content trainticket__content">
                <div className="section__header mb__30 wow fadeInDown">
                  <h2>How to purchase ticket very easily</h2>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the have suffered alteration in some form, by
                    injected humour, or randomised words which don't look even
                    slightly believable. If you are going to use...
                  </p>
                </div>
                <div className="refer__wrap pt__20">
                  <div
                    className="refer__item wow fadeInUp"
                    data-wow-duration="1.2s"
                  >
                    <div className="icon">
                      <img src="assets/img/train/trainsearch.png" alt="img" />
                    </div>
                    <div className="content">
                      <h5>Search Train</h5>
                      <p>
                        Choose your origin, destination, jouney dates and search
                        for trains
                      </p>
                    </div>
                  </div>
                  <div
                    className="refer__item wow fadeInUp"
                    data-wow-duration="1.4s"
                  >
                    <div className="icon">
                      <img src="assets/img/train/slecetseats.png" alt="img" />
                    </div>
                    <div className="content">
                      <h5>Select seats</h5>
                      <p>Select your desired trip and choose your seats</p>
                    </div>
                  </div>
                  <div
                    className="refer__item wow fadeInUp"
                    data-wow-duration="1.6s"
                  >
                    <div className="icon">
                      <img src="assets/img/train/buypay.png" alt="img" />
                    </div>
                    <div className="content">
                      <h5>Buy & pay</h5>
                      <p>Pay for the tickets Via Dbit / Creadit Cards or MFS</p>
                    </div>
                  </div>
                </div>
                <a
                  href="train-list.html"
                  className="cmn__btn wow fadeInUp"
                  data-wow-duration="1.8s"
                >
                  <span>Explore deals</span>
                </a>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-5 col-lg-5"></div>
          </div>
        </div>
        <div className="trainticket__shape">
          <img src="assets/img/train/tarinshapeticket.png" alt="img" />
        </div>
      </section>
      {/* train ticketeasily End */}

      {/* train facilities here */}
      <section className="hotel__facilities pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-6 col-xl-7 col-lg-7 wow fadeInDown">
              <div className="section__header section__center pb__60">
                <h2>Train Facilities</h2>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form
                </p>
              </div>
            </div>
          </div>
          <div className="flight__facilites__wrap">
            <div className="row g-4 justify-content-center">
              <div
                className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
                data-wow-duration="1.2s"
              >
                <div className="hotel__facilities__item">
                  <div className="head__wrap">
                    <img src="assets/img/room/breakfast.png" alt="img" />
                    <h5>
                      <a href="#">Breakfast</a>
                    </h5>
                  </div>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the...
                  </p>
                </div>
              </div>
              <div
                className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
                data-wow-duration="1.6s"
              >
                <div className="hotel__facilities__item">
                  <div className="head__wrap">
                    <img src="assets/img/room/seats.png" alt="img" />
                    <h5>
                      <a href="#">Comfortable seats</a>
                    </h5>
                  </div>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the...
                  </p>
                </div>
              </div>
              <div
                className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
                data-wow-duration="1.9s"
              >
                <div className="hotel__facilities__item">
                  <div className="head__wrap">
                    <img src="assets/img/room/wifi.png" alt="img" />
                    <h5>
                      <a href="#">Sunlimited WIFI</a>
                    </h5>
                  </div>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the...
                  </p>
                </div>
              </div>
              <div
                className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
                data-wow-duration="2.1s"
              >
                <div className="hotel__facilities__item">
                  <div className="head__wrap">
                    <img src="assets/img/room/drinkss.png" alt="img" />
                    <h5>
                      <a href="#">Cold Drinks</a>
                    </h5>
                  </div>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the...
                  </p>
                </div>
              </div>
              <div
                className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
                data-wow-duration="2.2s"
              >
                <div className="hotel__facilities__item">
                  <div className="head__wrap">
                    <img src="assets/img/room/hotcoffee.png" alt="img" />
                    <h5>
                      <a href="#">Hot Coffee</a>
                    </h5>
                  </div>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the...
                  </p>
                </div>
              </div>
              <div
                className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
                data-wow-duration="2.3s"
              >
                <div className="hotel__facilities__item">
                  <div className="head__wrap">
                    <img src="assets/img/room/salat.png" alt="img" />
                    <h5>
                      <a href="#">Place of Religion Pray</a>
                    </h5>
                  </div>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the...
                  </p>
                </div>
              </div>
              <div
                className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
                data-wow-duration="2.3s"
              >
                <div className="hotel__facilities__item">
                  <div className="head__wrap">
                    <img src="assets/img/room/medical.png" alt="img" />
                    <h5>
                      <a href="#">Medical treatment</a>
                    </h5>
                  </div>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the...
                  </p>
                </div>
              </div>
              <div
                className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
                data-wow-duration="2.3s"
              >
                <div className="hotel__facilities__item">
                  <div className="head__wrap">
                    <img src="assets/img/room/supports.png" alt="img" />
                    <h5>
                      <a href="#">Unlimited Support</a>
                    </h5>
                  </div>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* train facilities End */}

      {/*train booktour here */}
      <section className="flight__tour train__tour">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xx-6 col-xl-6 col-lg-6"></div>
            <div className="col-xx-6 col-xl-6 col-lg-6 col-md-8">
              <div className="train__tour__contetn">
                <div className="section__header">
                  <h2>The best solution for traveling by train</h2>
                  <p className="pb__40">
                    There are many variations of passages of Lorem Ipsum
                    available, but the have suffered alteration in some form, by
                    injected humour, or randomised words which don't look even
                    slightly believable. If you are going to use It is a long
                    established fact that a reader will be distracted by the
                    readable content...
                  </p>
                  <a href="flight-oneway.html" className="cmn__btn">
                    <span>Explore deals</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bshape1">
          <img src="assets/img/train/ss2.png" alt="img" />
        </div>
        <div className="bshape2">
          <img src="assets/img/train/ss1.png" alt="img" />
        </div>
        <div className="train__travelshape">
          <img src="assets/img/train/bullet1.jpg" alt="img" />
        </div>
      </section>
      {/*train booktour End */}

      {/*train support here*/}
      <section className="refer__section__three pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6">
              <div className="section__header">
                <h2>Get train information service here</h2>
                <p className="pb__40">
                  There are many variations of passages of Lorem Ipsum
                  available, but the have suffered alteration in some form, by
                  injected humour, or randomised words which don't look even
                  slightly believable. If you are going to use...
                </p>
                <a href="#" onClick={(e) => e.preventDefault()} className="cmn__btn">
                  <span>Explore deals</span>
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="refer__boxes__wrap refer__boxes__wrapthree">
                <div className="row g-4 align-items-center">
                  <div className="col-lg-6 col-md-6">
                    <div className="refer__items__thregrid">
                      <div className="refer__item refer__item__grid">
                        <div className="icon">
                          <img
                            src="assets/img/train/pnarstatustrain.png"
                            alt="img"
                          />
                        </div>
                        <div className="content">
                          <h5>PNR Status</h5>
                          <p>
                            There are many variations of passages of Lorem...
                          </p>
                          <a href="train-grid.html" className="righicon">
                            <i className="material-symbols-outlined">
                              chevron_right
                            </i>
                          </a>
                        </div>
                      </div>
                      <div className="refer__item refer__item__grid">
                        <div className="icon">
                          <img src="assets/img/train/viewcoasch.png" alt="img" />
                        </div>
                        <div className="content">
                          <h5>View coach position</h5>
                          <p>
                            There are many variations of passages of Lorem...
                          </p>
                          <a href="train-grid.html" className="righicon">
                            <i className="material-symbols-outlined">
                              chevron_right
                            </i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 updown__support">
                    <div className="refer__items__thregrid">
                      <div className="refer__item refer__item__grid">
                        <div className="icon">
                          <img src="assets/img/train/livetrain.png" alt="img" />
                        </div>
                        <div className="content">
                          <h5>Live train status</h5>
                          <p>
                            There are many variations of passages of Lorem...
                          </p>
                          <a href="train-grid.html" className="righicon">
                            <i className="material-symbols-outlined">
                              chevron_right
                            </i>
                          </a>
                        </div>
                      </div>
                      <div className="refer__item refer__item__grid">
                        <div className="icon">
                          <img src="assets/img/train/platform.png" alt="img" />
                        </div>
                        <div className="content">
                          <h5>Platform Locator</h5>
                          <p>
                            There are many variations of passages of Lorem...
                          </p>
                          <a href="train-grid.html" className="righicon">
                            <i className="material-symbols-outlined">
                              chevron_right
                            </i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="refer__dotthree1">
                  <img src="assets/img/refer/dots.png" alt="img" />
                </div>
                <div className="refer__dotthree2">
                  <img src="assets/img/refer/dots.png" alt="img" />
                </div>
                <div className="refer__dotthree3">
                  <img src="assets/img/refer/dots.png" alt="img" />
                </div>
                <div className="refer__dotthree4">
                  <img src="assets/img/refer/dots.png" alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="refer__ball">
          <img src="assets/img/refer/referball.png" alt="img" />
        </div>
      </section>
      {/*train support end*/}

      {/*train two app end*/}
      <section className="app__section bgsection pt-120 pb-120">
        <div className="container">
          <div className="row flex-row-reverse justify-content-between align-items-center">
            <div
              className="col-xl-6 col-lg-7 col-md-7 wow fadeInDown"
              data-wow-duration="1.5s"
            >
              <div className="app__content">
                <div className="section__header">
                  <h2>Instructions to Purchase Train Tickets</h2>
                  <p className="apptext">
                    Download our app for the fastest, most convenient way to
                    Booking System.
                  </p>
                  <ul className="train__list pb__40">
                    <li>
                      <span className="icons">
                        <i className="material-symbols-outlined">done</i>
                      </span>
                      <span className="textss">
                        Tickets can be bought online five days in advance.
                      </span>
                    </li>
                    <li>
                      <span className="icons">
                        <i className="material-symbols-outlined">done</i>
                      </span>
                      <span className="text">
                        In case of payment or transaction failure, the deducted
                        amount would be refunded by your bank within 8 business
                        days.
                      </span>
                    </li>
                    <li>
                      <span className="icons">
                        <i className="material-symbols-outlined">done</i>
                      </span>
                      <span className="text">
                        In case money has been deducted from your card / mobile
                        wallet but you have not received a ticket confirmation,
                        the deducted amount would be refunded by your bank within
                        8 business days.
                      </span>
                    </li>
                    <li>
                      <span className="icons">
                        <i className="material-symbols-outlined">done</i>
                      </span>
                      <span className="text">
                        Download the official app published by Rechargio from App
                        store
                      </span>
                    </li>
                    <li>
                      <span className="icons">
                        <i className="material-symbols-outlined">done</i>
                      </span>
                      <span className="text">
                        In case of passengers downloading fake apps or any other
                        app from app store which claim to sell train tickets of
                        Rechargio, the authorities will not take any liability.
                      </span>
                    </li>
                  </ul>
                  <div className="d-flex gap-3 align-items-center">
                    <a href="javascript:void(0)" className="storyitem">
                      <img src="assets/img/app/appplay.png" alt="img" />
                    </a>
                    <a href="javascript:void(0)" className="storyitem">
                      <img src="assets/img/app/appstore.png" alt="img" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-5 col-lg-5 col-md-5 wow fadeInUp"
              data-wow-duration="2.5s"
            >
              <div className="app__thumb app__thumb__two">
                <img src="assets/img/app/apptwo.png" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*train two app end*/}

      {/*train two qustions start*/}
      <section className="question__section pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center wow fadeInDown">
            <div className="col-lg-6">
              <div className="section__header section__center pb__40">
                <h2>If you got questions we have answer</h2>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form,
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-6">
              <div className="qustion__content">
                <div className="accordion__wrap">
                  <div className="accordion" id="accordionExample">
                    {/*Accordion items*/}
                    <div
                      className="accordion-item wow fadeInUp"
                      data-wow-duration="0.9s"
                    >
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          What is e recharge?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when
                          </p>
                        </div>
                      </div>
                    </div>
                    {/*Accordion items*/}
                    <div
                      className="accordion-item wow fadeInUp"
                      data-wow-duration="1s"
                    >
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          What is recharge credit?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when
                          </p>
                        </div>
                      </div>
                    </div>
                    {/*Accordion items*/}
                    <div
                      className="accordion-item wow fadeInUp"
                      data-wow-duration="1.4s"
                    >
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          How reliable is recharge com?
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when
                          </p>
                        </div>
                      </div>
                    </div>
                    {/*Accordion items*/}
                    <div
                      className="accordion-item wow fadeInUp"
                      data-wow-duration="1.6s"
                    >
                      <h2 className="accordion-header" id="headingThreem">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThreem"
                          aria-expanded="false"
                          aria-controls="collapseThreem"
                        >
                          What is recharge application?
                        </button>
                      </h2>
                      <div
                        id="collapseThreem"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThreem"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when
                          </p>
                        </div>
                      </div>
                    </div>
                    {/*Accordion items*/}
                    <div
                      className="accordion-item wow fadeInUp"
                      data-wow-duration="1.8s"
                    >
                      <h2 className="accordion-header" id="headingThreemm">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThreemm"
                          aria-expanded="false"
                          aria-controls="collapseThreemm"
                        >
                          How do I recharge a phone number?
                        </button>
                      </h2>
                      <div
                        id="collapseThreemm"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThreemm"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when
                          </p>
                        </div>
                      </div>
                    </div>
                    {/*Accordion items*/}
                    <div
                      className="accordion-item wow fadeInUp"
                      data-wow-duration="1.9s"
                    >
                      <h2 className="accordion-header" id="headingThreemmm">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThreemmm"
                          aria-expanded="false"
                          aria-controls="collapseThreemmm"
                        >
                          What is the primary function of the recharge payment
                          application?
                        </button>
                      </h2>
                      <div
                        id="collapseThreemmm"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThreemmm"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when
                          </p>
                        </div>
                      </div>
                    </div>
                    {/*Accordion items*/}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="qustion__content">
                <div className="accordion__wrap">
                  <div className="accordion" id="accordionExample2">
                    {/*Accordion items*/}
                    <div
                      className="accordion-item wow fadeInUp"
                      data-wow-duration="0.9s"
                    >
                      <h2 className="accordion-header" id="headingOness">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOness"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          What is e recharge?
                        </button>
                      </h2>
                      <div
                        id="collapseOness"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOness"
                        data-bs-parent="#accordionExample2"
                      >
                        <div className="accordion-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when
                          </p>
                        </div>
                      </div>
                    </div>
                    {/*Accordion items*/}
                    <div
                      className="accordion-item wow fadeInUp"
                      data-wow-duration="1s"
                    >
                      <h2 className="accordion-header" id="headingTwoss">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwoss"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          What is recharge credit?
                        </button>
                      </h2>
                      <div
                        id="collapseTwoss"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwoss"
                        data-bs-parent="#accordionExample2"
                      >
                        <div className="accordion-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when
                          </p>
                        </div>
                      </div>
                    </div>
                    {/*Accordion items*/}
                    <div
                      className="accordion-item wow fadeInUp"
                      data-wow-duration="1.4s"
                    >
                      <h2 className="accordion-header" id="headingThreess">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThreess"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          How reliable is recharge com?
                        </button>
                      </h2>
                      <div
                        id="collapseThreess"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThreess"
                        data-bs-parent="#accordionExample2"
                      >
                        <div className="accordion-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when
                          </p>
                        </div>
                      </div>
                    </div>
                    {/*Accordion items*/}
                    <div
                      className="accordion-item wow fadeInUp"
                      data-wow-duration="1.6s"
                    >
                      <h2 className="accordion-header" id="headingThreemss">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThreemss"
                          aria-expanded="false"
                          aria-controls="collapseThreem"
                        >
                          What is recharge application?
                        </button>
                      </h2>
                      <div
                        id="collapseThreemss"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThreemss"
                        data-bs-parent="#accordionExample2"
                      >
                        <div className="accordion-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when
                          </p>
                        </div>
                      </div>
                    </div>
                    {/*Accordion items*/}
                    <div
                      className="accordion-item wow fadeInUp"
                      data-wow-duration="1.8s"
                    >
                      <h2 className="accordion-header" id="headingThreemmss">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThreemmss"
                          aria-expanded="false"
                          aria-controls="collapseThreemm"
                        >
                          How do I recharge a phone number?
                        </button>
                      </h2>
                      <div
                        id="collapseThreemmss"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThreemmss"
                        data-bs-parent="#accordionExample2"
                      >
                        <div className="accordion-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when
                          </p>
                        </div>
                      </div>
                    </div>
                    {/*Accordion items*/}
                    <div
                      className="accordion-item wow fadeInUp"
                      data-wow-duration="1.9s"
                    >
                      <h2 className="accordion-header" id="headingThreemmmss">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThreemmmss"
                          aria-expanded="false"
                          aria-controls="collapseThreemmm"
                        >
                          What is the primary function of the recharge payment
                          application?
                        </button>
                      </h2>
                      <div
                        id="collapseThreemmmss"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingThreemmmss"
                        data-bs-parent="#accordionExample2"
                      >
                        <div className="accordion-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IrctcPage;