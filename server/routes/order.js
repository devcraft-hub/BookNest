const router = require("express").Router();

const { authenticateToken } =
  require("./userAuth");

const User =
  require("../models/user");

const Order =
  require("../models/order");

const Book =
  require("../models/book");

// =======================
// PLACE ORDER
// =======================

router.post(
  "/place-order",
  authenticateToken,

  async (req, res) => {

    try {

      const {
        id: userId,
      } = req.headers;

      const {
        order,
        paymentMode,
        walletUsed,
      } = req.body;

      // =======================
      // CHECK EMPTY CART
      // =======================

      if (
        !order ||
        order.length === 0
      ) {

        return res.status(400).json({

          message:
            "Cart is empty",
        });
      }

      // =======================
      // CREATE ORDERS
      // =======================

      for (const item of order) {

        const book =
          await Book.findById(
            item.book._id
          );

        if (!book) {

          continue;
        }

        // stock validation

        if (
          book.stock <
          item.quantity
        ) {

          return res.status(400).json({

            message:
              `${book.title} is out of stock`,
          });
        }

        // reduce stock

        book.stock -=
          item.quantity;

        // increase sold

        book.sold +=
          item.quantity;

        await book.save();

        // create order

        const newOrder =
          new Order({

            user:
              userId,

            book:
              item.book._id,

            quantity:
              item.quantity,

            paymentMode:
              paymentMode ||
              "COD",

            paymentStatus:

              paymentMode ===
              "COD"

                ? "Pending"

                : "Paid",

            totalPrice:

              item.book.price *

              item.quantity,

            shippingAddress:

              item.address ||
              "",

            status:
              "Order Placed",
          });

        const orderData =
          await newOrder.save();

        // save order in user

        await User.findByIdAndUpdate(

          userId,

          {

            $push: {

              orders:
                orderData._id,
            },
          }
        );
      }

      // clear cart

      await User.findByIdAndUpdate(

        userId,

        {

          $set: {

            cart: [],
          },
        }
      );

      // deduct wallet

      if (walletUsed > 0) {

        await User.findByIdAndUpdate(

          userId,

          {

            $inc: {

              wallet:
                -walletUsed,
            },

            $push: {

              walletHistory: {

                amount:
                  walletUsed,

                type:
                  "Purchase",

                message:
                  "Wallet used for order payment",
              },
            },
          }
        );
      }

      return res.status(200).json({

        message:
          "Order Placed Successfully",
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
// GET ORDER HISTORY
// =======================

router.get(
  "/get-order-history",

  authenticateToken,

  async (req, res) => {

    try {

      const {
        id: userId,
      } = req.headers;

      const userData =
        await User.findById(
          userId
        ).populate({

          path: "orders",

          populate: {
            path: "book",
          },
        });

      const ordersData =
        userData.orders.reverse();

      return res.status(200).json({

        status: "Success",

        data: ordersData,
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
// CANCEL ORDER
// =======================

router.put(
  "/cancel-order/:id",

  authenticateToken,

  async (req, res) => {

    try {

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        return res.status(404).json({

          message:
            "Order not found",
        });
      }

      // prevent duplicate cancel

      if (
        order.status ===
        "Canceled"
      ) {

        return res.status(400).json({

          message:
            "Order already canceled",
        });
      }

      // cannot cancel delivered

      if (

        order.status ===
          "Delivered" ||

        order.status ===
          "Out for Delivery"

      ) {

        return res.status(400).json({

          message:
            "Order cannot be canceled now",
        });
      }

      // restore stock

      const book =
        await Book.findById(
          order.book
        );

      if (book) {

        book.stock +=
          order.quantity;

        if (
          book.sold >=
          order.quantity
        ) {

          book.sold -=
            order.quantity;
        }

        await book.save();
      }

      // update order

      order.status =
        "Canceled";

      order.paymentStatus =
        order.paymentMode ===
        "COD"

          ? "Pending"

          : "Refunded";

      // refund details

      if (
        order.paymentMode !==
        "COD"
      ) {

        order.refundAmount =
          order.totalPrice;

        order.refundReason =
          "Order canceled by user";

        order.refundStatus =
          "Refunded";

        order.refundedAt =
          new Date();

        // refund wallet

        await User.findByIdAndUpdate(

          order.user,

          {

            $inc: {

              wallet:
                order.totalPrice,
            },

            $push: {

              walletHistory: {

                amount:
                  order.totalPrice,

                type:
                  "Refund",

                message:
                  `Refund received for canceled order ${order.invoiceNumber}`,
              },
            },
          }
        );
      }

      await order.save();

      return res.status(200).json({

        message:
          "Order canceled successfully & refund added to wallet",
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
// GET ALL ORDERS - ADMIN
// =======================

router.get(
  "/get-all-orders",

  authenticateToken,

  async (req, res) => {

    try {

      const {
        id: userId,
      } = req.headers;

      const user =
        await User.findById(
          userId
        );

      // admin validation

      if (
        !user ||
        user.role !== "admin"
      ) {

        return res.status(403).json({

          message:
            "You are not authorized to access admin routes",
        });
      }

      // fetch orders

      const orders =
        await Order.find()

          .populate(
            "book"
          )

          .populate(
            "user"
          )

          .sort({
            createdAt: -1,
          });

      return res.status(200).json({

        status: "Success",

        data: orders,
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
// UPDATE ORDER STATUS
// =======================

router.put(
  "/update-status/:id",

  authenticateToken,

  async (req, res) => {

    try {

      const {
        id: userId,
      } = req.headers;

      const user =
        await User.findById(
          userId
        );

      // admin validation

      if (
        !user ||
        user.role !== "admin"
      ) {

        return res.status(403).json({

          message:
            "You are not authorized to perform admin actions",
        });
      }

      const { status } =
        req.body;

      // valid statuses

      const validStatuses = [

        "Order Placed",

        "Processing",

        "Packed",

        "Shipped",

        "Out for Delivery",

        "Delivered",

        "Canceled",
      ];

      if (
        !validStatuses.includes(
          status
        )
      ) {

        return res.status(400).json({

          message:
            "Invalid status value",
        });
      }

      // find order

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        return res.status(404).json({

          message:
            "Order not found",
        });
      }

      // delivered

      if (
        status ===
        "Delivered"
      ) {

        order.deliveredAt =
          new Date();

        order.paymentStatus =
          "Paid";
      }

      // admin cancel refund

      if (
        status ===
        "Canceled"
      ) {

        // prevent duplicate refund

        if (
          order.status ===
          "Canceled"
        ) {

          return res.status(400).json({

            message:
              "Order already canceled",
          });
        }

        // refund only for online/wallet

        if (
          order.paymentMode !==
          "COD"
        ) {

          order.paymentStatus =
            "Refunded";

          order.refundStatus =
            "Refunded";

          order.refundAmount =
            order.totalPrice;

          order.refundReason =
            "Order canceled by admin";

          order.refundedAt =
            new Date();

          // refund wallet

          await User.findByIdAndUpdate(

            order.user,

            {

              $inc: {

                wallet:
                  order.totalPrice,
              },

              $push: {

                walletHistory: {

                  amount:
                    order.totalPrice,

                  type:
                    "Refund",

                  message:
                    `Refund received for canceled order ${order.invoiceNumber}`,
                },
              },
            }
          );
        }
      }

      // update status

      order.status =
        status;

      await order.save();

      return res.status(200).json({

        message:
          "Order Status Updated Successfully",
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
// DELETE ORDER - ADMIN
// =======================

router.delete(
  "/delete-order/:id",

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

      // find order

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        return res.status(404).json({

          message:
            "Order not found",
        });
      }

      // restore stock

      const book =
        await Book.findById(
          order.book
        );

      if (book) {

        book.stock +=
          order.quantity;

        if (
          book.sold >=
          order.quantity
        ) {

          book.sold -=
            order.quantity;
        }

        await book.save();
      }

      // remove order from user

      await User.findByIdAndUpdate(

        order.user,

        {

          $pull: {

            orders:
              order._id,
          },
        }
      );

      // permanently delete

      await Order.findByIdAndDelete(
        req.params.id
      );

      return res.status(200).json({

        message:
          "Order deleted successfully",
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