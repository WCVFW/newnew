import React, { useState } from 'react';

const RaiseTicketPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    category: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement ticket submission logic
    console.log('Submitting Ticket:', formData);
    alert('Your ticket has been submitted successfully!');
  };

  return (
    <section className="pt-120 pb-120" style={{ background: '#f4f7f6' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold">Submit a Support Ticket</h3>
                  <p className="text-muted">Our team will get back to you as soon as possible.</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Your Email" onChange={handleChange} required />
                        <label htmlFor="email">Your Email Address</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select className="form-select" id="category" name="category" onChange={handleChange} required>
                          <option value="">Select Category...</option>
                          <option value="payment">Payment Issue</option>
                          <option value="recharge">Recharge Failed</option>
                          <option value="account">Account Problem</option>
                          <option value="api">API Support</option>
                          <option value="other">Other</option>
                        </select>
                        <label htmlFor="category">Issue Category</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="subject" name="subject" placeholder="Subject" onChange={handleChange} required />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea className="form-control" id="message" name="message" placeholder="Describe your issue" style={{ height: '150px' }} onChange={handleChange} required></textarea>
                        <label htmlFor="message">Describe your issue in detail</label>
                      </div>
                    </div>
                  </div>
                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary cmn__btn btn-lg">
                      Submit Ticket
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

export default RaiseTicketPage;