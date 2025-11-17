import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqData = [
    { q: "How long does it take to get a response?", a: "Our support team aims to respond to all inquiries within 24 business hours. For urgent issues, please mention 'Urgent' in your subject line." },
    { q: "Do you offer support on weekends?", a: "Our standard support hours are Monday to Friday, 9 AM to 6 PM. Limited support is available for critical issues on weekends." },
    { q: "I have a business inquiry. Who should I contact?", a: "For partnership or business-related questions, please email us directly at business@calzonepay.com or use the form below with the subject 'Business Inquiry'." },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic (e.g., send to backend API)
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you shortly.');
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      {/* Page Header */}
      <section 
        className="page-header-section" 
        style={{ 
          backgroundImage: "url('assets/img/contact/contact-bg.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center center' 
        }}
      >
        <div className="container-fluid text-white text-center" style={{ backgroundColor: 'rgba(18, 43, 93, 0.7)', padding: '100px 20px' }}>
          <h1 className="display-4 fw-bold wow fadeInDown">Get In Touch</h1>
          <p className="lead wow fadeInUp" data-wow-delay="0.2s">We'd love to hear from you. Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pt-120 pb-60">
        <div className="container-fluid px-lg-5">
          <div className="row g-4 justify-content-center text-center wow fadeInUp">
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-duration="1s">
              <div className="card h-100 p-4 shadow-sm border-0">
                <FaMapMarkerAlt size={40} className="mx-auto text-primary mb-3" />
                <div className="card-body">
                  <h5 className="card-title">Our Office</h5>
                  <p className="card-text text-muted">123 Business Bay, Downtown, Dubai, UAE</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-duration="1.2s">
              <div className="card h-100 p-4 shadow-sm border-0">
                <FaEnvelope size={40} className="mx-auto text-success mb-3" />
                <div className="card-body">
                  <h5 className="card-title">Email Us</h5>
                  <p className="card-text text-muted">support@calzonepay.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-duration="1.4s">
              <div className="card h-100 p-4 shadow-sm border-0">
                <FaPhoneAlt size={40} className="mx-auto text-danger mb-3" />
                <div className="card-body">
                  <h5 className="card-title">Call Us</h5>
                  <p className="card-text text-muted">+91 123 456 7890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div className="row g-5 mt-5 pt-5 align-items-stretch">
            <div className="col-lg-6 wow fadeInLeft">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <h3 className="fw-bold mb-4">Send us a Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input type="email" className="form-control" id="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                          <label htmlFor="email">Your Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input type="text" className="form-control" id="subject" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                          <label htmlFor="subject">Subject</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea className="form-control" id="message" name="message" placeholder="Your Message" style={{ height: '150px' }} value={formData.message} onChange={handleChange} required></textarea>
                          <label htmlFor="message">Your Message</label>
                        </div>
                      </div>
                    </div>
                    <div className="d-grid mt-4">
                      <button type="submit" className="btn btn-primary cmn__btn btn-lg">Send Message</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight">
              <div className="map-wrapper shadow-lg" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.81956135078813!3d-6.19474139550392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356280477!2sNational%20Monument!5e0!3m2!1sen!2sid!4v1627888535153!5m2!1sen!2sid" width="100%" height="550" style={{ border: 0 }} allowFullScreen loading="lazy" title="Office Location"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section bg-light pt-60 pb-120">
        <div className="container-fluid px-lg-5">
          <div className="section__header section__center wow fadeInDown">
            <h2>Frequently Asked Questions</h2>
            <p>Find quick answers to common questions about our services and support.</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="contactFaqAccordion">
                {faqData.map((faq, index) => (
                  <div className="accordion-item wow fadeInUp" data-wow-delay={`${index * 0.1}s`} key={index}>
                    <h2 className="accordion-header" id={`faq-heading-${index}`}>
                      <button
                        className={`accordion-button ${activeFaq !== index ? 'collapsed' : ''}`}
                        type="button"
                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      >
                        {faq.q}
                      </button>
                    </h2>
                    <div id={`faq-collapse-${index}`} className={`accordion-collapse collapse ${activeFaq === index ? 'show' : ''}`}>
                      <div className="accordion-body">{faq.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;