import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@icticketing/common'
import newOrderRouter from './routes/new';
import showOrderRouter from './routes/show'
import indexOrderRouter from './routes/index'
import deleteOrderRouter from './routes/delete'

const app = express();
// tell Express to trust traffic coming from that proxy
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false, // disable encryption because we use JWT to take care of it
    secure: process.env.NODE_ENV !== 'test', // cookies will only be used if a user visits our app using https connection - add security level
  })
);
app.use(currentUser) // check if user is authenticated after cookie is set
// connect all routers to our app
app.use(newOrderRouter)
app.use(showOrderRouter)
app.use(indexOrderRouter)
app.use(deleteOrderRouter)

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
