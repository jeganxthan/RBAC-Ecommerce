# 🛡️ RBAC-Ecommerce (Role-Based Access Control E-Commerce Website)

A full-stack **E-commerce web application** built with the **MERN stack**, implementing **Role-Based Access Control (RBAC)** for three distinct user roles:

- **🛍️ User:** Browse and purchase products.
- **🛒 Seller:** List and manage products for sale.
- **🛡️ Admin:** Monitor platform activity, analyze data, and manage user access.

---

## 🔐 Roles & Permissions

| Role   | Access & Actions                                                                 |
|--------|-----------------------------------------------------------------------------------|
| 👤 User   | Register, login, browse products, add to cart, purchase.                         |
| 🛒 Seller | Register (via checkbox), login, add/edit/delete their own products.             |
| 🛡️ Admin  | Register using invite code `123456`, view all users/products, block/unblock users. |

---

## ⚙️ Tech Stack

- **Frontend:** Vite + React.js + Tailwind CSS
- **Backend:** Node.js + Express.js + MongoDB (Mongoose)
- **Authentication:** JWT
- **Image Upload:** Multer
- **Deployment:**  
  - Frontend: [Vercel](https://vercel.com)  
  - Backend: [Render](https://render.com)

---

## 🚀 Live Links

- 🔗 Frontend: [rbac-ecommerce.vercel.app](https://rbac-ecommerce.vercel.app)
- 🔗 Backend: [rbac-ecommerce.onrender.com](https://rbac-ecommerce.onrender.com)

---

## 📦 Installation

> ⚠️ You need Node.js and MongoDB installed locally (or update `.env` with your MongoDB URI).

### 1. Clone the repository

```bash
git clone https://github.com/jeganxthan/RBAC-Ecommerce.git
```

### 2. Start the backend
```bash
cd RBAC-Ecommerce/backend
npm install
npm run dev
```

### 3. Start the frontend
```bash
cd ../frontend
npm install
npm run dev
```
Now, open http://localhost:5173 in your browser.

###🧪 Test Roles
User: Register normally (no checkbox or token required).

Seller: Register with the "Want a Seller Account" checkbox checked.

Admin: Register using the token: 123456
```bash
RBAC-Ecommerce/
│
├── backend/        # Express.js backend with routes, controllers, models
│
├── frontend/       # Vite + React + Tailwind CSS frontend
│
└── README.md
```
###🧠 Features
🔒 Role-based protected routes (Admin, Seller, User)

🖼️ Image uploads for profile and product photos

📊 Admin dashboard with full insights

🚫 Admin ability to block/unblock users

🛒 Cart and payment (placeholder logic)

🌐 Fully responsive modern UI

🙌 Author
Developed by Jeganathan

