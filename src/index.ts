import express, { Application } from 'express';
import moongose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// eslint-disable-next-line import/extensions
import routesV1 from './routes/v1';

dotenv.config();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sessionData: any;
    }
  }
}

const app: Application = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

routesV1(app);
const PORT: number | string = process.env.PORT || 3000;

moongose
  .connect(process.env.MONGO!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to mongoDB');
    app.listen(PORT, () => {
      console.log('runing on 3000');
    });
  })
  .catch((error) => {
    console.log(error);
  });
