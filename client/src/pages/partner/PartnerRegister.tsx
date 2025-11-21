import React, { useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PartnerRegister: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        business_name: '',
        business_type: '',
        pan_number: '',
        gst_number: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/api/partner/register', formData);

            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'Your partner registration is pending approval',
                confirmButtonColor: '#6366f1'
            });

            navigate('/partner/dashboard');
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.response?.data?.message || 'Failed to register as partner',
                confirmButtonColor: '#6366f1'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Partner Registration</h1>
                        <p className="text-indigo-100 text-lg">Join our partner program and start earning</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Business Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="business_name"
                                value={formData.business_name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                                placeholder="Enter your business name"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Business Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="business_type"
                                value={formData.business_type}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                            >
                                <option value="">Select business type</option>
                                <option value="Retailer">Retailer</option>
                                <option value="Distributor">Distributor</option>
                                <option value="Super Distributor">Super Distributor</option>
                                <option value="Franchise">Franchise</option>
                                <option value="Agent">Agent</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                PAN Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="pan_number"
                                value={formData.pan_number}
                                onChange={handleChange}
                                required
                                maxLength={10}
                                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none uppercase"
                                placeholder="ABCDE1234F"
                            />
                            <p className="text-sm text-gray-500 mt-1">Format: ABCDE1234F</p>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                GST Number (Optional)
                            </label>
                            <input
                                type="text"
                                name="gst_number"
                                value={formData.gst_number}
                                onChange={handleChange}
                                maxLength={15}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none uppercase"
                                placeholder="22AAAAA0000A1Z5"
                            />
                            <p className="text-sm text-gray-500 mt-1">Format: 22AAAAA0000A1Z5</p>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mt-8">
                            <h3 className="font-bold text-gray-800 mb-4 text-lg">Partner Benefits</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">Earn up to 3% commission on every transaction</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">Manage unlimited customers</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">Real-time earnings tracking</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">Instant wallet withdrawals</span>
                                </li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                'Register as Partner'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/partner/dashboard')}
                            className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PartnerRegister;
