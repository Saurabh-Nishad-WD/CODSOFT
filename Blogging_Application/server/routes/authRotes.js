import express from 'express';
import { signin, signup } from '../controllers/authControllers.js';
const route = express.Router();


route.post('/signup',signup);
route.post('/signin',signin);

export default route;