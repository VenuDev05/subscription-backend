import express from "express";
import Subscription from "../models/Subscription.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Subscription
router.post(
  "/create",
  authMiddleware,
  async (req, res) => {
    try {
      const { plan, amount, duration } = req.body;

      const expiryDate = new Date();
      expiryDate.setDate(
        expiryDate.getDate() + duration
      );

      const subscription =
        await Subscription.create({
          userId: req.user.id,
          plan,
          amount,
          expiryDate,
        });

      res.status(201).json(subscription);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Get Current User Subscription
router.get(
  "/me",
  authMiddleware,
  async (req, res) => {
    try {
      const subscription =
        await Subscription.findOne({
          userId: req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.json(subscription);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default router;