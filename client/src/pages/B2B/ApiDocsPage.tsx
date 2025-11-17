import React, { useState } from 'react';
import { mainNavLinks } from '../../components/Navbar';
import { FaCopy } from 'react-icons/fa';

interface ApiSectionProps {
  title: string;
  description: string;
  endpoint: string;
  method: 'GET' | 'POST';
  body?: string;
  response?: string;
}

const ApiSection: React.FC<ApiSectionProps> = ({ title, description, endpoint, method, body, response }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here for better UX
  };

  return (
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
      <p><strong>Endpoint:</strong> <code>{method} {endpoint}</code></p>
      <p><strong>Headers:</strong></p>
      <ul>
        <li><code>Authorization: Bearer YOUR_API_KEY</code></li>
        {method === 'POST' && <li><code>Content-Type: application/json</code></li>}
      </ul>
      {body && (
        <>
          <p><strong>Example Body:</strong></p>
          <div className="position-relative">
            <pre className="bg-light p-3 rounded"><code>{body}</code></pre>
            <button onClick={() => copyToClipboard(body)} className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-2"><FaCopy /></button>
          </div>
        </>
      )}
      {response && (
        <>
          <p><strong>Example Success Response (200):</strong></p>
          <div className="position-relative">
            <pre className="bg-light p-3 rounded"><code>{response}</code></pre>
            <button onClick={() => copyToClipboard(response)} className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-2"><FaCopy /></button>
          </div>
        </>
      )}
    </div>
  );
};

const ApiDocsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('/introduction');

  const renderSection = () => {
    switch (activeSection) {
      case '/recharge/mobile':
        return (
          <ApiSection
            title="Mobile Recharge API"
            description="Endpoint to perform a mobile recharge."
            endpoint="/api/v1/recharge/mobile"
            method="POST"
            body={`{
  "operator_code": "V",
  "mobile_number": "9876543210",
  "amount": 199,
  "transaction_id": "YOUR_UNIQUE_ID_123"
}`}
          />
        );
      case '/aeps':
        return (
          <ApiSection
            title="AEPS (Aadhaar Withdrawal) API"
            description="Endpoint to initiate an Aadhaar Enabled Payment System transaction."
            endpoint="/api/v1/aeps/initiate"
            method="POST"
            body={`{
  "aadhaar_number": "123456789012",
  "mobile_number": "9876543210",
  "bank_iin": "607233",
  "amount": 1000,
  "transaction_type": "WAP"
}`}
          />
        );
      case '/dmt':
        return (
          <ApiSection
            title="DMT (Money Transfer) API"
            description="Endpoint to perform a domestic money transfer."
            endpoint="/api/v1/dmt/transfer"
            method="POST"
            body={`{
  "beneficiary_id": "BENE12345",
  "amount": 5000,
  "mode": "IMPS",
  "transaction_id": "YOUR_UNIQUE_ID_456"
}`}
          />
        );
      case '/recharge/dth':
        return (
          <ApiSection
            title="DTH Recharge API"
            description="Endpoint to recharge a DTH connection."
            endpoint="/api/v1/recharge/dth"
            method="POST"
            body={`{
  "operator_code": "TS",
  "customer_id": "1234567890",
  "amount": 350,
  "transaction_id": "YOUR_UNIQUE_ID_789"
}`}
          />
        );
      case '/balance':
        return (
          <ApiSection
            title="Check Balance API"
            description="Endpoint to check your current API wallet balance."
            endpoint="/api/v1/balance"
            method="GET"
            response={`{
  "status": "success",
  "balance": 10500.75
}`}
          />
        );
      default:
        // Default view for sections without specific examples yet
        const link = mainNavLinks.flatMap(g => g.submenu || []).find(s => s.href === activeSection);
        if (link) {
          return (
            <ApiSection
              title={`${link.label.split('(')[0].trim()} API`}
              description={`API documentation for ${link.label.split('(')[0].trim()} is under development. Please check back soon.`}
              endpoint={`/api/v1${link.href}`}
              method="POST"
            />
          );
        }
        return (
          <div>
            <h4>Introduction</h4>
            <p>Welcome to the Calzone Pay API documentation. Our RESTful API allows you to integrate our recharge and bill payment services directly into your own applications.</p>
            <h5 className="mt-4">Authentication</h5>
            <p>All API requests must be authenticated using a Bearer Token. Include your API key in the <code>Authorization</code> header for every request.</p>
            <div className="position-relative">
              <pre className="bg-light p-3 rounded"><code>Authorization: Bearer YOUR_API_KEY</code></pre>
              <button onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY')} className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-2"><FaCopy /></button>
            </div>
            <p className="mt-3">To get your API key, please log in to your partner dashboard or contact our support team.</p>
          </div>
        );
    }
  };

  return (
    <div className="container-fluid" style={{ paddingTop: '80px', paddingBottom: '80px', minHeight: '100vh' }}>
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar collapse position-fixed" style={{ height: 'calc(100vh - 80px)', top: '80px', overflowY: 'auto' }}>
          <div className="position-sticky pt-3">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-1 text-muted text-uppercase">
              <span>General</span>
            </h6>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className={`nav-link ${activeSection === '/introduction' ? 'active' : ''}`} href="#introduction" onClick={(e) => { e.preventDefault(); setActiveSection('/introduction'); }}>
                  Introduction
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeSection === '/balance' ? 'active' : ''}`} href="#balance" onClick={(e) => { e.preventDefault(); setActiveSection('/balance'); }}>
                  Check Balance
                </a>
              </li>
            </ul>
            {mainNavLinks.filter(g => g.label !== 'Support' && g.label !== 'B2B Services').map((group) => (
              group.type === 'dropdown' && (
                <React.Fragment key={group.label}>
                  <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-3 mb-1 text-muted text-uppercase">
                    <span>{group.label}</span>
                  </h6>
                  <ul className="nav flex-column mb-2">
                    {group.submenu?.map((item) => (
                      <li className="nav-item" key={item.href}>
                        <a className={`nav-link ${activeSection === item.href ? 'active' : ''}`} href={`#${item.href}`} onClick={(e) => { e.preventDefault(); setActiveSection(item.href); }}>
                          {item.label.split('(')[0].trim()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              )
            ))}
          </div>
        </nav>

        {/* Main content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">API Documentation</h1>
          </div>
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default ApiDocsPage;