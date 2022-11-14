const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { string } = require("joi");

const userschema = new mongoose.Schema({
  user_name: { type: String, unique: true, minlength: 5, required: true },
  name: { type: String, minlength: 5, required: true },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  age: {
    type: "Number",
    required: true,
  },
  address: {
    type: String,
    minlength: 5,
    required: true,
    //team
    //tournament
  },

  bloodgroup: String,

  role: {
    type: String,
    default: "user",
  },
});
const parkingschema = new mongoose.Schema({
  parking_name: { type: String, unique: true, minlength: 5, required: true },
  slotsavailable: { type: "Number", required: true, default: 5 },
  parking_userid: [
    { type: mongoose.Schema.Types.ObjectId, default: [], ref: "user" },
  ],
  location: { type: mongoose.Schema.Types.ObjectId, ref: "location" },
});
const locationschema = new mongoose.Schema({
  location_name: { type: String, unique: true, required: true },
  location_parkingid: [
    { type: mongoose.Schema.Types.ObjectId, default: [], ref: "parking" },
  ],
});
const User = new mongoose.model("user", userschema);
const Parking = new mongoose.model("parking", parkingschema);
const Location = new mongoose.model("location", locationschema);
module.exports.User = User;
module.exports.Parking = Parking;
module.exports.Location = Location;
