const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const joi = require('joi');
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
name: {
      type: String,
      required: [true, 'Set name for user'],
    },
    email: {
        type: String,
        required: [true, 'Set email for user'],
        match: emailRegExp,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlendth: 6,
}
}, { versionKey: false, timestamps: true })

userSchema.post("save", handleMongooseError);

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().pattern(emailRegExp),
  password: joi.string().min(6).required(),
})

const loginSchema = joi.object({
  email: joi.string().pattern(emailRegExp),
  password: joi.string().min(6).required(),
})

const schemas = {
    registerSchema,
    loginSchema
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas
}