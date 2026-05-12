const express = require("express");

const app = express();

const cors = require("cors");

require("dotenv").config();

// =======================
// DATABASE CONNECTION
// =======================

const conn =
  require("./connections/conn");

// =======================
// ROUTES
// =======================

const User =
  require("./routes/user");

const bookRoutes =
  require("./routes/book");

const Favourite =
  require("./routes/favourite");

const Cart =
  require("./routes/cart");

const orderRoutes =
  require("./routes/order");

const adminRoutes =
  require("./routes/admin");

const paymentRoutes =
  require("./routes/payment");

// =======================
// MIDDLEWARE
// =======================

app.use(express.json());

app.use(cors());

// =======================
// CONNECT DATABASE
// =======================

conn();

// =======================
// API ROUTES
// =======================

app.use("/api/v1", User);

app.use("/api/v1", bookRoutes);

app.use("/api/v1", Favourite);

app.use("/api/v1", Cart);

app.use("/api/v1", orderRoutes);

app.use("/api/v1", adminRoutes);

app.use("/api/v1", paymentRoutes);

// =======================
// DEFAULT ROUTE
// =======================

app.get("/", (req, res) => {

  res.send(
    "BookNest Backend Running Successfully 🚀"
  );
});

// =======================
// SERVER
// =======================

app.listen(
  process.env.PORT,
  () => {

    console.log(

      `Server is running on port ${process.env.PORT} 🚀`
    );
  }
);