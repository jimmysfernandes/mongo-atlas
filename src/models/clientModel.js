const { Mongoose } = require("mongoose");

const { Schema, model } = require('mongoose');

const stringReq = { type: String, required: true };

const clientSchema = new Schema({
  firstName: stringReq,
  lastName: stringReq,
  email: stringReq,
  nickName: stringReq,
  birthDate: { type: Date, required: true }
}, {
  collection: 'clients'
});

clientSchema.index({ email: 1 }, { unique: true });

module.exports = model('Clients', clientSchema);

