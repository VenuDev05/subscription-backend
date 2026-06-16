import express from "express";
import User from "../models/User.js";
import Subscription from "../models/Subscription.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/stats",
  authMiddleware,
  async (req, res) => {
    try {
      const users = await User.countDocuments();

      const subscriptions =
        await Subscription.countDocuments();

      const active =
        await Subscription.countDocuments({
          status: "active",
        });

      const revenueData =
        await Subscription.aggregate([
          {
            $group: {
              _id: null,
              total: {
                $sum: "$amount",
              },
            },
          },
        ]);

      const revenue =
        revenueData.length > 0
          ? revenueData[0].total
          : 0;

      const expired =
        await Subscription.countDocuments({
          status: "expired",
        });

      res.json({
        users,
        subscriptions,
        active,
        expired,
        revenue,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default router;