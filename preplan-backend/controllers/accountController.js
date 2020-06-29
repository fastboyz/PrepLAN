import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Account, User, EmergencyContact, Profile } from '../models';

const router = Router();

router.post('/signup', (req, res) => {
    const account = new Account({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        username: req.body.username
    }).save((err, acc) => {
        if (err) {
            res.status(400).send(err);
        } else {
            const user = new User({
                account: acc._id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthday: req.body.birthday,
                phoneNumber: req.body.phoneNumber,
                discord: req.body.discord,
                pronoun: req.body.pronoun
            }).save((err, usr) => {
                if (err) {
                    acc.deleteOne();
                    res.status(400).send(err);
                } else {
                    const emergencyContact = new EmergencyContact({
                        firstName: req.body.firstNameEmergency,
                        lastName: req.body.lastNameEmergency,
                        phoneNumber: req.body.emergencyNumber,
                        relationship: req.body.relationshipEmergency,
                    }).save((err, contact) => {
                        if (err) {
                            acc.deleteOne();
                            usr.deleteOne()
                            res.status(400).send(err);
                        } else {
                            const profile = new Profile({
                                user: usr._id,
                                tshirtSize: req.body.tshirtSize,
                                allergy: req.body.allergy,
                                certification: req.body.certification,
                                emergencyContact: contact._id
                            }).save((err, prof) => {
                                if (err) {
                                    acc.deleteOne();
                                    usr.deleteOne()
                                    contact.deleteOne();
                                    res.status(400).send(err);
                                } else {
                                    res.send({ message: "User was registered successfully!" });
                                }
                            });
                        }
                    });
                }
            });
        }

    });
});

router.post('/signin')

const AccountController = router;
export { AccountController }