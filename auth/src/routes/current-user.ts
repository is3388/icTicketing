import express from 'express';
//import jwt from 'jsonwebtoken';
import { currentUser } from '@icticketing/common'
//import { requireAuth } from '../../../common/src/middlewares/require-auth';

const router = express.Router();

//router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
router.get('/api/users/currentuser', currentUser, (req, res) => {
  // req.session.jwt is an object that jwt is arleady set to cookie
  // if (!req.session || req.session.jwt) {
  /*if (!req.session?.jwt) {
    return res.send({currentUser: null}) 
  }
  // check if JWT is valid. If yes, send back payload from JWT
  try{
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)
    res.send({currentUser: payload})
  }
  catch(err) {
    res.send({currentUser: null}) code move to middleware current-user to handle
  } */
  res.send({ currentUser: req.currentUser || null });
});

//export { router as currentuserRouter}
export default router;
