// const express = require('express')
const { Contact } = require('../../models/contact')
//const HttpError = require("../../helpers")

const getAll = async (req, res, next) => {
  try {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
  }
  catch (error) {
    next(error);
  }
}

module.exports = {
  getAll
}