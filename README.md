# Online Food Order Backend

This is a backend application for an online food ordering system built using Node.js, Express, and MongoDB. It provides APIs for user authentication, restaurant management, menu handling, order processing, and payment integration.

## Features

- User authentication (JWT-based login/register)
- Restaurant and menu management
- Order placement and tracking
- Admin panel for managing restaurants and orders
- Secure REST API with proper validation

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
-

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/GavinHemsada/online-food-order-backend.git
   cd online-food-order-backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   STRIPE_SECRET_KEY=your_stripe_key
   ```

4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token

### Customer Routes
- `POST /api/customer/signup` - Customer sign up
- `POST /api/customer/login` - Customer login
- `PATCH /api/customer/verify` - Verify customer account
- `GET /api/customer/otp` - Request OTP
- `GET /api/customer/profile` - Get customer profile
- `PATCH /api/customer/profile` - Edit customer profile
- `POST /api/customer/cart` - Add item to cart
- `GET /api/customer/cart` - Get cart items
- `DELETE /api/customer/cart` - Clear cart
- `GET /api/offer/verify/:id` - Verify offer
- `POST /api/customer/create-payment` - Create payment
- `POST /api/customer/create-order` - Create order
- `GET /api/customer/orders` - Get customer orders
- `GET /api/customer/order/:id` - Get order by ID

### Delivery Routes
- `POST /api/delivery/signup` - Delivery personnel sign up
- `POST /api/delivery/login` - Delivery personnel login
- `PUT /api/delivery/change-status` - Update delivery service status
- `GET /api/delivery/profile` - Get delivery personnel profile
- `PATCH /api/delivery/profile` - Edit delivery personnel profile

### Vendor Routes
- `GET /api/vendor/profile` - Vendor login
- `PATCH /api/vendor/profile` - Update vendor profile
- `PATCH /api/vendor/coverimage` - Update vendor cover image
- `PATCH /api/vendor/service` - Update vendor service details
- `POST /api/vendor/food` - Add food item
- `GET /api/vendor/food` - Get vendor's food items
- `GET /api/vendor/orders` - Get current orders
- `PUT /api/vendor/order/:id/process` - Process order
- `GET /api/vendor/order/:id` - Get order details
- `GET /api/vendor/offers` - Get vendor's offers
- `POST /api/vendor/offer` - Add offer
- `PUT /api/vendor/offer/:id` - Edit offer

### Shopping Routes
- `GET /api/shopping/:pincode` - Get food availability by pincode
- `GET /api/shopping/top-restaurant/:pincode` - Get top restaurants
- `GET /api/shopping/foods-in-30-min/:pincode` - Get foods available in 30 minutes
- `GET /api/shopping/search/:pincode` - Search foods
- `GET /api/shopping/offers/:pincode` - Get available offers
- `GET /api/shopping/restaurant/:id` - Find restaurant by ID

### Admin Routes
- `POST /api/vendor` - Create a new vendor
- `GET /api/vendors` - Get all vendors
- `GET /api/vendor/:id` - Get vendor by ID
- `GET /api/transactions` - Get all transactions
- `GET /api/transaction/:id` - Get transaction by ID
- `PUT /api/delivery/verify` - Verify delivery user
- `GET /api/delivery/users` - Get all delivery users

## Deployment

1. Deploy backend to a cloud platform like **Heroku, AWS, or Vercel**.
2. Set up the **MongoDB database** using MongoDB Atlas.
3. Configure environment variables in the hosting service.

## Contributing

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact
For any queries, feel free to reach out:
- **GitHub:** [your-username](https://github.com/GavinHemsada)

