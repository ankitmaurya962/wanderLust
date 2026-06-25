# WanderLust

WanderLust is a full-stack travel stay booking application inspired by marketplace-style listing platforms. Users can browse stays, filter by category or place, view maps, sign up/sign in, create and manage listings, write reviews, book stays, and make payments through Razorpay.

## Features

- Browse all stays and view detailed listing pages
- Search/filter listings by category and location
- User authentication with Passport local strategy and session cookies
- Protected routes for creating, editing, booking, and viewing user bookings
- Listing image uploads with Cloudinary
- Location geocoding with Geoapify and map display with Leaflet
- Reviews for listings
- Booking creation, cancellation, refund preview, and deletion
- Razorpay order creation and payment verification
- React frontend with Vite and Tailwind CSS
- Express backend with MongoDB, Mongoose, and REST API routes

## Tech Stack

**Frontend**

- React 19
- Vite
- React Router
- Tailwind CSS
- Material UI
- Axios
- Leaflet / React Leaflet
- React Hot Toast

**Backend**

- Node.js
- Express 5
- MongoDB / Mongoose
- Passport / Passport Local / Passport Local Mongoose
- Express Session with MongoDB session store
- Cloudinary and Multer
- Joi validation
- Razorpay

## Project Structure

```text
wanderLust/
  backend/
    app.js
    controllers/
    models/
    routes/
    routes/api/
    public/
    utils/
    schema.js
    cloudConfig.js
  frontend/
    src/
      components/
      context/
      pages/
      utils/
    public/
    vite.config.js
```

## Prerequisites

- Node.js `v22.19.0` or compatible
- npm
- MongoDB Atlas database URL
- Cloudinary account
- Geoapify API key
- Razorpay account

## Environment Variables

Create `backend/.env`:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

GEOAPIFY_KEY=your_geoapify_api_key

RAZOR_KEY_ID=your_razorpay_key_id
RAZOR_KEY_SECRET=your_razorpay_key_secret

NODE_ENV=development
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8080/api
```

For production, set `VITE_API_URL` to your deployed backend API URL.

## Installation

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Running Locally

Start the backend server:

```bash
cd backend
npm start
```

The backend runs on:

```text
http://localhost:8080
```

Start the frontend development server in another terminal:

```bash
cd frontend
npm run dev
```

The frontend usually runs on:

```text
http://localhost:5173
```

The Vite config also proxies `/api` requests to `http://localhost:8080`.

## Available Scripts

Backend:

```bash
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## API Overview

Base API URL for local development:

```text
http://localhost:8080/api
```

### Auth

```text
POST /api/signup
POST /api/signin
GET  /api/current
GET  /api/logout
```

### Listings

```text
GET    /api/listings
GET    /api/listings?category=rooms
GET    /api/listings?place=goa
POST   /api/listings
GET    /api/listings/:id
PATCH  /api/listings/:id
DELETE /api/listings/:id
```

### Reviews

```text
POST   /api/listings/:id/reviews
DELETE /api/listings/:id/reviews/:ReviewId
```

### Bookings

```text
POST   /api/bookings
GET    /api/mybooking
PATCH  /api/bookings/:id/cancel
GET    /api/bookings/:id/refund-preview
DELETE /api/bookings/:id
```

### Payments

```text
POST /api/create-order
POST /api/verify-payment
```

## Notes

- Backend CORS currently allows `http://localhost:5173` and the configured Vercel frontend URL.
- Session cookies use `secure: true` and `sameSite: "none"` when `NODE_ENV=production`.
- Listing creation and editing with images use `multipart/form-data`.
- The backend is API-only; the React app consumes the `/api` routes.

## Author

Ankit Maurya
