import express from "express";
import cors from "cors";
import { NotFoundError } from "./expressError.js";
import { add } from "./add.js";
import usersRoutes from "./routes/users.js";

// const express = require('express');
const app = express();

// allow both form-encoded and json body parsing
app.use(express.json());
app.use(express.urlencoded());

// allow connections to all routes from any browser
app.use(cors());

/** Sample route */
app.get("/", function (req, res) {
  return res.send(`2 + 3 = ${add(2, 3)}`);
});

/** routes */
//NOTE: /users is the prefix. Any routes within users do not need another /users
app.use("/users", usersRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  /* istanbul ignore next (ignore for coverage) */
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

export default app;