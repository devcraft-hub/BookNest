const User = require("../models/user");

const router = require("express").Router();

const { authenticateToken } =
  require("./userAuth");

const Book = require("../models/book");

// =======================
// ADD BOOK - ADMIN
// =======================

router.post(
  "/add-book",
  authenticateToken,
  async (req, res) => {

    try {

      const { id } = req.headers;

      const user =
        await User.findById(id);

      // admin validation

      if (
        !user ||
        user.role !== "admin"
      ) {

        return res.status(403).json({
          message:
            "You are not authorized to perform admin work",
        });
      }

      // request body

      const {
        url,
        title,
        author,
        price,
        desc,
        language,
        stock,
        category,
        publisher,
        pages,
        publishedYear,
        bestseller,
      } = req.body;

      // validations

      if (

        !url ||
        !title ||
        !author ||
        !price ||
        !desc ||
        !language

      ) {

        return res.status(400).json({
          message:
            "All fields are required",
        });
      }

      // create book

      const newBook = new Book({

        url,

        title,

        author,

        price,

        desc,

        language,

        stock:
          stock || 0,

        category:
          category || "General",

        publisher:
          publisher || "",

        pages:
          pages || 0,

        publishedYear:
          publishedYear ||
          new Date().getFullYear(),

        bestseller:
          bestseller || false,

        ratings: 0,

        totalReviews: 0,
      });

      await newBook.save();

      return res.status(200).json({
        message:
          "Book added successfully",
      });

    } catch (err) {

      return res.status(500).json({
        message: err.message,
      });
    }
  }
);

// =======================
// UPDATE BOOK - ADMIN
// =======================

