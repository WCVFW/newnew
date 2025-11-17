import React from 'react';

const commissionData = [
  { service: 'Mobile Recharge', retailer: '2.5%', distributor: '0.5%' },
  { service: 'DTH Recharge', retailer: '3.0%', distributor: '0.8%' },
  { service: 'Electricity Bill', retailer: '₹5 per bill', distributor: '₹1 per bill' },
  { service: 'AEPS Withdrawal', retailer: '0.2% (Max ₹8)', distributor: '0.05% (Max ₹2)' },
  { service: 'DMT', retailer: '0.45% (Min ₹5)', distributor: '0.1%' },
  { service: 'PAN Card', retailer: '₹8 per card', distributor: '₹2 per card' },
];

const CommissionPage: React.FC = () => {
  return (
    <section className="pt-120 pb-120">
      <div className="container">
        <div className="section__header section__center wow fadeInDown">
          <h2>Our Commission Structure</h2>
          <p>Transparent and competitive commissions for all our partners.</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover table-striped mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">Service</th>
                        <th scope="col">Retailer Commission</th>
                        <th scope="col">Distributor Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissionData.map((item, index) => (
                        <tr key={index}>
                          <td>{item.service}</td>
                          <td>{item.retailer}</td>
                          <td>{item.distributor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-muted small">
                *Commissions are subject to change. Please refer to the official communication for the latest rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommissionPage;