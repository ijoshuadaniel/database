const fs = require('fs');
const path = require('path');

const writeSchema = (data) => {
  const database = {};
  database.database = data.database;
  database.schema = { id: 'string', ...data.schema };
  database.data = [];

  if (
    !fs.existsSync(path.resolve(process.cwd(), 'db', data.database + '.json'))
  ) {
    try {
      fs.writeFileSync(
        path.resolve(
          process.cwd(),
          'db',
          data.id + '-' + data.database + '.json'
        ),
        JSON.stringify(database)
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    return false;
  }
};

module.exports = writeSchema;
