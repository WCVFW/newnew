import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateRetailerPage: React.FC = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement retailer creation logic
    console.log('Creating Retailer:', formData);
  };

  return (
    <section className="pt-120 pb-120" style={{ background: '#f4f7f6' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold">Create New Retailer</h3>
                  <p className="text-muted">Fill out the form to onboard a new retailer.</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="shopName" name="shopName" placeholder="Shop Name" onChange={handleChange} required />
                        <label htmlFor="shopName">Shop Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="ownerName" name="ownerName" placeholder="Owner Name" onChange={handleChange} required />
                        <label htmlFor="ownerName">Owner Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Email Address" onChange={handleChange} required />
                        <label htmlFor="email">Email Address</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="tel" className="form-control" id="phone" name="phone" placeholder="Phone Number" onChange={handleChange} required />
                        <label htmlFor="phone">Phone Number</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="address" name="address" placeholder="Full Address" onChange={handleChange} required />
                        <label htmlFor="address">Full Address</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="city" name="city" placeholder="City" onChange={handleChange} required />
                        <label htmlFor="city">City</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="pincode" name="pincode" placeholder="Pincode" onChange={handleChange} required />
                        <label htmlFor="pincode">Pincode</label>
                      </div>
                    </div>
                  </div>
                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary cmn__btn btn-lg">
                      Create Retailer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateRetailerPage;