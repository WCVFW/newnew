import React from "react";
import { FaSimCard } from "react-icons/fa";
import { MdNetworkCell } from "react-icons/md";
const WorkingSectionThree: React.FC = () => {
  const logos = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Jio_Logo.png",
      alt: "Jio",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Airtel_logo_2010.png",
      alt: "Airtel",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/05/BSNL_Logo.svg",
      alt: "BSNL",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Vodafone_Idea_logo.svg/512px-Vodafone_Idea_logo.svg.png",
      alt: "Vi",
    },
  ];

  const duplicatedLogos = [...logos, ...logos, ...logos]; // Duplicate for a smoother, longer scroll

  return (
    <>
      <style>
        {`
          /* --- Logo Scroller Animation --- */
          .logo-scroller {
            background: #fff;
            padding: 40px 0;
            overflow: hidden;
            white-space: nowrap;
            position: relative;
            border-top: 1px solid #f0f0f0;
            border-bottom: 1px solid #f0f0f0;
          }
          .logo-scroller:before,
          .logo-scroller:after {
            content: '';
            position: absolute;
            top: 0;
            width: 150px;
            height: 100%;
            z-index: 2;
          }
          .logo-scroller:before {
            left: 0;
            background: linear-gradient(to left, rgba(255, 255, 255, 0), #fff);
          }
          .logo-scroller:after {
            right: 0;
            background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff);
          }
          .logo-scroller-inner {
            display: inline-block;
            animation: scroll 40s linear infinite;
          }
          .logo-scroller-inner img {
            height: 40px;
            margin: 0 40px;
            filter: grayscale(100%);
            opacity: 0.6;
            transition: filter 0.3s, opacity 0.3s;
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
        `}
      </style>
      {/* --- Logo Scroller Section --- */}
      <section className="logo-scroller">
        <div className="logo-scroller-inner">
          {duplicatedLogos.map((logo, index) => (
            <img key={index} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </section>
      <section className="bgsection">
        <div className="container">
          <div className="row gx-5 justify-content-between align-items-center">
            <div className="col-xl-5 col-lg-5">
              <div className="refer__thumb">
                <img src="../assets/img/refer/referthumb.png" alt="thumb" />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="refer__content minusten">
                <div className="section__header wow fadeInDown">
                  <h2>Refer & Earn</h2>
                  <p>
                    Refer your friends and earn up to $20. There are many
                    variations of passages of Lorem Ipsum available, but the
                    have suffered alteration in some form, by injected humour,
                    or randomised words which don't look even slightly
                    believable. If you are going to use...
                  </p>
                </div>
                <div className="refer__wrap pt__20">
                  <div
                    className="refer__item wow fadeInUp"
                    data-wow-duration="1.2s"
                  >
                    <div className="icon">
                      <img src="../assets/img/refer/boxspeaker.png" alt="img" />
                    </div>
                    <div className="content">
                      <h5>Refer your friends</h5>
                      <p>
                        Share your referral link with friends. Thry get &10.
                      </p>
                    </div>
                  </div>
                  <div
                    className="refer__item wow fadeInUp"
                    data-wow-duration="1.4s"
                  >
                    <div className="icon">
                      <img src="../assets/img/refer/boxregister.png" alt="img" />
                    </div>
                    <div className="content">
                      <h5>Register yor friends</h5>
                      <p>
                        Your friends Register with using your referral link.
                      </p>
                    </div>
                  </div>
                  <div
                    className="refer__item wow fadeInUp"
                    data-wow-duration="1.6s"
                  >
                    <div className="icon">
                      <img src="../assets/img/refer/boxamount.png" alt="img" />
                    </div>
                    <div className="content">
                      <h5>Earn You</h5>
                      <p>$20. You can use these credits to take recharge.</p>
                    </div>
                  </div>
                </div>
                <a
                  href="help-support.html"
                  className="cmn__btn wow fadeInUp"
                  data-wow-duration="1.8s"
                >
                  <span>Get Started Earn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flower__refer">
          <img src="../assets/img/refer/flowerrefer.png" alt="img" />
        </div> */}
      </section>
      <section className="working__section__three pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section__header section__center pb__40">
                <h2 style={{ color: "indigo" }}>How It Works</h2>
                <p>
                  Getting started with Calzone Pay is quick and easy. Follow
                  these simple steps to begin managing your payments
                  effortlessly.
                </p>
              </div>
            </div>
          </div>
          <div className="row g-4 justify-content-center align-items-center">
            <div className="col-lg-5 col-md-5">
              <div className="working__wrapitems__three">
                <div className="row justify-content-between">
                  <div className="col-xl-12 working__space">
                    <div
                      className="working__itemstwo affter__one wow fadeInUp"
                      data-wow-duration=".9s"
                    >
                      <span className="list">01</span>
                      <div className="icon"> </div>
                      <div className="content">
                        <h5>Create Your Account</h5>
                        <p>
                          Sign up for a free Calzone Pay account in just a few
                          minutes. All you need is your mobile number.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div
                      className="working__itemstwo affter__three wow fadeInUp"
                      data-wow-duration="1.2s"
                    >
                      <span className="list">03</span>
                      <div className="icon"></div>
                      <div className="content">
                        <h5>Start Transacting</h5>
                        <p>
                          You're all set! Start recharging, paying bills, or
                          sending money instantly with our user-friendly
                          interface.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2">
              <div className="borders"></div>
            </div>
            <div className="col-xl-5 col-md-5">
              <div
                className="working__itemstwo affter__two wow fadeInUp"
                data-wow-duration="1.8s"
              >
                <span className="list">03</span>
                <div className="icon"></div>
                <div className="content">
                  <h5>Add Money to Wallet</h5>
                  <p>
                    Securely add funds to your wallet using UPI, credit/debit
                    cards, or net banking for faster checkouts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="working__3shape">
          <img src="../assets/img/working/working3shape.png" alt="img" />
        </div>
      </section>

   <section className="bgsection pt-120 pb-120">
      <div className="container">
         <div className="row flex-row-reverse  justify-content-between align-items-center">
            <div className="col-xl-6 col-lg-6">
               <div className="qustion__content relative">
                  <div className="section__header pb__40 wow fadeInDown">
                     <h2>
                        If you got questions we have answer
                     </h2>
                     <p>
                        There are many variations of passages of Lorem Ipsum available, but the have suffered alteration
                        in some form, by injected humour, or randomised words which don't look even slightly believable.
                        If you are going to use... have suffered alteration in some form, by injected humour, or
                        randomised words which don't look even slightly believable. If you are going to use...
                     </p>
                  </div>
                  <div className="accordion__wrap">
                     <div className="accordion" id="accordionExample">
                        <div className="accordion-item wow fadeInUp" data-wow-duration="0.9s">
                           <h2 className="accordion-header" id="headingOne">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                 data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                 What is e recharge?
                              </button>
                           </h2>
                           <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample">
                              <div className="accordion-body">
                                 <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy text ever since the 1500s, when
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div className="accordion-item wow fadeInUp" data-wow-duration="1.2s">
                           <h2 className="accordion-header" id="headingTwo">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                 data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                 What is recharge credit?
                              </button>
                           </h2>
                           <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample">
                              <div className="accordion-body">
                                 <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy text ever since the 1500s, when
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div className="accordion-item wow fadeInUp" data-wow-duration="1.4s">
                           <h2 className="accordion-header" id="headingThree">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                 data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                 How reliable is recharge com?
                              </button>
                           </h2>
                           <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                              data-bs-parent="#accordionExample">
                              <div className="accordion-body">
                                 <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy text ever since the 1500s, when
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-xl-5 col-lg-5 wow fadeInDown" data-wow-duration="0.9">
               <div className="qustion__thumb">
                  <img src="../assets/img/refer/qustion.png" alt=""/>
               </div>
            </div>
         </div>
      </div>
      {/* <div className="qustion__shape">
         <img src="../assets/img/refer/qustion-shape.png" alt="img"/>
      </div> */}
   </section>
    </>
  );
};

export default WorkingSectionThree;
