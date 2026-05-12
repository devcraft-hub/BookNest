const router =
  require("express").Router();

const {
  authenticateToken,
} = require("./userAuth");

const User =
  require("../models/user");

const Book =
  require("../models/book");

const Order =
  require("../models/order");

// =======================
// ADMIN DASHBOARD
// =======================

router.get(
  "/dashboard",
  authenticateToken,
  async (req, res) => {

    try {

      const { id } =
        req.headers;

      // admin validation

      const admin =
        await User.findById(id);

      if (
        !admin ||
        admin.role !== "admin"
      ) {

        return res.status(403).json({
          message:
            "You are not authorized",
        });
      }

      // counts

      const totalUsers =
        await User.countDocuments();

      const totalBooks =
        await Book.countDocuments();

      const totalOrders =
        await Order.countDocuments();

      // recent orders

      const recentOrders =
        await Order.find()

          .populate("user")

          .populate("book")

          .sort({
            createdAt: -1,
          })

          .limit(5);

      return res.status(200).json({

        status: "Success",

        data: {

          totalUsers,

          totalBooks,

          totalOrders,

          recentOrders,
        },
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
// GET ALL USERS
// =======================

router.get(
  "/get-all-users",
  authenticateToken,
  async (req, res) => {

    try {

      const { id } =
        req.headers;

      const admin =
        await User.findById(id);

      // admin validation

      if (
        !admin ||
        admin.role !== "admin"
      ) {

        return res.status(403).json({
          message:
            "You are not authorized",
        });
      }

      // users

      const users =
        await User.find()

          .select("-password")

          .sort({
            createdAt: -1,
          });

      return res.status(200).json({

        status: "Success",

        data: users,
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
// BLOCK USER
// =======================

router.put(
  "/block-user/:id",
  authenticateToken,
  async (req, res) => {

    try {

      const { id } =
        req.headers;

      const admin =
        await User.findById(id);

      // admin validation

      if (
        !admin ||
        admin.role !== "admin"
      ) {

        return res.status(403).json({
          message:
            "You are not authorized",
        });
      }

      // user id

      const userId =
        req.params.id;

      // prevent self block

      if (
        id === req.params.id
      ) {

        return res.status(400).json({
          message:
            "Admin cannot block their own account",
        });
      }

      // block user

      await User.findByIdAndUpdate(
        userId,
        {
          accountStatus:
            "blocked",
        }
      );

      return res.status(200).json({
        message:
          "User blocked successfully",
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
// UNBLOCK USER
// =======================

router.put(
  "/unblock-user/:id",
  authenticateToken,
  async (req, res) => {

    try {

      const { id } =
        req.headers;

      const admin =
        await User.findById(id);

      // admin validation

      if (
        !admin ||
        admin.role !== "admin"
      ) {

        return res.status(403).json({
          message:
            "You are not authorized",
        });
      }

      // user id

      const userId =
        req.params.id;

      await User.findByIdAndUpdate(
        userId,
        {
          accountStatus:
            "active",
        }
      );

      return res.status(200).json({
        message:
          "User unblocked successfully",
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