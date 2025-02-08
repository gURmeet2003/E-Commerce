import express from "express";
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
