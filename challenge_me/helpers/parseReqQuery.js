function parseReqQuery(req.query) {
  const userValuesToFilter = {};
  const locationValuesToFilter = {};

  for (key in req.query) {
    if (userKeys.includes(key)) {
      userValuesToFilter[key] = req.query[key];
    } else {
      locationValuesToFilter[key] = req.query[key];
    }
  }

  return { userValuesToFilter, locationValuesToFilter };
}