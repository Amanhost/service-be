const mongoose = require("mongoose");

const { Schema } = mongoose;
const productSchema = new Schema({
  productId: {
    type: Number,
    unique: true,
    min: [1000, "Product id must be 4 digits"],
    max: [9999, "Product id must be 4 digits"],
  },
  title: {
    type: String,
    required: [true, "Product title is required"],
    unique: [true, "Product title must be unique"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  category: { type: String, required: [true, "Product category is required"] },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Product price must be a positive number"],
  },
  discountPercentage: { type: Number, min: 0, max: 100 },
  rating: { type: Number, min: 0, max: 5 },
  stock: { type: Number, min: 0 },
  tags: [String],
  brand: { type: String },
  weight: { type: Number, min: 0 },
  dimensions: {
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 },
    depth: { type: Number, min: 0 },
  },
  warrantyInformation: { type: String },
  shippingInformation: { type: String },
  availabilityStatus: { type: String },
  reviews: [
    {
      rating: { type: Number, min: 0, max: 5 },
      comment: { type: String },
      date: { type: Date },
      reviewerName: { type: String },
      reviewerEmail: { type: String },
    },
  ],
  returnPolicy: { type: String },
  minimumOrderQuantity: { type: Number },

  images: [
    String, // Array of image URLs
  ],
});



const Products = mongoose.model("Products", productSchema);
module.exports = { Products };
