# 🛒 E-Commerce Platform

A modern, full-featured E-Commerce web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js).  
This project supports both customer and admin dashboards, secure authentication, product management, order processing, and more.

---

## 🚀 Features

- **User Authentication** (JWT, bcrypt)
- **Product Catalog** with categories, search, and filters
- **Shopping Cart** and **Wishlist**
- **Order Management** and **Checkout**
- **Admin Dashboard** for product, category, and order management
- **Responsive UI** with Material-UI and Tailwind CSS
- **Secure API** with role-based access
- **Review & Rating System**
- **Stripe Payment Integration**
- **Modern React** (Hooks, Context API)
- **Optimized for performance and scalability**

---

## 📸 Screenshots

> _Add screenshots or GIFs here to showcase your UI and features!_

---

## 🏗️ Project Structure

```
e_commerce/
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── Middleware/
│   └── server.js
├── frontend/
│   ├── Admin/
│   └── Client/
```

---

## ⚙️ Tech Stack

- **Frontend:** React, Vite, Material-UI, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **Payments:** Stripe
- **State Management:** React Context API
- **Other:** Axios, ESLint, dotenv

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/D-Karak/E-Commerce.git
   cd e_commerce
   ```

2. **Backend Setup:**
   ```sh
   cd backend
   npm install
   # Create a .env file (see .env.example)
   npm run dev
   ```

3. **Frontend Setup (Client):**
   ```sh
   cd ../frontend/Client
   npm install
   npm run dev
   ```

4. **Frontend Setup (Admin):**
   ```sh
   cd ../Admin
   npm install
   npm run dev
   ```

---

## 🔑 Environment Variables

Create a `.env` file in both `backend/` and each frontend folder.  
Example for backend:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d
STRIPE_SECRET_KEY=your_stripe_secret
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Contact

For questions or feedback, reach out via [GitHub Issues](https://github.com/D-Karak/E-Commerce/issues).

---

> _Built with ❤️ by D-Karak
