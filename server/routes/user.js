const User = require("../models/user");

const router = require("express").Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const {
  authenticateToken,
} = require("./userAuth");

// =======================
// SIGN-UP
// =======================

router.post(
  "/sign-up",
  async (req, res) => {

    try {

      const {
        username,
        email,
        password,
        address,
      } = req.body;

      // username validation

      if (username.length < 4) {

        return res.status(400).json({
          message:
            "Username length should be greater than 3",
        });
      }

      // existing username

      const existingUsername =
        await User.findOne({
          username,
        });

      if (existingUsername) {

        return res.status(400).json({
          message:
            "Username already exists",
        });
      }

      // existing email

      const existingEmail =
        await User.findOne({
          email,
        });

      if (existingEmail) {

        return res.status(400).json({
          message:
            "Email already exists",
        });
      }

      // password validation

      if (password.length < 6) {

        return res.status(400).json({
          message:
            "Password should contain at least 6 characters",
        });
      }

      // hash password

      const hashPass =
        await bcrypt.hash(
          password,
          10
        );

      // create user

      const newUser =
        new User({

          username,

          email,

          password: hashPass,

          address,

          role: "user",
        });

      await newUser.save();

      return res.status(200).json({
        message:
          "Signup Successfully",
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
// SIGN-IN
// =======================

router.post(
  "/sign-in",
  async (req, res) => {

    try {

      const {
        username,
        password,
      } = req.body;

      // check user

      const existingUser =
        await User.findOne({
          username,
        });

      if (!existingUser) {

        return res.status(400).json({
          message:
            "Invalid Credentials",
        });
      }

      // blocked account

      if (
        existingUser.accountStatus ===
        "blocked"
      ) {

        return res.status(403).json({
          message:
            "Your account has been blocked",
        });
      }

      // compare password

      const isMatch =
        await bcrypt.compare(
          password,
          existingUser.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Invalid Credentials",
        });
      }

      // token claims

      const authClaims = [

        {
          name:
            existingUser.username,
        },

        {
          role:
            existingUser.role,
        },
      ];

      // generate token

      const token = jwt.sign(

        { authClaims },

        "bookstore123",

        {
          expiresIn: "30d",
        }
      );

      // update login time

      existingUser.lastLogin =
        new Date();

      await existingUser.save();

      return res.status(200).json({

        id: existingUser._id,

        role:
          existingUser.role,

        token,

        username:
          existingUser.username,

        email:
          existingUser.email,
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
// GET USER INFORMATION
// =======================

router.get(
  "/get-user-information",
  authenticateToken,
  async (req, res) => {

    try {

      const { id } =
        req.headers;

      const data =
        await User.findById(id)

          .select("-password")

          .populate("favourites")

          .populate("orders");

      return res.status(200).json({

        status: "Success",

        data: data,
      });

    } catch (error) {

      return res.status(500).json({
        message:
          "Internal server error",
      });
    }
  }
);

// =======================
// UPDATE ADDRESS
// =======================

router.put(
  "/update-address",
  authenticateToken,
  async (req, res) => {

    try {

      const { id } =
        req.headers;

      const { address } =
        req.body;

      await User.findByIdAndUpdate(
        id,
        {
          address,
        }
      );

      return res.status(200).json({
        message:
          "Address Updated Successfully",
      });

    } catch (error) {

      return res.status(500).json({
        message:
          "Internal server error",
      });
    }
  }
);

// =======================
// UPDATE PROFILE
// =======================

router.put(
  "/update-profile",
  authenticateToken,
  async (req, res) => {

    try {

      const { id } =
        req.headers;

      const {
        username,
        phone,
        avatar,
      } = req.body;

      await User.findByIdAndUpdate(
        id,
        {
          username,
          phone,
          avatar,
        }
      );

      return res.status(200).json({
        message:
          "Profile Updated Successfully",
      });

    } catch (error) {

      return res.status(500).json({
        message:
          "Internal server error",
      });
    }
  }
);

module.exports = router;