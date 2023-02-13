import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { validateRequest, BadRequestError } from '@icticketing/common'
import jwt from 'jsonwebtoken';
import User from '../models/user';

const router = express.Router();

// body is the express-validator that act as a middleware to validate email and password
// if error occurs, withMessage to output a string
router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    /*const errors = validationResult(req)
  if ( !errors.isEmpty()) {
    // turn errors object into an array and send back 
    //return res.status(400).send(errors.array())
    //throw new Error('Invalid email or password') // custom errorHandler middleware will pick it up and process
    throw new RequestValidationError(errors.array())
  } */
    const { email, password } = req.body;
    // save the user info into database
    // const newUser = User.create({email, password})
    // res.send({newUser})
    //console.log('Creating a user ...')
    //res.send({})
    //throw new Error('Error connecting to database') // custom errorHandler middleware will pick it up and process
    //throw new DatabaseConnectionError()
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // not null
      //console.log('Email in use')
      throw new BadRequestError('Email in use');
    }
    // hash password
    // create a user and save it to database
    const user = User.build({ email, password });
    await user.save();
    // generate JWT first arg is payload the info about the user and 2nd arg is secret key
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    // store JWT on the object created by cookie-session middleware
    // req.session.jwt = userJwt
    req.session = { jwt: userJwt };
    // send back cookie or jwt as user is logged in
    res.status(201).send(user);
  }
);

//export { router as signupRouter}
export default router;
