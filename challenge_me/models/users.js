import db from "../db.js";
import { constructWhereClause } from "../helpers/constructWhereClause.js";
import { BadRequestError, NotFoundError } from "../expressError.js";

class User {

  /** Builds query to query user db based on req.query values for querying DB
   * @param { fav_color, min_age, max_age }
   * {
      fav_color: "red",
        min_age: 21,
          max_age: 45;
    }
   * @returns {where, vals}
   *{
      where: "WHERE user_fav_color = $1 AND age BETWEEN $2 AND $3",
        vals: ["red", 21, 45];
    }
  */
  static _filterWhereBuilder({ fav_color, min_age, max_age }) {

    let whereParts = [];
    let vals = [];

    if (fav_color !== undefined) {
      vals.push(fav_color);
      whereParts.push(`user_fav_color = $${vals.length}`);
    }

    if (min_age !== undefined && max_age !== undefined) {
      vals.push(min_age);
      vals.push(max_age);
      whereParts.push(
        `user_age BETWEEN $${vals.length - 1} AND $${vals.length}`
      );
    } else if (min_age !== undefined) {
      vals.push(min_age);
      whereParts.push(
        `user_age >= $${vals.length}`
      );
    } else if (max_age !== undefined) {
      vals.push(max_age);
      whereParts.push(
        `user_age <= $${vals.length}`
      );
    }

    const where = constructWhereClause(whereParts);

    console.log({ where, vals });

    return { where, vals };
  }

  /** Find all users (optional filter on searchFilters).
   *
   * searchFilters:
   * - fav_color
   * - min_age
   * - max_age
   */
  static async findAll(searchFilters = {}) {
    const { fav_color, min_age, max_age } = searchFilters;

    if (min_age > max_age) {
      throw new BadRequestError("Min age cannot be greater than max age.");
    }

    const { where, vals } = this._filterWhereBuilder({
      fav_color, min_age, max_age
    });

    // const usersRes = await db.query(`SELECT * FROM users`);
    // return usersRes.rows;

    const usersRes = await db.query(`
      SELECT  user_id AS "id",
              user_name AS "name",
              user_age AS "age",
              user_fav_color AS "fav_color"
      FROM users ${where}
      ORDER BY id`, vals);

    return usersRes.rows;
  }

}

// console.log(await User.findAll({ fav_color: "green", min_age: 53 }));
// console.log(await User.findAll({}));

export default User;