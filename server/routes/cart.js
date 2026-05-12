const User = require("../models/user");

const router = require("express").Router();

const { authenticateToken } = require("./userAuth");

// add book to cart

router.put(
    "/add-to-cart/:bookId",
    authenticateToken,
    async (req, res) => {

        try {

            // user id from headers

            const { id } = req.headers;

            // book id from params

            const { bookId } = req.params;

            const userData = await User.findById(id);

            // check if book already exists in cart

            const existingBook = userData.cart.find(
                (item) =>
                    item.book.toString() ===
                    bookId
            );

            // if already exists increase quantity

            if (existingBook) {

                existingBook.quantity += 1;

                await userData.save();

                return res.status(200).json({
                    message:
                        "Book quantity increased",
                });
            }

            // cart limit

            if (userData.cart.length >= 10) {

                return res.status(400).json({
                    message:
                        "Cart is full. Please remove some books.",
                });
            }

            // add new book

            userData.cart.push({
                book: bookId,
                quantity: 1,
            });

            await userData.save();

            return res.status(200).json({
                message: "Book added to cart",
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message,
            });
        }
    }
);

// increase quantity

router.put(
    "/increase-quantity/:bookId",
    authenticateToken,
    async (req, res) => {

        try {

            const { id } = req.headers;

            const { bookId } = req.params;

            const userData =
                await User.findById(id);

            const cartItem =
                userData.cart.find(
                    (item) =>
                        item.book.toString() ===
                        bookId
                );

            if (!cartItem) {

                return res.status(404).json({
                    message: "Book not found in cart",
                });
            }

            cartItem.quantity += 1;

            await userData.save();

            return res.status(200).json({
                message: "Quantity increased",
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message,
            });
        }
    }
);

// decrease quantity

router.put(
    "/decrease-quantity/:bookId",
    authenticateToken,
    async (req, res) => {

        try {

            const { id } = req.headers;

            const { bookId } = req.params;

            const userData =
                await User.findById(id);

            const cartItem =
                userData.cart.find(
                    (item) =>
                        item.book.toString() ===
                        bookId
                );

            if (!cartItem) {

                return res.status(404).json({
                    message: "Book not found in cart",
                });
            }

            // remove if quantity becomes 0

            if (cartItem.quantity === 1) {

                userData.cart =
                    userData.cart.filter(
                        (item) =>
                            item.book.toString() !==
                            bookId
                    );

            } else {

                cartItem.quantity -= 1;
            }

            await userData.save();

            return res.status(200).json({
                message: "Quantity decreased",
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message,
            });
        }
    }
);

// remove book from cart

router.put(
    "/remove-from-cart/:bookId",
    authenticateToken,
    async (req, res) => {

        try {

            const { id } = req.headers;

            const { bookId } = req.params;

            const userData =
                await User.findById(id);

            userData.cart =
                userData.cart.filter(
                    (item) =>
                        item.book.toString() !==
                        bookId
                );

            await userData.save();

            return res.status(200).json({
                message: "Book removed from cart",
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message,
            });
        }
    }
);

// get cart books

router.get(
    "/get-cart-books",
    authenticateToken,
    async (req, res) => {

        try {

            const { id } = req.headers;

            const userData = await User.findById(id)
                .populate("cart.book");

            const cartBooks =
                userData.cart.reverse();

            return res.status(200).json({
                status: "Success",
                data: cartBooks,
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message,
            });
        }
    }
);

module.exports = router;