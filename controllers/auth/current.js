
const current = async (req, res) => {
    try {
    const { email, name, subscription } = req.user;
    res.json({
        email, name, subscription
    })
    }
    catch (error) {
        next(error)
    }
}

module.exports = current