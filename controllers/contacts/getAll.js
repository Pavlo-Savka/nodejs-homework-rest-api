// const express = require('express')
const { Contact } = require('../../models/contact')
//const HttpError = require("../../helpers")

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user
    const { page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
  res.json(result);
  }
  catch (error) {
    next(error);
  }
}

module.exports = {
  getAll
}