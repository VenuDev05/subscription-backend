import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import adminMiddleware from "./middleware/adminMiddleware.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.error("MongoDB Error:");
        console.error(err);
    });

app.get(
    "/api/profile",
    authMiddleware,
    (req, res) => {
        res.json({
            message: "Protected Route",
            user: req.user,
        });
    }
);

app.get(
  "/api/user/dashboard",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Welcome User Dashboard",
      user: req.user,
    });
  }
);

app.get(
  "/api/admin/dashboard",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      message: "Welcome Admin Dashboard",
    });
  }
);

app.use(
  "/api/subscriptions",
  subscriptionRoutes
);


app.get("/", (req, res) => {
    res.send("Server Running");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});