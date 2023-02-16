import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import currentUserRouter from './routes/current-user';
import signInRouter from './routes/signin';
import signUpRouter from './routes/signup';
import signOutRouter from './routes/signout';
import { errorHandler, NotFoundError } from '@icticketing/common'

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
// connect all routers to our app
app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
// put it before errorHandler
// express will capture the error and send it off to middleware errorHandler and takes the statusCode and call serializeErrors()
//app.get('*', () => {
// apply to any kind of http method not only GET, so GET, POST, PUT/PATCH, DELETE
//})
// app.all('*', async (req, res, next) => {
//  next(new NotFoundError())
//})

app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
