const User = require("../models/user");

const router = require("express").Router();

const { authenticateToken } = require("./userAuth");

// add book to favourites

router.put(
    "/add-book-to-favourite/:bookId",
    authenticateToken,
    async (req, res) => {

        try {

            // user id from headers
            const { id } = req.headers;

            // book id from params
            const { bookId } = req.params;

            const userData = await User.findById(id);

            // check already favourite

            const isBookFavourite =
                userData.favourites.includes(bookId);

            if (isBookFavourite) {

                return res.status(200).json({
                    message: "Book already in favourites"
                });
            }

            await User.findByIdAndUpdate(
                id,
                {
                    $push: { favourites: bookId }
                }
            );

            return res.status(200).json({
                message: "Book added to favourites"
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });
        }
    }
);

// remove book from favourites

router.put(
    "/remove-book-from-favourite/:bookId",
    authenticateToken,
    async (req, res) => {

        try {

            // user id from headers
            const { id } = req.headers;

            // book id from params
            const { bookId } = req.params;

            await User.findByIdAndUpdate(
                id,
                {
                    $pull: { favourites: bookId }
                }
            );

            return res.status(200).json({
                message: "Book removed from favourites"
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });
        }
    }
);

// get favourite books

router.get(
    "/get-favourite-books",
    authenticateToken,
    async (req, res) => {

        try {

            const { id } = req.headers;

            const userData = await User.findById(id)
                .populate("favourites");
            const favouriteBooks =
                userData.favourites.reverse();

            return res.status(200).json({
                status: "Success",
                data: userData.favourites
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });
        }
    }
);

module.exports = router;