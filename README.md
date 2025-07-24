# 🛍️ Fashion Shopping Website with PayPal Integration

![fashion1](https://github.com/user-attachments/assets/dbc0f811-ae32-4553-9b34-05a4bbac2482)
![fashion2](https://github.com/user-attachments/assets/fcbf910c-6516-4ca6-af9a-4c73e920b005)
![fashion3](https://github.com/user-attachments/assets/b87c3000-0937-47e8-9ea1-984cb9e42290)

This is a **full-stack e-commerce fashion website** featuring a **Redux-powered shopping cart**, secure user authentication, and **PayPal integration** for seamless payments. Built using **React**, **Node.js**, **MongoDB**, and deployed with **Vercel**.

---

## ✨ Features Overview

- 🛒 **Add to Cart & Checkout** functionality (Redux managed)
- 💳 **PayPal Integration** for online payments
- 🔑 JWT-secured login sessions with bcrypt-hashed passwords
- 🌐 Full stack app: React (frontend), Node.js + Express (backend)
- ☁️ MongoDB Atlas for database storage
- 🖥 Responsive UI with dark/light theme toggle

---

## 🧱 Component Breakdown

### 👤 Authentication Flow
- User signs up and logs in with email & password
- JWT token issued on successful login
- Auth token is used to access protected routes

### 🛍 Shopping Features
- Browse and search fashion products
- Add items to cart (Redux-managed)
- View cart, update quantity, or remove items
- Checkout and complete payment using **PayPal**
- View order confirmation after payment

### 🧠 Backend – Node.js + Express.js
- RESTful APIs for:
  - Authentication
  - Product management
  - Cart and order handling
  - PayPal payment capture
- JWT middleware for protecting routes
- Role-based access control *(planned)*

### 🖥 Frontend – React.js + Redux
- Pages:
  - Register
  - Login
  - Product Listing
  - Cart
  - Checkout
  - Order Success
- State managed with Redux Toolkit
- Light/Dark theme support
- Toast alerts for user actions

### 🗄 Database – MongoDB Atlas
- Hosted in the cloud with **MongoDB Atlas**
- Collections:
  - Users (email, password)
  - Products (title, image, price, stock)
  - Orders (user, items, payment status)
- Mongoose used for schema modeling and validation

---

## 🛡️ Security Features

- 🔐 Passwords hashed with `bcrypt.js`
- 🧾 JWT-based authentication with expiry tokens
- 📛 Middleware-protected routes
- ⛔ Planned: Admin-only access and route restrictions

---

## 🧰 Tech Stack

| Layer | Stack |
|-------|-------|
| Frontend | React.js, Redux, React Router, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Payment | PayPal REST SDK |
| Auth | JWT, bcrypt.js |
| Deployment | Vercel |

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="40" />
  <img src="https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg" width="40" />
  <img src="https://www.vectorlogo.zone/logos/paypal/paypal-icon.svg" width="40" />
</p>

---

## 🚀 Deployment

- **Frontend**: Hosted on **Vercel**
- **Backend**: Hosted on **Vercel** *(also deployable via Render or Railway)*
- **Database**: Cloud-hosted with **MongoDB Atlas**

🔗 **Live Demo**: https://fashion-client.vercel.app

---

## 🔭 Future Enhancements

- 🧑‍💼 Implement **role-based dashboard** (admin/user)
- 📊 Admin analytics (sales, user stats, orders)
- 📦 Stock and inventory tracking
- 📱 PWA support for installable mobile app

---

## 📚 References

- [React.js Docs](https://reactjs.org/docs/getting-started.html)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Node.js Docs](https://nodejs.org/)
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [PayPal REST API](https://developer.paypal.com/docs/api/overview/)
- [JWT](https://jwt.io/introduction)
- [bcrypt.js GitHub](https://github.com/kelektiv/node.bcrypt.js)

---

## 🙋‍♂️ About the Developer

**Tushar Sain** — Full-stack developer passionate about secure, scalable, and modern web applications.

- 📧 Email: saintushar148@gmail.com  
- 💼 LinkedIn: [linkedin.com/in/tushar-sain14](https://linkedin.com/in/tushar-sain14)  
- 💻 GitHub: [github.com/tushar764](https://github.com/tushar764)

---

⭐️ *Star this repo if you found it helpful or used it in your own project!*
