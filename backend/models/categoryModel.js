const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is required"],
      unique: [true, "Category Name should be unique"],
      minLength: [3, "Category Name should be at least 3 characters long"],
      maxLength: [50, "Category Name should not exceed 50 characters"],
    },
    slug: {
      type: String,
      lowerCase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
