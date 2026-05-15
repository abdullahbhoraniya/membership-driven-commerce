import express, { Router } from 'express';
import { createOrder, verifyPayment } from '../controller/payment.controller.js';

const route=express.Router();


route.post('/create-payment',createOrder);
route.post('/verify-payment',verifyPayment);


export default route;
