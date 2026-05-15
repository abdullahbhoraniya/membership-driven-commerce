import razorpay from 'razorpay';
import { config } from '../utils/config.js';

export const razorpayinstance=new razorpay({
    key_id:config.razorpay_key_id,
    key_secret:config.razorpay_key_secret
})