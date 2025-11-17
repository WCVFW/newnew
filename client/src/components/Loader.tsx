import React from 'react';
import './Loader.css'; // We'll create this file next

const Loader: React.FC = () => {
  return (
    <div className="pl">
      {/* Generate the 12 dots programmatically */}
      {[...Array(12)].map((_, index) => (
        <div key={index} className="pl__dot"></div>
      ))}
      <div className="pl__text">Loading…</div>
    </div>
  );
};

export default Loader;