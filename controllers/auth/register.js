const bcrypt = require("bcrypt")
const { User } = require("../../models/user")
const { HttpError } = require("../../helpers")
const gravatar = require("gravatar")

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email alredy in use")
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email)
        const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
        res.status(201).json({
            email: newUser.email,
            name: newUser.name,
            subscription: newUser.subscription,
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = register;