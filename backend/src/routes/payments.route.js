import express, { Router } from 'express';
import { createOrder, getPaymentHistory, verifyPayment } from '../controller/payment.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const route=express.Router();


route.post('/create-payment',protectRoute,createOrder);
route.post('/verify-payment',protectRoute,verifyPayment);

// Get payment history for current user
route.get('/history', protectRoute, getPaymentHistory);

export default route;
