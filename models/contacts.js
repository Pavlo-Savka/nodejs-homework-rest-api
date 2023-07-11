const fs = require('fs/promises')
const { nanoid } = require("nanoid");
const path = require("path");
const BASE_PATH = __dirname;
const dbFile = "/contacts.json";
const contactsPath = path.join(BASE_PATH, dbFile);

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath, "UTF-8");
  return JSON.parse(allContacts);
}

const getContactById = async (contactId) => {
  contactId = String(contactId);
  const allContacts = await listContacts();
  if (Array.isArray(allContacts)) {
        
        const oneContact = allContacts.find(item => item.id === contactId);
        return oneContact || null;
    }
}

const removeContact = async (contactId) => {
    const allContacts = await listContacts();
    console.log(typeof(allContacts));
    contactId = String(contactId);
    const index = allContacts.findIndex(item => item.id === contactId);
    if (index === -1) { return null };
    const [result] = allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return result;
}

const addContact = async (body) => {
    const allContacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...body,
    };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact; 
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(item => item.id === contactId);
  if (index === -1) { return null }
  allContacts[index] = {id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
