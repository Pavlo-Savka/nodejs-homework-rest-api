const express = require('express')

const router = express.Router()
const path = require("path")
const ctrl = require('../../controllers/contacts')
const { validateBody, isValidId, authenticate } = require("../../middlewares")
const { addSchema, updateFavoriteSchema } = require("../../models/contact")

router.get('/favorite', authenticate, ctrl.getFavorite)

router.get('/', authenticate, ctrl.getAll)

router.get('/:contactId', authenticate, isValidId, ctrl.getById)

router.delete('/:contactId', authenticate, isValidId, ctrl.delById)

router.put('/:contactId', authenticate, isValidId, validateBody(addSchema), ctrl.updateById)

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router