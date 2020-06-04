const bcrypt = require('bcrypt');
const User = require('../../mongo/models/user');
const jwt = require('jsonwebtoken');
const expiresIn = 60 * 10;
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        var token = jwt.sign(
          { userId: user.id, role: user.role },
          process.env.JWT_TOKEN,
          { expiresIn }
        );
        res.send({ status: 'OK', data: { token, expiresIn } });
      } else {
        res.status(403).send({ status: 'INVALID_PASSWORD', message: '' });
      }
    } else {
      res.status(401).send({ status: 'USER_NOT_FOUND', message: '' });
    }
  } catch (error) {
    res.status(500).send({ status: 'ERROR', messages: error.message });
  }
};

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
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', messages: error.keyValue });
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

const updateUser = async (req, res) => {
  try {
    const { userName, email, userId, data } = req.body;
    await User.findByIdAndUpdate(userId, {
      userName,
      email,
      data,
    });
    res.send({ status: 'OK', messages: 'user update' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', messages: error.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: 'error update' });
  }
};

module.exports = { createUser, deleteUser, getUser, updateUser, login };
