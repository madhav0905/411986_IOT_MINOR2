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
router.get("/explore", urlencoded, async (req, res) => {
  const t = req.cookies.access_token;
  let uid;
  const dec = await jwt.verify(t, process.env.secret);
  if (dec) {
    uid = dec._id;
    const loc = await Location.find({});

    return res.render("user/select", { uid: uid, loc: loc });
  } else {
    return res.render("msg", { msg: "error" });
  }
});
router.get("/select", urlencoded, async (req, res) => {
  const t = req.cookies.access_token;
  let uid;
  const dec = await jwt.verify(t, process.env.secret);
  if (dec) {
    uid = dec._id;
    const locid = req.query.selectcity;

    const pdata = await Parking.find({ location: locid });

    return res.render("user/area", { pdata: pdata });
  } else {
    return res.render("msg", { msg: "error" });
  }
});
router.post("/selected", urlencoded, async (req, res) => {
  const t = req.cookies.access_token;
  let uid;
  const dec = await jwt.verify(t, process.env.secret);
  if (dec) {
    uid = dec._id;
    const area = req.body.selectarea;
    let obj = await Parking.findById(area);

    // return res.send(obj);
    if (obj) {
      if (!obj.parking_userid.includes(uid)) {
        obj.parking_userid.push(uid);
        obj.slotsavailable--;
        await obj.save();
        return res.render("msg", { msg: "Success" });
      } else {
        return res.render("msg", {
          msg: "Already this user has parked there ",
        });
      }
    }
  }
});
module.exports.router3 = router;
