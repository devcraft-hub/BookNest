const mongoose = require("mongoose");

const book = new mongoose.Schema(

  {

    // image

    url: {
      type: String,
      required: true,
    },

    // title

    title: {
      type: String,
      required: true,
      trim: true,
    },

    // author

    author: {
      type: String,
      required: true,
      trim: true,
    },

    // price

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // description

    desc: {
      type: String,
      required: true,
    },

    // language

    language: {
      type: String,
      required: true,
      enum: [
        "English",
        "Hindi",
      ],
    },

    // category

    category: {
      type: String,
      default: "General",
      enum: [
        "Programming",
        "Fiction",
        "Self Help",
        "Science",
        "Business",
        "History",
        "Biography",
        "General",
      ],
    },

    // stock

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // average ratings

    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // total reviews count

    totalReviews: {
      type: Number,
      default: 0,
    },

    // reviews array

    reviews: [

      {

        user: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },

        username: {
          type: String,
        },

        rating: {
          type: Number,
          min: 1,
          max: 5,
        },

        comment: {
          type: String,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // bestseller

    bestseller: {
      type: Boolean,
      default: false,
    },

    // featured book

    featured: {
      type: Boolean,
      default: false,
    },

    // sold copies

    sold: {
      type: Number,
      default: 0,
    },

    // publisher

    publisher: {
      type: String,
      default: "",
    },

    // pages

    pages: {
      type: Number,
      default: 0,
    },

    // isbn

    isbn: {
      type: String,
      default: "",
    },

    // published year

    publishedYear: {
      type: Number,
      default:
        new Date().getFullYear(),
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "book",
  book
);