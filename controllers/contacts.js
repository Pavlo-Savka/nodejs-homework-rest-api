const express = require('express')
const { Contact } = require('../models/contact')
const HttpError = require("../helpers")

const getAll = async (req, res, next) => {
  try {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
  }
  catch (error) {
    next(error);
  }
}

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

const add = async (req, res, next) => { 
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  }
  catch (error) {
     next(error);
  }
}

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

const updateById = async (req, res, next) => { 
  try {
    const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
        if (!result) {
      throw HttpError(404, "ID not found");
    }
  res.json(result)
  }
  catch (error) {
    next(error);
  }
}

const updateFavorite = async (req, res, next) => { 
  try {
    const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
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
  getAll,
  getById,
  add,
  delById,
  updateById,
  updateFavorite
}