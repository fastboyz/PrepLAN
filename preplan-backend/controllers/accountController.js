import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { Account, User, EmergencyContact, Profile, Role } from '../models';
import { SECRET } from '../config'

const router = Router();

router.post('/signup', async (req, res) => {
    var profile = req.body;
    var { emergencyContact, user } = profile;
    var { account } = user;

    delete profile.emergencyContact;
    delete profile.user;
    delete user.account;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (account.role) {
            var role = await Role.findOne({ name: account.role });
        }
        account.role = role._id;
        account.password = bcrypt.hashSync(account.password, 8);

        await Account.create([account], { session: session });
        const createdAccount = await Account.findOne(account).session(session);

        await EmergencyContact.create([emergencyContact], { session: session });
        const createdEmergencyContact =  await EmergencyContact.findOne(emergencyContact).session(session);

        user['account'] = createdAccount._id;
        await User.create([user], { session: session });
        const createdUser = await User.findOne(user).session(session);

        profile['emergencyContact'] = createdEmergencyContact._id;
        profile['user'] = createdUser._id;
        await Profile.create([profile], { session: session });
        
        await session.commitTransaction();
        session.endSession();
        res.status(200).send({ message: "User was registered successfully!" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).send({ message: error });
    }
});

router.post('/signin', (req, res) => {
    Account.findOne({
        username: req.body.username
    }).exec((err, account) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!account) {
            res.status(401).send({ message: "Unauthorized!" });
            return;
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            account.password
        );

        if (!account && !passwordIsValid) {
            return res.status(401).send({
                token: null,
                message: "Invalid Credentials"
            });
        }

        var token = jwt.sign({ id: account.id }, SECRET, {
            expiresIn: 28800
        });

        res.status(200).send({
            id: account.id,
            username: account.username,
            email: account.email,
            role: account.role,
            token: token
        });
    });
});

router.get('/role/:id', (req, res) => {
    var accountId = req.params.id;
    Account.findById(accountId)
        .populate('role')
        .exec((err, acc) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.status(200).send({ name: acc.role.name });
        })
})

const AccountController = router;
export { AccountController }