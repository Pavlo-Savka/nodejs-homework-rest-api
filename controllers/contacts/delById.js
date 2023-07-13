const express = require('express')
const { Contact } = require('../../models/contact')
const HttpError = require("../../helpers")

const delById = async (req, res, next) => { 
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
      throw HttpError(404, "ID not found");
  }  
    res.json({message: "Contact deleted"})
  }
  catch (error) {
   next(error); 
  }
}

module.exports = {
  delById
}