//const express = require('express')
const { Contact } = require('../../models/contact')
const HttpError = require("../../helpers")

const getById = async (req, res, next) => { 
  try {
  const { contactId } = req.params;
    // const result = await Contact.findOne({ _id: contactId });
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "ID not found");
    }
  res.json(result)
  }
  catch (error) {
    next(error);
  }
}

module.exports = {
  getById
}