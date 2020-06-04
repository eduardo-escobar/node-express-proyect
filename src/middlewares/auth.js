const jwt = require('jsonwebtoken');

const isAuth = (req, resp, netx) => {
  try {
    const { token } = req.headers;
    if (token) {
      const data = jwt.verify(token, process.env.JWT_TOKEN);
      req.sessionData = { userId: data.userId, role: data.role };
      netx();
    } else {
      throw {
        code: 404,
        status: 'ACCESS_DENIED',
        message: 'Missing header token',
      };
    }
  } catch (error) {
    resp
      .status(error.code || 500)
      .send({ status: error.status || 'ERROR', message: error.message });
  }
};

const isValidHostname = (req, resp, netx) => {
  console.log(req.hostname);
  const validHostName = ['dina.ec', 'localhost'];
  if (validHostName.includes(req.hostname)) {
    netx();
  } else {
    resp.status(403).send({ status: 'ACCESS_DENIED' });
  }
};

const isAdmin = (req, resp, netx) => {
  try {
    const { role } = req.sessionData;
    if (role !== 'admin') {
      throw {
        code: 404,
        status: 'ACCESS_DENIED',
        message: 'Invalid role',
      };
    }
    netx();
  } catch (error) {
    resp
      .status(error.code || 500)
      .send({ status: error.status || 'ERROR', message: error.message });
  }
};
module.exports = { isAuth, isValidHostname, isAdmin };
