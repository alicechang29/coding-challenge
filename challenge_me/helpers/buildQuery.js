/**
 * Builds WHERE clause for users db query based on req.query values for querying DB
@param { fav_color, min_age, max_age }
{
  fav_color: "red",
  min_age: 21,
  max_age: 45
}

@returns {where, vals}
{ where: "WHERE fav_color = $1 AND age BETWEEN $2 AND $3",
  vals: ["red", 21, 45]
}

 */

function buildUserQuery({ fav_color, min_age, max_age }) {

  let whereParts = [];
  let vals = [];

  if (fav_color !== undefined) {
    vals.push(fav_color);
    whereParts.push(`fav_color = $${vals.length}`);
  }

  if (min_age !== undefined && max_age !== undefined) {
    vals.push(min_age);
    vals.push(max_age);
    whereParts.push(
      `age BETWEEN ${vals.length - 1} AND ${vals.length}`
    );
  } else if (min_age !== undefined) {
    vals.push(min_age);
    whereParts.push(
      `age >= ${vals.length}`
    );
  } else if (max_age !== undefined) {
    vals.push(max_age);
    whereParts.push(
      `age <= ${vals.length}`
    );
  }

  const where = constructWhereClause(whereParts);

  return { where, vals };
}

/**
 * @param { dist, origin }
 * @returns {where, vals}
 */
function buildLocationQuery({ dist, origin }) {

  let whereParts = [];
  let vals = [];

  if (dist !== undefined) {
    vals.push(fav_color);
    whereParts.push(`fav_color = $${vals.length}`);
  }

  if (origin !== undefined) {
    vals.push(min_age);
    whereParts.push(
      `age >= ${vals.length}`
    );
  }

  const where = constructWhereClause(whereParts);

  return { where, vals };
}

/**Constructs the where clause.
 * @param whereParts [`fav_color = $1`, `min_age = $2`]
 * @returns "WHERE fav_color = $1 AND min_age = $2"
 */
function constructWhereClause(whereParts) {
  const where = (whereParts.length > 0)
    ? "WHERE " + whereParts.join("AND")
    : "";

  return where;
}