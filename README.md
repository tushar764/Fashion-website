# 🛍️ Fashion Shopping Website with PayPal Integration

![fashion1](https://github.com/user-attachments/assets/dbc0f811-ae32-4553-9b34-05a4bbac2482)
![fashion2](https://github.com/user-attachments/assets/fcbf910c-6516-4ca6-af9a-4c73e920b005)
![fashion3](https://github.com/user-attachments/assets/b87c3000-0937-47e8-9ea1-984cb9e42290)

A **full-stack fashion e-commerce platform** built with **React**, **Redux Toolkit**, **Node.js**, **Express**, and **MongoDB**. Includes **PayPal integration**, secure **JWT-based authentication**, and a protected **Admin Dashboard** for managing orders and statuses. Fully responsive and deployed on **Vercel**.

---

## ✨ Features Overview

- 🛒 Add to Cart, Update Quantity, Remove Items
- 🔐 Secure Authentication with JWT + Bcrypt
- 💳 PayPal Checkout Integration
- 🎛️ Admin Dashboard (Protected Route)
- 📦 Order & Payment Management
- 🌗 Light/Dark Theme Toggle
- ⚛️ State Managed with Redux Toolkit
- 📱 Fully Responsive on All Devices

---

## 🧱 Architecture & Components

### 👤 Authentication

- User Registration & Login via Email + Password
- Passwords hashed with `bcrypt.js`
- JWT token issued and stored securely
- Protected routes using middleware

### 🛍 Shopping Experience

- View & Filter Fashion Products
- Redux-powered Cart (add/update/remove items)
- Checkout with live PayPal payment
- View Order Summary and Payment Confirmation

### 🧑‍💼 Admin Dashboard

- Protected **admin-only** route (`/admin`)
- View all placed orders by users
- **Change order status** (e.g., Pending → Delivered)
- Orders and statuses updated via Redux slice and backend routes
- Admin access is restricted via JWT role verification
- - 📝 Product CRUD from admin panel

### ⚙️ Backend (Node.js + Express.js)

- RESTful API for:
  - Auth (Login/Register)
  - Products
  - Cart/Orders
  - PayPal Payment Capture
  - Admin Status Management
- Role-based Access Control
- Middleware for route protection

### 🖥 Frontend (React.js + Redux Toolkit)

- Built using React + React Router + Tailwind CSS
- State managed with:
  - `authSlice`
  - `cartSlice`
  - `orderSlice`
  - `adminSlice`
- Toast notifications using `react-toastify`
- Custom reusable components (Cards, Modals, Buttons)

### 🗄️ Database (MongoDB Atlas + Mongoose)

- Cloud database hosted on **MongoDB Atlas**
- Collections:
  - `users`: (email, password, role)
  - `products`: (title, image, price, stock)
  - `orders`: (user, cart, payment details, status)
- Models created using Mongoose schemas with validation

---

## 🛡️ Security

- 🧂 Bcrypt password hashing
- 🔐 JWT-based sessions
- 🛡️ Admin-only protected APIs
- 🧾 Token expiration & refresh handling
- ⛔ 403/401 handling for unauthorized access

---

## 🧰 Tech Stack

| Layer      | Stack                                  |
|------------|----------------------------------------|
| Frontend   | React.js, Redux Toolkit, Tailwind CSS  |
| Backend    | Node.js, Express.js                    |
| Database   | MongoDB Atlas + Mongoose               |
| Auth       | JWT, bcrypt.js                         |
| Payment    | PayPal REST API                        |
| Deployment | Vercel                                 |

---

## 🚀 Deployment

- **Frontend**: [Vercel (React)](https://fashion-client.vercel.app)
- **Backend**: Vercel Serverless (Node/Express)
- **Database**: MongoDB Atlas (Cloud-hosted)

---

## 📦 Folder Structure (Simplified)


---

## 🔭 Future Enhancements

- 🧑‍💼 Admin dashboard analytics (sales, user stats)
- 📦 Stock & Inventory Tracking
- 📱 PWA Support for mobile installation
- 📊 Graphs & Charts for order insights

---

## 📚 References

- [React.js](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [PayPal Developer](https://developer.paypal.com/)
- [JWT](https://jwt.io/)
- [bcrypt.js](https://github.com/kelektiv/node.bcrypt.js)

---

## 🙋‍♂️ About the Developer

**Tushar Sain** – Full Stack Developer passionate about building modern, secure, and scalable web applications.

- 📧 Email: [saintushar148@gmail.com](mailto:saintushar148@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/tushar-sain14](https://linkedin.com/in/tushar-sain14)
- 💻 GitHub: [github.com/tushar764](https://github.com/tushar764)

---

## ⭐️ Support

If you found this project helpful, consider giving it a ⭐️ on GitHub and sharing it with others!

