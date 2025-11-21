import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface PartnerStats {
    totalCustomers: number;
    totalEarnings: number;
    pendingCommissions: number;
    walletBalance: number;
    thisMonthEarnings: number;
}

const PartnerDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<PartnerStats>({
        totalCustomers: 0,
        totalEarnings: 0,
        pendingCommissions: 0,
        walletBalance: 0,
        thisMonthEarnings: 0
    });
    const [loading, setLoading] = useState(true);
    const [isPartner, setIsPartner] = useState(false);

    useEffect(() => {
        fetchPartnerData();
    }, []);

    const fetchPartnerData = async () => {
        try {
            // Check if user is a partner
            const profileRes = await api.get('/api/partner/profile');
            setIsPartner(true);

            // Fetch earnings
            const earningsRes = await api.get('/api/partner/earnings');
            const customersRes = await api.get('/api/partner/customers');

            setStats({
                totalCustomers: customersRes.data.customers?.length || 0,
                totalEarnings: earningsRes.data.total_earnings || 0,
                pendingCommissions: earningsRes.data.pending_commissions || 0,
                walletBalance: earningsRes.data.wallet_balance || 0,
                thisMonthEarnings: earningsRes.data.this_month_earnings || 0
            });
        } catch (error: any) {
            if (error.response?.status === 404) {
                setIsPartner(false);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBecomePartner = () => {
        navigate('/partner/register');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
            </div>
        );
    }

    if (!isPartner) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-center">
                            <h1 className="text-4xl font-bold text-white mb-4">Become a Partner</h1>
                            <p className="text-indigo-100 text-lg">Join our partner program and start earning commissions</p>
                        </div>

                        <div className="p-8">
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                                    <div className="text-4xl mb-3">💰</div>
                                    <h3 className="font-bold text-gray-800 mb-2">Earn Commission</h3>
                                    <p className="text-gray-600 text-sm">Up to 3% on every transaction</p>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                                    <div className="text-4xl mb-3">👥</div>
                                    <h3 className="font-bold text-gray-800 mb-2">Manage Customers</h3>
                                    <p className="text-gray-600 text-sm">Build your customer base</p>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                                    <div className="text-4xl mb-3">📊</div>
                                    <h3 className="font-bold text-gray-800 mb-2">Track Earnings</h3>
                                    <p className="text-gray-600 text-sm">Real-time analytics dashboard</p>
                                </div>
                            </div>

                            <button
                                onClick={handleBecomePartner}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                            >
                                Register as Partner
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Partner Dashboard
                    </h1>
                    <p className="text-gray-600">Manage your business and track your earnings</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-600 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-indigo-100 p-3 rounded-xl">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">Wallet Balance</p>
                        <p className="text-3xl font-bold text-gray-800">₹{stats.walletBalance.toFixed(2)}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-600 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-green-100 p-3 rounded-xl">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
                        <p className="text-3xl font-bold text-gray-800">₹{stats.totalEarnings.toFixed(2)}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-600 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-yellow-100 p-3 rounded-xl">
                                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">Pending Commissions</p>
                        <p className="text-3xl font-bold text-gray-800">₹{stats.pendingCommissions.toFixed(2)}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-600 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-purple-100 p-3 rounded-xl">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">Total Customers</p>
                        <p className="text-3xl font-bold text-gray-800">{stats.totalCustomers}</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <button
                        onClick={() => navigate('/partner/customers')}
                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-left"
                    >
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-xl inline-block mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Manage Customers</h3>
                        <p className="text-gray-600">Add and manage your customer base</p>
                    </button>

                    <button
                        onClick={() => navigate('/partner/earnings')}
                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-left"
                    >
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl inline-block mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">View Earnings</h3>
                        <p className="text-gray-600">Track your commission history</p>
                    </button>

                    <button
                        onClick={() => navigate('/partner/withdrawal')}
                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-left"
                    >
                        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-xl inline-block mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Request Withdrawal</h3>
                        <p className="text-gray-600">Withdraw your earnings to bank</p>
                    </button>
                </div>

                {/* This Month Performance */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">This Month's Performance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                            <p className="text-gray-600 mb-2">Monthly Earnings</p>
                            <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                ₹{stats.thisMonthEarnings.toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                            <p className="text-gray-600 mb-2">Growth Rate</p>
                            <p className="text-4xl font-bold text-green-600">+12.5%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerDashboard;
