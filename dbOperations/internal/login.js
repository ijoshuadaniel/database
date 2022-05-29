const path = require('path');
const unique = require('uniqid');
const fs = require('fs');

const filePath = path.resolve(process.cwd(), 'db', 'users.json');

const signUpUser = (data, res) => {
  if (
    data &&
    data.name &&
    data.email &&
    data.password &&
    data.confirmPassword
  ) {
    const readFile = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (readFile.data.length > 0) {
      const isUserExist = readFile.data.filter(
        (item) => item.email === data.email
      );
      if (isUserExist.length > 0) {
        res.status(200).json({
          error: true,
          msg: 'User Exist',
        });
      } else {
        const user = {
          id: unique(),
          name: data.name,
          email: data.email,
          password: data.password,
          auth: unique('', `${Math.random() + 1}`),
        };
        const newFileData = {
          data: [...readFile.data, user],
        };
        try {
          fs.writeFileSync(filePath, JSON.stringify(newFileData), 'utf-8');
          res.status(200).json({
            success: true,
            msg: 'User creation successfull',
            error: false,
          });
        } catch (err) {
          res.status(500).json({
            error: true,
            msg: err.message,
          });
        }
      }
    } else {
      const user = {
        id: unique(),
        name: data.name,
        email: data.email,
        password: data.password,
        auth: unique('', `${Math.random() + 1}`),
      };
      const newFileData = {
        data: [...readFile.data, user],
      };
      try {
        fs.writeFileSync(filePath, JSON.stringify(newFileData), 'utf-8');
        res.status(200).json({
          success: true,
          msg: 'User creation successfull',
          error: false,
        });
      } catch (err) {
        res.status(500).json({
          error: true,
          msg: err.message,
        });
      }
    }
  } else {
    res.status(403).json({
      error: true,
      msg: 'Unauthorized',
    });
  }
};

const loginUser = (data, res) => {
  if (data && data.email && data.password) {
    const readFile = JSON.parse(
      fs.readFileSync(path.resolve(filePath), 'utf-8')
    );
    const isUserExist = readFile.data.filter(
      (item) => item.email === data.email
    );
    if (isUserExist.length > 0) {
      const userData = isUserExist[0];
      if (userData.password === data.password) {
        res.status(200).json({
          success: true,
          data: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            auth: userData.auth,
          },
        });
      } else {
        res.status(200).json({
          error: true,
          msg: 'Unauthorized',
        });
      }
    } else {
      res.status(200).json({
        error: true,
        msg: 'User not found please sign up',
      });
    }
  } else {
    res.status(200).json({
      error: true,
      msg: 'Unauthorized',
    });
  }
};

module.exports = {
  signUpUser,
  loginUser,
};
