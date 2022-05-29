const glob = require('glob');
const fs = require('fs');
const path = require('path');

const getAllDatabase = (data, res) => {
  const dataArray = [];
  return glob(
    path.resolve(process.cwd(), 'db', `${data.id}-*.json`),
    (err, files) => {
      files.map((file) => {
        const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
        dataArray.push({
          database: data.database,
          schema: data.schema,
        });
      });
      res.json(dataArray);
    }
  );
};

module.exports = getAllDatabase;
