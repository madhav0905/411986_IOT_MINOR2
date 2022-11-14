const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const path = require("path");
const bodyparser = require("body-parser"); //middleware
const { User, Parking, Location } = require("../Schemas/model");
const { appendFile } = require("fs");
const jwt = require("jsonwebtoken");
const urlencoded = bodyparser.urlencoded({ extended: false });
router.get("/explore", [urlencoded], (req, res) => {
  res.render("admins/explore", { msg: [] });
});
router.post("/createcity", [urlencoded], async (req, res) => {
  let city = req.body.fname;
  let result = await Location.find({ location_name: city });
  if (result.length) {
    return res.render("admins/explore", { msg: ["Already a city is created"] });
  } else {
    const obj = new Location({ location_name: city });
    const a = await obj.save();
    if (a) {
      return res.render("admins/explore", {
        msg: ["city is created"],
      });
    }
  }
});
router.get("/city", [urlencoded], async (req, res) => {
  let option = await Location.find({});
  console.log(option);
  return res.render("admins/parking", { options: option, msg: [] });
});
router.post("/createparking", [urlencoded], async (req, res) => {
  let parking_name = req.body.p_name;
  let result = await Parking.find({ parking_name: parking_name });
  if (result.length) {
    return res.redirect("/admin/city");
  } else {
    let obj = new Parking({
      parking_name: parking_name,
      location: req.body.choosecity,
    });
    let t = await obj.save();
    if (t) {
      return res.render("msg", { msg: "Success" });
    }
  }
});
module.exports.router2 = router;
