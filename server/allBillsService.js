/**
 * AllBills API Service
 * Integration with AllBills API for recharge, DTH, and bill payments
 */

import axios from 'axios';

const ALLBILLS_CONFIG = {
    baseURL: 'https://api.allbills.in',
    customer_id: '3176029605',
    token: '6FGuGViLkD0f4Y2UppBonx00l'
};

class AllBillsService {
    constructor() {
        this.api = axios.create({
            baseURL: ALLBILLS_CONFIG.baseURL,
            timeout: 30000
        });
    }

    /**
     * Fetch mobile prepaid plans
     * @param {number} circle - Circle ID
     * @param {number} operator - Operator ID
     */
    async getMobilePlans(circle, operator) {
        try {
            const response = await this.api.get('/operatorapi/prepaid', {
                params: {
                    customer_id: ALLBILLS_CONFIG.customer_id,
                    token: ALLBILLS_CONFIG.token,
                    circle,
                    operator
                }
            });
            return response.data;
        } catch (error) {
            console.error('AllBills getMobilePlans error:', error.message);
            throw new Error('Failed to fetch mobile plans');
        }
    }

    /**
     * Fetch DTH plans
     * @param {number} operator - DTH Operator ID
     */
    async getDTHPlans(operator) {
        try {
            const response = await this.api.get('/operatorapi/dthplan', {
                params: {
                    customer_id: ALLBILLS_CONFIG.customer_id,
                    token: ALLBILLS_CONFIG.token,
                    operator
                }
            });
            return response.data;
        } catch (error) {
            console.error('AllBills getDTHPlans error:', error.message);
            throw new Error('Failed to fetch DTH plans');
        }
    }

    /**
     * Process mobile recharge payment
     * @param {number} operator - Operator ID
     * @param {number} amount - Recharge amount
     * @param {string} mobile - Mobile number
     * @param {string} orderno - Order number
     */
    async processMobileRecharge(operator, amount, mobile, orderno) {
        try {
            const response = await this.api.get('/billpay/paynow', {
                params: {
                    customer_id: ALLBILLS_CONFIG.customer_id,
                    token: ALLBILLS_CONFIG.token,
                    operator,
                    amount,
                    mobile,
                    orderno
                }
            });
            return response.data;
        } catch (error) {
            console.error('AllBills processMobileRecharge error:', error.message);
            throw new Error('Failed to process mobile recharge');
        }
    }

    /**
     * Process DTH recharge payment
     * @param {number} operator - DTH Operator ID
     * @param {number} amount - Recharge amount
     * @param {string} mobile - DTH customer ID / mobile
     * @param {string} orderno - Order number
     */
    async processDTHRecharge(operator, amount, mobile, orderno) {
        try {
            const response = await this.api.get('/billpay/paynow', {
                params: {
                    customer_id: ALLBILLS_CONFIG.customer_id,
                    token: ALLBILLS_CONFIG.token,
                    operator,
                    amount,
                    mobile,
                    orderno
                }
            });
            return response.data;
        } catch (error) {
            console.error('AllBills processDTHRecharge error:', error.message);
            throw new Error('Failed to process DTH recharge');
        }
    }

    /**
     * Get operator list
     */
    async getOperators() {
        // This would typically come from AllBills API
        // For now, returning a static list based on common operators
        return {
            mobile: [
                { id: 1, name: 'Airtel', type: 'prepaid' },
                { id: 2, name: 'Jio', type: 'prepaid' },
                { id: 3, name: 'Vi (Vodafone Idea)', type: 'prepaid' },
                { id: 4, name: 'BSNL', type: 'prepaid' },
                { id: 5, name: 'Airtel Postpaid', type: 'postpaid' },
                { id: 6, name: 'Jio Postpaid', type: 'postpaid' },
                { id: 7, name: 'Vi Postpaid', type: 'postpaid' }
            ],
            dth: [
                { id: 31, name: 'Tata Sky' },
                { id: 32, name: 'Airtel Digital TV' },
                { id: 33, name: 'Dish TV' },
                { id: 34, name: 'Videocon D2H' },
                { id: 35, name: 'Sun Direct' }
            ],
            circles: [
                { id: 1, name: 'Andhra Pradesh' },
                { id: 2, name: 'Assam' },
                { id: 3, name: 'Bihar' },
                { id: 4, name: 'Chennai' },
                { id: 5, name: 'Delhi' },
                { id: 6, name: 'Gujarat' },
                { id: 7, name: 'Haryana' },
                { id: 8, name: 'Himachal Pradesh' },
                { id: 9, name: 'Jammu Kashmir' },
                { id: 10, name: 'Karnataka' },
                { id: 11, name: 'Kerala' },
                { id: 12, name: 'Kolkata' },
                { id: 13, name: 'Maharashtra' },
                { id: 14, name: 'Mumbai' },
                { id: 15, name: 'Madhya Pradesh' },
                { id: 16, name: 'North East' },
                { id: 17, name: 'Orissa' },
                { id: 18, name: 'Punjab' },
                { id: 19, name: 'Rajasthan' },
                { id: 20, name: 'Tamil Nadu' },
                { id: 21, name: 'UP East' },
                { id: 22, name: 'UP West' },
                { id: 23, name: 'West Bengal' }
            ]
        };
    }
}

export default new AllBillsService();
