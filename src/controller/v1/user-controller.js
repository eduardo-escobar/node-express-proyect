const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 15);
    console.log('req.body', req.body);
    console.log('Fin');
    res.send({ status: 'OK', messages: hash });
  } catch (error) {
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
