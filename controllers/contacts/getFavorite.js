const { Contact } = require('../../models/contact')
const HttpError = require("../../helpers")

const getFavorite = async (req, res, next) => {
    try {
    const { _id: owner } = req.user
    const result = await Contact.find({ owner, favorite: true }, "-createdAt -updatedAt", ).populate("owner", "name email");
        res.json(result)
    if (!result) {
    throw HttpError(404, "Favorite contacts not found");
    }
    }
    catch (error) {
        next(error);
    }
}

module.exports = { getFavorite };