const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../middlewares");
const joi = require('joi');

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
}, { versionKey: false, timestamps: true })
  
contactSchema.post("save", handleMongooseError);

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required()
})

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(), 
  favorite: joi.boolean()
})

const Contact = model("contact", contactSchema);

module.exports = { Contact, addSchema, updateFavoriteSchema }