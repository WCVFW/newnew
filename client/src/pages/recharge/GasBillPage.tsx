import React, { useState } from "react";
// Import icons
import { FaBuilding, FaUserAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsFuelPump } from 'react-icons/bs';
// Import animation library
import { motion, AnimatePresence } from 'framer-motion';

// --- FAQ data moved outside the component as it's a constant ---
const faqData = [
  { 
    q: "Where can I find my Customer ID?", 
    a: "Your Customer ID (or BP Number) is usually mentioned on your previous gas bills, either at the top or in the account summary section." 
  },
  { 
    q: "How long does it take for the payment to be processed?", 
    a: "Payments are typically processed within 24-48 hours. You will receive an instant confirmation from us and a confirmation from your provider." 
  },
  { 
    q: "What are the payment modes available?", 
    a: "We support all major payment modes including Credit/Debit Cards, Net Banking, UPI, and various mobile wallets." 
  },
  { 
    q: "Is it safe to pay my bill here?", 
    a: "Absolutely. We use industry-standard 256-bit SSL encryption to ensure that your transaction details are always secure." 
  }
];

// --- Main Page Component ---
const GasBillPaymentPage: React.FC = () => {
  // State for the accordion, default open the first item
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      
      {/* 1. Header Section with Animation and Icon */}
      <motion.section 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-linear-to-r from-pink-500 to-orange-400 text-white py-16 md:py-20"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold">Piped Gas Bill Payment</h1>
            <p className="text-lg md:text-xl mt-2 opacity-90">Pay your gas bills online quickly and conveniently.</p>
          </div>
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
          >
            <BsFuelPump className="text-7xl md:text-9xl text-white/40" />
          </motion.div>
        </div>
      </motion.section>

      {/* 2. Form Section with "float" effect and animation */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="container mx-auto px-4"
      >
        {/* The card itself */}
        <div className="relative z-10 bg-white p-6 md:p-10 rounded-xl shadow-xl -mt-12">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">Pay Your Gas Bill</h3>
          
          <form className="max-w-lg mx-auto">
            <div className="space-y-6">
              
              {/* Operator Input with Icon */}
              <div>
                <label htmlFor="operator" className="block text-sm font-medium text-gray-700 mb-1">
                  Operator
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaBuilding className="text-gray-400" />
                  </span>
                  <select 
                    id="operator" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-200"
                  >
                    <option value="">Select your gas provider...</option>
                    <option value="MGL">Mahanagar Gas Limited (MGL)</option>
                    <option value="IGL">Indraprastha Gas Limited (IGL)</option>
                    <option value="Adani">Adani Gas</option>
                    <option value="GAIL">GAIL (India) Ltd.</option>
                  </select>
                </div>
              </div>
              
              {/* Customer ID Input with Icon */}
              <div>
                <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer ID / BP Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUserAlt className="text-gray-400" />
                  </span>
                  <input 
                    type="text" 
                    id="customerId" 
                    placeholder="Enter your Customer ID" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-200" 
                  />
                </div>
              </div>
              
              {/* Submit Button with Animation */}
              <div className="text-center pt-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="w-full md:w-auto bg-pink-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-pink-700 transition duration-300 ease-in-out shadow-lg hover:shadow-pink-300"
                >
                  Fetch Bill
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>

      {/* 3. FAQ Section with Animation */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                
                {/* Accordion Header */}
                <h2 className="mb-0">
                  <button
                    className={`w-full flex justify-between items-center text-left p-5 font-semibold text-lg ${
                      activeFaq === index ? 'text-pink-600' : 'text-gray-700'
                    } hover:bg-gray-100 focus:outline-none transition-colors duration-300`}
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  >
                    <span>{faq.q}</span>
                    {activeFaq === index ? <FaChevronUp className="text-pink-600" /> : <FaChevronDown className="text-gray-400" />}
                  </button>
                </h2>
                
                {/* 4. Animated Accordion Body */}
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 bg-white border-t border-gray-200">
                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

    </div>
  );
};

export default GasBillPaymentPage;