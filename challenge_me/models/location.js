import db from "../db.js";
import { constructWhereClause } from "../helpers/constructWhereClause.js";
import { BadRequestError, NotFoundError } from "../expressError.js";

class Location {

  /** Builds query to query user db based on req.query values for querying DB
   * @param { dist, origin }
 {
  dist: 100,
  origin: "37.774929,-122.419416",
  userIds: [1,3,4]
}
 * @returns {where, vals}
{ where: "WHERE dist = $1 AND origin = $2",
  vals: [100,"37.774929,-122.419416"]
}
  */
  static _filterWhereBuilder({ dist, origin, userIds }) {
    let whereParts = [];
    let vals = [];

    if (dist !== undefined) {
      vals.push(dist);
      whereParts.push(`dist = $${vals.length}`);
    }

    if (origin !== undefined) {
      vals.push(origin);
      whereParts.push(
        `origin = $${vals.length}`
      );
    }

    if (userIds !== undefined) {
      // I WANT THIS:
      // WHERE (user_id = 1 OR user_id = 3 OR user_id = 4)
    }

    const where = constructWhereClause(whereParts);

    return { where, vals };
  }

  /** Find all locations that match user criteria.
   *
   * searchFilters:
   * - userIds []
   * -
   */
  static async findAll(searchFilters = {}) {

    /*
select user_id, lat, long,
FROM locations
WHERE (user_id = 1 OR user_id = 3 OR user_id = 4) AND
    */

  }

}


export default Location;