const bcrypt = require("bcrypt")
const { User } = require("../../models/user")
const { HttpError} = require("../../helpers")
const gravatar = require("gravatar")
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;
const emailService = require("../../services/email")

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email alredy in use")
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email)
        const verificationCode = nanoid();

        const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationCode });
        res.status(201).json({
            email: newUser.email,
            name: newUser.name,
            subscription: newUser.subscription,
        });

        const verifyEmail = {
            to: email,
            subject: "Verify email",
            html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`
        }
        await emailService.sendEmail(verifyEmail);

    }
    catch (error) {
        next(error)
    }
}

module.exports = register;