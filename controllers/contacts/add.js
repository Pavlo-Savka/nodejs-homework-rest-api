const express = require('express')
const { Contact } = require('../../models/contact.js')
//const HttpError = require("../../helpers")

const add = async (req, res, next) => { 
  
  try {
    const { _id: owner } = req.user
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  }
  catch (error) {
     next(error);
  }
}

module.exports = {
  add
}