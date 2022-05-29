const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

const insertData = (body, res) => {
  const data = JSON.parse(
    fs.readFileSync(
      path.resolve(process.cwd(), 'db', `${body.id}-${body.database}.json`),
      'utf-8'
    )
  );

  const schemaCheck = () => {
    const schema = Object.keys(data.schema);
    const receivedSchema = Object.keys({ id: '', ...body.data });
    receivedSchema.forEach((data, i) => {
      if (receivedSchema[i] !== schema[i]) {
        res.json({
          isSuccess: false,
          error: true,
          message: 'undefined schema ' + receivedSchema[i],
        });
      }
    });
  };

  schemaCheck();

  let dataCpy = {
    ...data,
  };

  dataCpy.data = [...data.data, { id: uniqid(), ...body.data }];
  fs.writeFileSync(
    path.resolve(process.cwd(), 'db', `${body.id}-${body.database}.json`),
    JSON.stringify(dataCpy),
    'utf-8'
  );
  const file = path.resolve(
    process.cwd(),
    'db',
    `${body.id}-${body.database}.json`
  );
  const dataRead = JSON.parse(fs.readFileSync(file, 'utf-8'));
  res.json({
    schema: dataRead.schema,
    data: dataRead.data,
  });
};

module.exports = insertData;
