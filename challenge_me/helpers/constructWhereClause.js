
/**Constructs the where clause.
 * @param whereParts [`fav_color = $1`, `min_age = $2`]
 * @returns "WHERE fav_color = $1 AND min_age = $2"
 */
function constructWhereClause(whereParts) {
  const where = (whereParts.length > 0)
    ? "WHERE " + whereParts.join(" AND ")
    : "";

  return where;
}

export { constructWhereClause };