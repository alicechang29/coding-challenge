/** Shared config for application; can be required many places. */

import dotenv from "dotenv";
import "colors";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
    ? "postgresql:///fsCodingChallenge_test"
    : process.env.DATABASE_URL || "postgresql:///fsCodingChallenge";
}


if (process.env.NODE_ENV !== "test") {
  console.log(`
${"coding-challenge Config:".green}
${"NODE_ENV:".yellow}           ${process.env.NODE_ENV}
${"SECRET_KEY:".yellow}         ${SECRET_KEY}
${"PORT:".yellow}               ${PORT}
${"Database:".yellow}           ${getDatabaseUri()}
---`);
}

export {
  SECRET_KEY,
  PORT,
  getDatabaseUri,
};
