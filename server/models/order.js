const mongoose = require("mongoose");

const order = new mongoose.Schema(

  {

    // =======================
    // USER DETAILS
    // =======================

    user: {

      type:
        mongoose.Types.ObjectId,

      ref: "user",

      required: true,
    },

    // =======================
    // BOOK DETAILS
    // =======================

    book: {

      type:
        mongoose.Types.ObjectId,

      ref: "book",

      required: true,
    },

    // =======================
    // QUANTITY PURCHASED
    // =======================

    quantity: {

      type: Number,

      default: 1,

      min: 1,

      required: true,
    },

    // =======================
    // PAYMENT MODE
    // =======================

    paymentMode: {

      type: String,

      default: "COD",

      enum: [

        "COD",

        "ONLINE",

        "WALLET",
      ],
    },

    // =======================
    // PAYMENT STATUS
    // =======================

    paymentStatus: {

      type: String,

      default: "Pending",

      enum: [

        "Pending",

        "Paid",

        "Failed",

        "Refunded",
      ],
    },

    // =======================
    // ORDER STATUS
    // =======================

    status: {

      type: String,

      default:
        "Order Placed",

      enum: [

        "Order Placed",

        "Processing",

        "Packed",

        "Shipped",

        "Out for Delivery",

        "Delivered",

        "Canceled",

        "Returned",
      ],
    },

    // =======================
    // CANCELLATION REASON
    // =======================

    cancelReason: {

      type: String,

      default: "",
    },

    // =======================
    // ESTIMATED DELIVERY
    // =======================

    estimatedDelivery: {

      type: Date,

      default: () => {

        const date =
          new Date();

        date.setDate(

          date.getDate() + 5
        );

        return date;
      },
    },

    // =======================
    // DELIVERED DATE
    // =======================

    deliveredAt: {

      type: Date,
    },

    // =======================
    // TRACKING ID
    // =======================

    trackingId: {

      type: String,

      default: function () {

        return (

          "BOOKNEST-" +

          Math.floor(

            100000 +

            Math.random() *
              900000
          )
        );
      },
    },

    // =======================
    // SHIPPING ADDRESS
    // =======================

    shippingAddress: {

      type: String,

      default: "",
    },

    // =======================
    // TOTAL PRICE
    // =======================

    totalPrice: {

      type: Number,

      required: true,

      default: 0,
    },

    // =======================
    // INVOICE NUMBER
    // =======================

    invoiceNumber: {

      type: String,

      default: function () {

        return (

          "INV-" +

          Date.now()
        );
      },
    },

    // =======================
    // REVIEW STATUS
    // =======================

    reviewed: {

      type: Boolean,

      default: false,
    },

    // =======================
    // ADMIN NOTES
    // =======================

    adminNote: {

      type: String,

      default: "",
    },

    // =======================
    // REFUND DETAILS
    // =======================

    refundAmount: {

      type: Number,

      default: 0,
    },

    refundReason: {

      type: String,

      default: "",
    },

    refundStatus: {

      type: String,

      enum: [

        "Not Requested",

        "Processing",

        "Refunded",

        "Failed",
      ],

      default:
        "Not Requested",
    },

    refundedAt: {

      type: Date,
    },
  },

  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "order",
    order
  );