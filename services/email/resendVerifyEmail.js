const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
    try { 
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email not found")
        }
        if (user.verify) {
            throw HttpError(401, "Verification has already been passed")
        }
        const verifyEmail = {
            to: email,
            subject: "Verify email",
            html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify email</a>`
        }
        await sendEmail(verifyEmail);
    }
    catch (error) {
    next(error)
    }
}

module.exports = resendVerifyEmail;