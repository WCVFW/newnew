import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaUniversity, FaFingerprint, FaRupeeSign, FaQuestionCircle, FaShieldAlt, FaClock, FaTags, FaMobileAlt, FaAddressCard } from 'react-icons/fa';

type ServiceType = 'withdrawal' | 'inquiry';

interface AepsFormData {
  aadhaarNumber: string;
  mobileNumber: string;
  bank: string;
  amount: string;
}

const AepsPage: React.FC = () => {
  const [serviceType, setServiceType] = useState<ServiceType>('withdrawal');
  const [formData, setFormData] = useState<AepsFormData>({
    aadhaarNumber: '',
    mobileNumber: '',
    bank: '',
    amount: '',
  });

  return (
    <>
      {/* AEPS Hero Section */}
      <section className="hotel__booksection bus__booksection">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xxl-6 col-xl-6 col-lg-7">
              <div className="hotel__content">
                <h1 className="wow fadeInDown" data-wow-duration="2s">
                  Aadhaar Enabled Payment System (AEPS)
                </h1>
                <p className="wow fadeInUp max-636" data-wow-duration="2s">
                  One-touch Aadhaar banking services. Perform cash withdrawals, balance inquiries, and more using just your fingerprint.
                </p>
                <div className="cmn__grp">
                  <a href="#aeps-form" className="cmn__btn">
                    <span>Use AEPS Now</span>
                  </a>
                  <a href="/about" className="cmn__btn outline__btn">
                    <span>Learn More</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xxl-5 col-xl-6 col-lg-5">
              <div className="busbanner wow fadeInRight" data-wow-duration="3s">
                <img src="assets/img/illustrations/aeps-illustration.png" alt="Aadhaar Banking Services" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AEPS Form Section */}
      <div id="aeps-form" className="hotelbokking__categoris">
        <div className="container">
          <div className="hotelbooking__categoris__wrap">
            <div className="dating__body">
              <h5 className="hoteltitle">Aadhaar Micro Banking</h5>
              <div className="booking__radio mb__30">
                <div className="b__radio">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="serviceType"
                    id="withdrawal"
                    checked={serviceType === 'withdrawal'}
                    onChange={() => setServiceType('withdrawal')}
                  />
                  <label className="form-check-label" htmlFor="withdrawal">
                    Aadhaar Cash Withdrawal
                  </label>
                </div>
                <div className="b__radio">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="serviceType"
                    id="inquiry"
                    checked={serviceType === 'inquiry'}
                    onChange={() => setServiceType('inquiry')}
                  />
                  <label className="form-check-label" htmlFor="inquiry">
                    Balance Inquiry
                  </label>
                </div>
              </div>
              <div className="dating__body__box dating__flight">
                <form onSubmit={(e: FormEvent) => {
                  e.preventDefault();
                  // Handle form submission logic here
                  console.log('Form submitted:', { serviceType, ...formData });
                }}>
                  <div className="row justify-content-center g-3">
                    <div className="col-12 col-md-6 col-lg-3">
                      <div className="dating__item dating__hidden">
                        <input 
                          type="text" 
                          placeholder="Aadhaar Number" 
                          value={formData.aadhaarNumber}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, aadhaarNumber: e.target.value})}
                          required 
                        />
                        <span className="calendaricon"><FaAddressCard /></span>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                      <div className="dating__item dating__hidden">
                        <input 
                          type="text" 
                          placeholder="Mobile Number" 
                          value={formData.mobileNumber}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, mobileNumber: e.target.value})}
                          required 
                        />
                        <span className="calendaricon"><FaMobileAlt /></span>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                      <div className="dating__item select__border">
                        <select name="bank" required value={formData.bank} onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({...formData, bank: e.target.value})}>
                          <option value="">Select Bank</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          {/* TODO: It would be better to map over an array of banks here */}
                        </select>
                      </div>
                    </div>
                    {serviceType === 'withdrawal' && (
                      <div className="col-12 col-md-6 col-lg-3">
                        <div className="dating__item dating__hidden">
                          <input 
                            type="number" 
                            placeholder="Amount (₹)" 
                            value={formData.amount}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, amount: e.target.value})}
                            required 
                          />
                          <span className="calendaricon"><FaRupeeSign /></span>
                        </div>
                      </div>
                    )}
                    <div className="col-12 col-lg-3">
                      <div className="dating__item">
                        <button type="submit" className="cmn__btn w-100">
                          <FaFingerprint className="me-2" />
                          <span>Scan Fingerprint</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <section className="hotel__facilities bgsection pt-120 pb-120">
        <div className="container">
          <div className="section__header section__center wow fadeInDown">
            <h2>Banking with Aadhaar: Simple & Secure</h2>
            <p>Unlock a world of banking services with just your Aadhaar number and fingerprint.</p>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="hotel__facilities__item">
                <div className="head__wrap"><FaRupeeSign size={40} className="mb-3" /><h5>Aadhaar CashOut Service</h5></div>
                <p>Withdraw cash from your bank account without visiting a bank or ATM.</p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="hotel__facilities__item">
                <div className="head__wrap"><FaQuestionCircle size={40} className="mb-3" /><h5>Balance Inquiry</h5></div>
                <p>Check your account balance instantly and securely anytime, anywhere.</p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="hotel__facilities__item">
                <div className="head__wrap"><FaShieldAlt size={40} className="mb-3" /><h5>Highly Secure</h5></div>
                <p>Biometric authentication ensures that your transactions are always safe.</p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="hotel__facilities__item">
                <div className="head__wrap"><FaUniversity size={40} className="mb-3" /><h5>All Banks Supported</h5></div>
                <p>Our AEPS service works with all major banks across India.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AepsPage;