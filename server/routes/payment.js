const router =
  require("express").Router();

const Razorpay =
  require("razorpay");

const crypto =
  require("crypto");

const {
  authenticateToken,
} = require("./userAuth");

// =======================
// DEBUG ENV
// =======================

console.log(
  "RAZORPAY KEY:",
  process.env.RAZORPAY_KEY_ID
);

console.log(
  "RAZORPAY SECRET:",
  process.env.RAZORPAY_SECRET
);

// =======================
// RAZORPAY INSTANCE
// =======================

const razorpay =
  new Razorpay({

    key_id:
      process.env.RAZORPAY_KEY_ID,

    key_secret:
      process.env.RAZORPAY_SECRET,
  });

// =======================
// CREATE ORDER
// =======================

router.post(
  "/create-order",
  authenticateToken,
  async (req, res) => {

    try {

      const { amount } =
        req.body;

      console.log(
        "Received Amount:",
        amount
      );

      // options

      const options = {

        amount:
          Number(amount) * 100,

        currency: "INR",

        receipt:
          `receipt_${Date.now()}`,
      };

      console.log(
        "Razorpay Options:",
        options
      );

      // create razorpay order

      const order =
        await razorpay.orders.create(
          options
        );

      console.log(
        "Razorpay Order Created:",
        order
      );

      return res.status(200).json({

        success: true,

        order,
      });

    } catch (error) {

      console.log(
        "CREATE ORDER ERROR:"
      );

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  }
);

// =======================
// VERIFY PAYMENT
// =======================

router.post(
  "/verify-payment",
  authenticateToken,
  async (req, res) => {

    try {

      const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature,

      } = req.body;

      // generate signature

      const body =

        razorpay_order_id +

        "|" +

        razorpay_payment_id;

      const expectedSignature =

        crypto

          .createHmac(

            "sha256",

            process.env
              .RAZORPAY_SECRET
          )

          .update(
            body.toString()
          )

          .digest("hex");

      // verify

      const isAuthentic =

        expectedSignature ===
        razorpay_signature;

      if (!isAuthentic) {

        return res.status(400).json({

          success: false,

          message:
            "Payment verification failed",
        });
      }

      return res.status(200).json({

        success: true,

        message:
          "Payment verified successfully",
      });

    } catch (error) {

      console.log(
        "VERIFY PAYMENT ERROR:"
      );

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  }
);

module.exports = router;