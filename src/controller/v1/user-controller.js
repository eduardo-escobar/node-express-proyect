const bcrypt = require('bcrypt');
const User = require('../../mongo/models/user');
const createUser = async (req, res) => {
  try {

    const { userName, password, email, data } = req.body;

    const hash = await bcrypt.hash(password, 15);
    
    await User.create({
      userName,
      password: hash,
      email,
      data,
    });

    console.log('req.body', req.body);
    res.send({ status: 'OK', messages: 'user created' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res.status(400).send({ status: 'DUPLICATED_VALUES', messages: error.keyValue});
      return;
    }
    console.log(error);
    res.status(500).send({ status: 'ERROR', messages: error.message });
  }
};

const deleteUser = (req, res) => {
  res.send({ status: 'OK', messages: 'user delete' });
};

const getUser = (req, res) => {
  res.send({ status: 'OK', data: {} });
};

const updateUser = (req, res) => {
  res.send({ status: 'OK', messages: 'user update' });
};

module.exports = { createUser, deleteUser, getUser, updateUser };
