import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  plan: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    default: "active",
  },

  startDate: {
    type: Date,
    default: Date.now,
  },

  expiryDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model(
  "Subscription",
  subscriptionSchema
);