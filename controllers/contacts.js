const express = require('express')
const contacts = require('../models/contacts')
const HttpError = require("../helpers")

const getAll = async (req, res, next) => {
  try {
  const result = await contacts.listContacts();
  res.json(result);
  }
  catch (error) {
    next(error);
  }
}

const getById = async (req, res, next) => { 
  try {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
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
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
     next(error);
  }
}

const delById = async (req, res, next) => { 
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
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
    const result = await contacts.updateContact(contactId, req.body);
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
  updateById
}