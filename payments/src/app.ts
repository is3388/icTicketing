import express, { Request, Response} from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@icticketing/common'
import createChargeRouter from './routes/new'

const app = express();
// tell Express to trust traffic coming from that proxy
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false, // disable encryption because we use JWT to take care of it
    secure: process.env.NODE_ENV !== 'test', // cookies will only be used if a user visits our app using https connection - add security level
  // sercure: false - change for deployment to PROD cluster
  })
);
app.use(currentUser) // check if user is authenticated after cookie is set
// connect all routers to our app
app.use(createChargeRouter)

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
