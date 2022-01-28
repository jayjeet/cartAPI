const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CartSchema = new Schema(
  {
    items: [ItemSchema],
    subTotal: {
      default: 0,
      type: Number,
    },
    totalItems: { default: 0, type: Number },
  },
  {
    timestamps: true,
  }
);
//Pre hook for saving
CartSchema.pre("save", async function () {
  //console.log(this.items[0].quantity);
  //Filtering for multipleQuantity items
  let multipleItems = this.items.filter((item) => {
    return item.quantity > 1;
  });
  //Applying discount for seleted product A
  let discountedItems = multipleItems.map((discountItem) => {
    if (discountItem.name === "A" && discountItem.quantity > 2) {
      return {
        productId: discountItem.productId,
        quantity: discountItem.quantity,
        name: discountItem.name,
        price: discountItem.price,
        total: discountItem.total - Math.round(discountItem.total * 0.166),
      };
    } else if (discountItem.name === "B" && discountItem.quantity > 1) {
      //Applying discount for seleted product B
      return {
        productId: discountItem.productId,
        quantity: discountItem.quantity,
        name: discountItem.name,
        price: discountItem.price,
        total: discountItem.total - Math.round(discountItem.total * 0.0625),
      };
    } else {
      return discountItem;
    }
  });

  let discountTotal = discountedItems.reduce((acc, crr) => {
    acc += crr.total;

    return acc;
  }, 0);

  let totalItems = discountedItems.reduce((acc, crr) => {
    acc += crr.quantity;
    return acc;
  }, 0);

  console.log(discountedItems);
  console.log(discountTotal);
  console.log(totalItems);

  //Saving to the DB
  this.items = discountedItems;

  this.subTotal = discountTotal >= 150 ? discountTotal - 20 : discountTotal;
  this.totalItems = totalItems;
});

module.exports = mongoose.model("cart", CartSchema);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password") || this.isNew) return next();
//   //console.log(this.isNew);

//   this.passwordChangedAt = Date.now() - 1000;
//   next();
// });
