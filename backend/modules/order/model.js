const { model, Schema } = require("mongoose");
const { OrderStatus } = require("../../constants");
const { FoodModel } = require("../foot.item/model");

const LatLngSchema = new Schema(
  {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const OrderItemSchema = new Schema(
  {
    food: { type: Schema.Types.ObjectId, ref: "food", required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

OrderItemSchema.pre("validate", async function (next) {
  const food = await FoodModel.findById(this.food);
  if (food) {
    this.price = food.price * this.quantity;
  }
  next();
});

const OrderSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    addressLatLng: { type: LatLngSchema, required: true },
    paymentMethod: { type: String },
    totalPrice: { type: Number, required: true },
    items: [{ type: OrderItemSchema, required: true }],
    status: { type: String, default: OrderStatus.NEW },
    userId: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const OrderModel = model("order", OrderSchema);

module.exports = { OrderModel };
