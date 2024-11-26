const { model, Schema } = require("mongoose");

const FoodSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    cookTime: { type: String, required: true },
    price: { type: Number, required: true },
    favorite: { type: Boolean, default: false },
    origins: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    tags: { type: [String], required: true },
    healthBenefits: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);
const FoodModel = model("food", FoodSchema);
module.exports = { FoodModel };
