const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if(!contact){
    res.status(404)
    throw new Error("contact not found")
  }

  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User is not allowed to update other users contacts")
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res.status(200).json(updatedContact);
});
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, mobile } = req.body;
  if (!name || !email || !mobile) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const contact = await Contact.create({
    name,
    email,
    mobile,
    user_id: req.user.id
  });
  res.status(201).json(contact);
});
const deleteContactt = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if(!contact){
    res.status(404)
    throw new Error("contact not found")
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User is not allowed to update other users contacts")
  }

  await Contact.deleteOne({_id: req.params.id});
  res.status(200).json(contact);
});
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if(!contact){
    res.status(404)
    throw new Error("contact not found")
  }
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  updateContact,
  createContact,
  deleteContactt,
  getContact,
};
