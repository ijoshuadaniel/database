const fs = require('fs');
const path = require('path');

const deleteDatabse = (data, res) => {
  console.log(
    path.resolve(process.cwd(), 'db', `${data.id}-${data.database}.json`)
  );
  const filePath = path.resolve(
    process.cwd(),
    'db',
    `${data.id}-${data.database}.json`
  );
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(
        path.resolve(process.cwd(), 'db', `${data.id}-${data.database}.json`)
      );
      res.json({
        isSuccess: true,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    res.json({
      isSuccess: false,
    });
  }
};

module.exports = deleteDatabse;
