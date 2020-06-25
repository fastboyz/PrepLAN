import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models';

const router = Router();

router.post('/signup', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        username: req.body.username
    }).save((err, result) => {
        if(err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(result);
        }
        
    });
});

const UserController = router;
export {UserController}