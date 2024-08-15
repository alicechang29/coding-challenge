/** Given raw data received from req.query
 * @param {*} rawData
 * { min_age: '27' }
 * @returns {userValuesToFilter, locationValuesToFilter}
 */

function parseReqQuery(rawData) {

  const userKeys = ['users_fav_color', 'min_age', 'max_age'];
  const userValuesToFilter = {};
  const locationValuesToFilter = {};

  for (let key in rawData) {
    if (userKeys.includes(key)) {
      userValuesToFilter[key] = rawData[key];
    } else {
      locationValuesToFilter[key] = rawData[key];
    }
  }

  return { userValuesToFilter, locationValuesToFilter };
}

export { parseReqQuery };