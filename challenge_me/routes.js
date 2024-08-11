import express from "express";

const router = new express.Router();

const userKeys = ['fav_color', 'min_age', 'max_age'];

router.get("/users", async function (req, res) {
  //import parse req query fn
  // i am separating out location from user values and then
  // constructing the sql where clause (buildQuery.js)

});