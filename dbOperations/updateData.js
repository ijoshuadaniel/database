const fs = require('fs');
const path = require('path');

const updateData = (data, res) => {
  const database = JSON.parse(
    fs.readFileSync(
      path.resolve(process.cwd(), 'db', `${data.id}-${data.database}.json`),
      'utf-8'
    )
  );
  const dataArray = [];
  database.data.map((item) => {
    if (item.id === data.update.id) {
      dataArray.push({
        ...item,
        ...data.update,
      });
    } else {
      dataArray.push(item);
    }
  });

  const newData = {
    ...database,
    data: dataArray,
  };

  fs.writeFileSync(
    path.resolve(process.cwd(), 'db', `${data.id}-${data.database}.json`),
    JSON.stringify(newData),
    'utf-8'
  );

  res.json(data.update);
};

module.exports = updateData;
