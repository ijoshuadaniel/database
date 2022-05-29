const fs = require('fs');
const path = require('path');

const getDataFromDatabase = (data, res) => {
  const database = JSON.parse(
    fs.readFileSync(
      path.resolve(process.cwd(), 'db', `${data.id}-${data.database}.json`),
      'utf-8'
    )
  );
  if (data.schema) {
    let newDataArray = [];
    const allKeys = Object.keys(data.schema);
    database.data.map((item, i) => {
      const pick = (obj, ...args) => ({
        ...args.reduce((res, key) => ({ ...res, [key]: obj[key] }), {}),
      });
      newDataArray.push(pick(item, ...allKeys));
    });
    if (data.limit) {
      const limitedData = [];
      newDataArray.map((item, i) => {
        if (i <= data.limit - 1) {
          limitedData.push(item);
        }
      });
      res.json(limitedData);
    } else {
      res.json(newDataArray);
    }
  } else {
    res.json(database.data);
  }
};

module.exports = getDataFromDatabase;
