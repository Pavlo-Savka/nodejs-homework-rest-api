const { User } = require("../../models/user");

const logout = async (req, res) => {

    const { _id } = req.user
    try {
        await User.findByIdAndUpdate(_id, { token: "" })
        res.json({
            message: "Logout success",
        }  )
    }
    catch (error) {
        next(error)
    }
}
module.exports = logout;