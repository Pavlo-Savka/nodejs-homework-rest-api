const { add } = require("./add")
const { delById } = require("./delById")
const { getAll } = require("./getAll")
const { getById } = require("./getById")
const { updateById } = require("./updateById")
const { updateFavorite } = require("./updateFavorite")

module.exports = {
    updateFavorite,
    add,
    delById,
    getAll,
    getById,
    updateById
}