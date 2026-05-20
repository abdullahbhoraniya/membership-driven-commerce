# Membership Commerce Platform

A full-stack subscription-based e-commerce platform built using the MERN stack. This project demonstrates real-world premium membership workflows including authentication, dynamic pricing, subscription management, Razorpay payment integration, premium product access control, and payment history tracking.

---

# Features

## Authentication System

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Persistent Login State

---

## Subscription System

- Free & Premium Membership Plans
- Dynamic Subscription Discounts
- Subscription Expiry Handling
- Premium Access Control
- Membership Upgrade Flow

---

## Payment Integration

- Razorpay Payment Gateway
- Order Creation
- Secure Payment Verification
- Payment History Tracking
- Subscription Activation After Payment

---

## Product System

- Product Creation
- Dynamic Pricing Based On Membership
- Premium-Only Products
- Discount Calculation
- Locked Premium Products For Free Users

---

## UI Features

- Modern Industry-Style UI
- Responsive Design
- Dynamic Hero Section
- Premium Product Sections
- Purchase History Dashboard
- Interactive Product Cards

---

# Tech Stack

## Frontend

- React.js
- Tailwind CSS
- React Router DOM
- Axios
- Context API

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Payment Gateway

- Razorpay(test mode)

---

# Project Structure

```bash
membership-commerce/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hook/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utils/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── config/
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_key

RAZORPAY_SECRET=your_secret
```

---

## Frontend `.env`

```env
VITE_RAZORPAY_KEY=your_razorpay_key
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/abdullahbhoraniya/membership-driven-commerce.git
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Core Business Logic

## Dynamic Product Pricing

Products automatically calculate discounts based on the user's subscription plan.

### Example

- Free User → 10% Discount
- Premium User → 25% Discount

---

## Premium Product Access

Premium products remain locked for free users.

Free users can:

- View premium products
- See pricing
- Upgrade membership

But cannot purchase until subscription becomes active.

---

## Subscription Activation Flow

1. User selects premium plan
2. Razorpay order created
3. Payment completed
4. Signature verified
5. Payment stored in database
6. User subscription activated
7. Premium access granted

---

# Database Models

## User Model

- userName
- email
- password
- subscription
- subscriptionStartDate
- subscriptionEndDate

---

## Subscription Model

- name
- price
- durationInDays
- discountPercent
- fastDelivery
- premiumDeals

---

## Product Model

- productName
- image
- price
- premiumOnly

---

## Payment Model

- user
- subscription
- razorpayOrderId
- razorpayPaymentId
- amount
- paymentStatus

---

# API Endpoints

## Authentication

### Register

```http
POST /api/v1/auth/register
```

### Login

```http
POST /api/v1/auth/login
```

---

## Products

### Get Products

```http
GET /api/v1/products/get-products
```

### Create Product

```http
POST /api/v1/products/create-product
```

---

## Subscription

### Get Subscription Plans

```http
GET /api/v1/subscription/get-subscription
```

---

## Payments

### Create Payment

```http
POST /api/v1/payments/create-payment
```

### Verify Payment

```http
POST /api/v1/payments/verify-payment
```

### Payment History

```http
GET /api/v1/payments/history
```

---

# Learning Outcomes

This project helped in understanding:

- Full-stack application architecture
- JWT authentication flow
- Payment gateway integration
- Subscription business logic
- Dynamic pricing systems
- React state management
- MongoDB relationships
- Backend service architecture
- Protected frontend routes
- Real-world debugging workflows

---

# Future Improvements

- Admin Dashboard
- Product Search & Filters
- Cart & Checkout System
- Recurring Subscriptions
- Email Notifications
- Coupon System
- Wishlist Feature
- Analytics Dashboard
- Role-Based Admin System
- Redis Caching
- Background Jobs For Expiry Handling

---

# Screenshots

Add screenshots of:

- Home Page
- Subscription Page
- Login/Register
- Payment Flow
- Purchase History

---

# Author

## Abdullah Bhoraniya

Full Stack MERN Developer

---

# License

This project is for learning and educational purposes.
