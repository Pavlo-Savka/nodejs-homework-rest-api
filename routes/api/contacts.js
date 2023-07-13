const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts')
const { validateBody, isValidId } = require("../../middlewares")
const { addSchema, updateFavoriteSchema } = require("../../models/contact")

router.get('/', ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', validateBody(addSchema), ctrl.add)

router.delete('/:contactId', isValidId, ctrl.delById)

router.put('/:contactId', isValidId, validateBody(addSchema), ctrl.updateById)

router.patch('/:contactId/favorite', isValidId, validateBody(updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router