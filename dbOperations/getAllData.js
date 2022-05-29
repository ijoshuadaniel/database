const glob = require('glob');
const fs = require('fs');
const path = require('path');

const getAllData = (req, res) => {
  const body = req.body;
  const file = path.resolve(
    process.cwd(),
    'db',
    `${body.id}-${body.database}.json`
  );
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  res.status(200).json({
    schema: data.schema,
    data: data.data,
  });
};

module.exports = getAllData;
