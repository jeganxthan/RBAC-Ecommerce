require("dotenv").config();
const express = require("express");
const path = require("path"); 
const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");
const sellerRoutes = require("./Routes/sellerRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods:["GET", "POST", "PUT", "DELETE"],
        allowedHeaders:["Content-Type", "Authorization"]
    })
)
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/product", sellerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      res.set("Access-Control-Allow-Origin", "http://localhost:5173/");
    },
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
