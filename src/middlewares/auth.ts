/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const isAuth = (req: Request, resp: Response, netx: NextFunction): void => {
  try {
    const { token } = req.headers;
    if (token) {
      const data: any = jwt.verify(token as string, process.env.JWT_TOKEN!);
      req.sessionData = { userId: data.userId, role: data.role };
      netx();
    } else {
      // eslint-disable-next-line no-throw-literal
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

const isValidHostname = (req: Request, resp: Response, netx: NextFunction): void => {
  console.log(req.hostname);
  const validHostName = ['dina.ec', 'localhost'];
  if (validHostName.includes(req.hostname)) {
    netx();
  } else {
    resp.status(403).send({ status: 'ACCESS_DENIED' });
  }
};

const isAdmin = (req: Request, resp: Response, netx: NextFunction): void => {
  try {
    const { role } = req.sessionData;
    if (role !== 'admin') {
      // eslint-disable-next-line no-throw-literal
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
export { isAuth, isValidHostname, isAdmin };
