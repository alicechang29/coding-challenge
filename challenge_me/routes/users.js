import express from "express";
import { Router } from "express";
import { parseReqQuery } from "../helpers/parseReqQuery.js";
// import { buildUserQuery, buildLocationQuery } from "../helpers/buildQuery.js";
import User from "../models/users.js";
import Location from "../models/location.js";

const router = new Router();

router.get("/", async function (req, res) {
  console.log("Users route was hit");

  const parsedData = parseReqQuery(req.query);

  const users = await User.findAll(parsedData.userValuesToFilter);

  console.log("USERS", users);
  /*
USERS [
  { id: 1, name: 'Taylor Swift', age: 27, fav_color: 'red' },
  { id: 3, name: 'Emma Watson', age: 28, fav_color: 'blue' },
  { id: 4, name: 'Emilia Clarke', age: 30, fav_color: 'magenta' }
]
  */

  const userIds = users.map(user => user.id);
  // filter for locations that match those users

  return res.json({ users });


});

export default router;