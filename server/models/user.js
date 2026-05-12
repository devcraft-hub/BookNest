const mongoose = require("mongoose");

const user = new mongoose.Schema(

  {

    // =======================
    // USERNAME
    // =======================

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },

    // =======================
    // EMAIL
    // =======================

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // =======================
    // PASSWORD
    // =======================

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // =======================
    // ADDRESS
    // =======================

    address: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================
    // AVATAR
    // =======================

    avatar: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },

    // =======================
    // ROLE
    // =======================

    role: {
      type: String,
      default: "user",
      enum: [
        "user",
        "admin",
      ],
    },

    // =======================
    // PHONE NUMBER
    // =======================

    phone: {
      type: String,
      default: "",
    },

    // =======================
    // FAVOURITES
    // =======================

    favourites: [
      {
        type:
          mongoose.Types.ObjectId,

        ref: "book",
      },
    ],

    // =======================
    // CART
    // =======================

    cart: [
      {
        book: {
          type:
            mongoose.Types.ObjectId,

          ref: "book",
        },

        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],

    // =======================
    // ORDERS
    // =======================

    orders: [
      {
        type:
          mongoose.Types.ObjectId,

        ref: "order",
      },
    ],

    // =======================
    // RECENTLY VIEWED
    // =======================

    recentlyViewed: [
      {
        type:
          mongoose.Types.ObjectId,

        ref: "book",
      },
    ],

    // =======================
    // USER WALLET
    // =======================

    wallet: {
      type: Number,
      default: 0,
      min: 0,
    },

    // =======================
    // WALLET HISTORY
    // =======================

    walletHistory: [

      {

        amount: {
          type: Number,
          default: 0,
        },

        type: {
          type: String,

          enum: [
            "Refund",
            "Cashback",
            "Added",
            "Purchase",
          ],

          default: "Refund",
        },

        message: {
          type: String,
          default: "",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // =======================
    // ACCOUNT STATUS
    // =======================

    accountStatus: {
      type: String,
      default: "active",

      enum: [

        "active",

        "blocked",

        "suspended",
      ],
    },

    // =======================
    // VERIFICATION
    // =======================

    isVerified: {
      type: Boolean,
      default: false,
    },

    // =======================
    // PREMIUM MEMBERSHIP
    // =======================

    isPremiumMember: {
      type: Boolean,
      default: false,
    },

    // =======================
    // LAST LOGIN
    // =======================

    lastLogin: {
      type: Date,
    },

    // =======================
    // NOTIFICATIONS
    // =======================

    notifications: [

      {

        message: {
          type: String,
        },

        read: {
          type: Boolean,
          default: false,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // =======================
    // SAVED ADDRESSES
    // =======================

    savedAddresses: [

      {

        fullAddress:
          String,

        city:
          String,

        state:
          String,

        pincode:
          String,

        country: {
          type: String,
          default: "India",
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "user",
  user
);