router.put(
  "/update-book/:id",
  authenticateToken,
  async (req, res) => {

    try {

      const { id } = req.headers;

      const user =
        await User.findById(id);

      // admin validation

      if (
        !user ||
        user.role !== "admin"
      ) {

        return res.status(403).json({
          message:
            "You are not authorized to perform admin work",
        });
      }

      // book id

      const {
        id: bookId,
      } = req.params;

      // update

      await Book.findByIdAndUpdate(
        bookId,
        {

          url:
            req.body.url,

          title:
            req.body.title,

          author:
            req.body.author,

          price:
            req.body.price,

          desc:
            req.body.desc,

          language:
            req.body.language,

          stock:
            req.body.stock,

          category:
            req.body.category,

          publisher:
            req.body.publisher,

          pages:
            req.body.pages,

          publishedYear:
            req.body.publishedYear,

          bestseller:
            req.body.bestseller,
        }
      );

      return res.status(200).json({
        message:
          "Book Updated Successfully",
      });

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// =======================
// DELETE BOOK - ADMIN
// =======================

router.delete(
  "/delete-book/:id",
  authenticateToken,
  async (req, res) => {

    try {

      const { id } = req.headers;

      const user =
        await User.findById(id);

      // admin validation

      if (
        !user ||
        user.role !== "admin"
      ) {

        return res.status(403).json({
          message:
            "You are not authorized to perform admin work",
        });
      }

      // book id

      const {
        id: bookId,
      } = req.params;

      // delete

      await Book.findByIdAndDelete(
        bookId
      );

      return res.status(200).json({
        message:
          "Book Deleted Successfully",
      });

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// =======================
// GET ALL BOOKS
// =======================

router.get(
  "/get-all-books",
  async (req, res) => {

    try {

      const books =
        await Book.find()
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({

        status: "Success",

        data: books,
      });

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// =======================
// RECENT BOOKS
// =======================

router.get(
  "/get-recent-books",
  async (req, res) => {

    try {

      const books =
        await Book.find()
          .sort({
            createdAt: -1,
          })
          .limit(4);

      return res.status(200).json({

        status: "Success",

        data: books,
      });

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// =======================
// GET BOOK BY ID
// =======================

router.get(
  "/get-book-by-id/:id",
  async (req, res) => {

    try {

      const {
        id: bookId,
      } = req.params;

      const book =
        await Book.findById(bookId);

      if (!book) {

        return res.status(404).json({
          message:
            "Book not found",
        });
      }

      return res.status(200).json({

        status: "Success",

        data: book,
      });

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// =======================
// SEARCH BOOKS
// =======================

router.get(
  "/search-books/:keyword",
  async (req, res) => {

    try {

      const {
        keyword,
      } = req.params;

      const books =
        await Book.find({

          $or: [

            {
              title: {
                $regex:
                  keyword,
                $options: "i",
              },
            },

            {
              author: {
                $regex:
                  keyword,
                $options: "i",
              },
            },
          ],
        });

      return res.status(200).json({

        status: "Success",

        data: books,
      });

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// =======================
// RECOMMENDED BOOKS
// =======================

router.get(
  "/recommended-books/:id",
  async (req, res) => {

    try {

      const bookId =
        req.params.id;

      // current book

      const currentBook =
        await Book.findById(
          bookId
        );

      if (!currentBook) {

        return res.status(404).json({
          message:
            "Book not found",
        });
      }

      // recommendations

      const books =
        await Book.find({

          _id: {
            $ne: bookId,
          },

          $or: [

            {
              category:
                currentBook.category,
            },

            {
              author:
                currentBook.author,
            },

            {
              language:
                currentBook.language,
            },
          ],
        })

        .limit(8);

      return res.status(200).json({

        status: "Success",

        data: books,
      });

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// =======================
// ADD REVIEW
// =======================

router.put(
  "/add-review/:id",
  authenticateToken,
  async (req, res) => {

    try {

      const { id } = req.headers;

      const {
        rating,
        comment,
      } = req.body;

      // validation

      if (
        !rating ||
        !comment
      ) {

        return res.status(400).json({
          message:
            "Rating and comment are required",
        });
      }

      // user

      const user =
        await User.findById(id);

      // book

      const book =
        await Book.findById(
          req.params.id
        );

      if (!book) {

        return res.status(404).json({
          message:
            "Book not found",
        });
      }

      // already reviewed

      const existingReview =
        book.reviews.find(

          (review) =>

            review.user.toString() ===
            id
        );

      if (existingReview) {

        return res.status(400).json({
          message:
            "You already reviewed this book",
        });
      }

      // new review

      const newReview = {

        user: id,

        username:
          user.username,

        rating,

        comment,
      };

      // push review

      book.reviews.push(
        newReview
      );

      // total reviews

      book.totalReviews =
        book.reviews.length;

      // calculate ratings

      const totalRating =
        book.reviews.reduce(

          (acc, item) =>

            acc + item.rating,

          0
        );

      book.ratings =
        (
          totalRating /
          book.reviews.length
        ).toFixed(1);

      await book.save();

      return res.status(200).json({
        message:
          "Review added successfully",
      });

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// =======================
// DELETE REVIEW
// =======================

router.delete(
  "/delete-review/:bookId/:reviewId",
  authenticateToken,
  async (req, res) => {

    try {

      const {
        bookId,
        reviewId,
      } = req.params;

      const { id } = req.headers;

      // book

      const book =
        await Book.findById(bookId);

      if (!book) {

        return res.status(404).json({
          message:
            "Book not found",
        });
      }

      // review

      const review =
        book.reviews.id(
          reviewId
        );

      if (!review) {

        return res.status(404).json({
          message:
            "Review not found",
        });
      }

      // ownership

      if (
        review.user.toString() !==
        id
      ) {

        return res.status(403).json({
          message:
            "You can only delete your own review",
        });
      }

      // remove review

      review.deleteOne();

      // update totals

      book.totalReviews =
        book.reviews.length;

      // ratings

      if (
        book.reviews.length > 0
      ) {

        const totalRating =
          book.reviews.reduce(

            (acc, item) =>

              acc + item.rating,

            0
          );

        book.ratings =
          (
            totalRating /
            book.reviews.length
          ).toFixed(1);

      } else {

        book.ratings = 0;
      }

      await book.save();

      return res.status(200).json({
        message:
          "Review deleted successfully",
      });

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// =======================
// ADD RECENTLY VIEWED
// =======================

router.put(
  "/add-recently-viewed/:id",
  authenticateToken,
  async (req, res) => {

    try {

      const { id } = req.headers;

      const bookId =
        req.params.id;

      // user

      const user =
        await User.findById(id);

      // remove duplicate

      user.recentlyViewed =
        user.recentlyViewed.filter(

          (item) =>

            item.toString() !==
            bookId
        );

      // add latest viewed

      user.recentlyViewed.unshift(
        bookId
      );

      // limit 10 books

      if (
        user.recentlyViewed.length > 10
      ) {

        user.recentlyViewed =
          user.recentlyViewed.slice(
            0,
            10
          );
      }

      await user.save();

      return res.status(200).json({
        message:
          "Recently viewed updated",
      });

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// =======================
// GET RECENTLY VIEWED
// =======================

router.get(
  "/get-recently-viewed",
  authenticateToken,
  async (req, res) => {

    try {

      const { id } = req.headers;

      const user =
        await User.findById(id)
          .populate(
            "recentlyViewed"
          );

      return res.status(200).json({

        status: "Success",

        data:
          user.recentlyViewed,
      });

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;