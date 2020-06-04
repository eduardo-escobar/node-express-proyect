const bcrypt = require('bcrypt');
const User = require('../../mongo/models/user');
const Product = require('../../mongo/models/product');
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
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(402)
      .send({ status: 'ERROR', messages: 'Mising param userId' });
  }

  User.findByIdAndDelete(userId)
    .then(async () => {
      await Product.deleteMany({ user: userId });
      return res.send({ status: 'OK', messages: 'user delete' });
    })
    .catch((error) =>
      res.status(500).send({ status: 'ERROR', messages: error.message })
    );
};

const getUser = async (req, res) => {
  try {
    const users = await User.find().select({ password: 0, role: 0 });

    res.send({ status: 'OK', data: users });
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userName, email, data } = req.body;
    await User.findByIdAndUpdate(req.sessionData.userId, {
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
