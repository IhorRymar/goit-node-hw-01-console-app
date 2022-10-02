const path = require('path');
const fs = require('fs/promises');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newId = parseInt(contacts[contacts.length - 1].id) + 1;
  const newContact = {
    id: `${newId}`,
    name,
    email,
    phone,
  };
  const newContactsList = JSON.stringify([...contacts, newContact], null, 2);
  await fs.writeFile(contactsPath, newContactsList);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
