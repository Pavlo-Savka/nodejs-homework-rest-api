const { HttpError } = require("../helpers")
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const {User} = require("../models/user")

const authenticate = async (req, res, next) => {

    try {
    const { authorization = "" } = req.headers
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token ) {
        next(HttpError(401, "No token"))
    }
        const { id } = jwt.verify(token, SECRET_KEY)
        const user = await User.findById(id)
        if (!user || !user.token || user.token !== token)   
        {
             next(HttpError(401, "No user"))
        }
        req.user = user;
        next()
    }
    catch {
        next(HttpError(401))
    }
}

module.exports = authenticate;