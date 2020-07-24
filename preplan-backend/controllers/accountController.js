import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Account, User, EmergencyContact, Profile, Role } from '../models';
import { SECRET } from '../config'

const router = Router();

router.post('/signup', (req, res) => {
    const account = new Account({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        username: req.body.username
    }).save((err, acc) => {
        if (err) {
            res.status(500).send({message: err});
            return;
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
                    res.status(500).send(err);
                    return;
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
                            res.status(500).send({message: err});
                            return;
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
                                    res.status(500).send({message: err});
                                    return;
                                } else {
                                    if (req.body.role) {
                                        Role.findOne({
                                            name: req.body.role
                                        }).exec((err, role) => {
                                            if (err) {
                                                acc.deleteOne();
                                                usr.deleteOne()
                                                contact.deleteOne();
                                                prof.deleteOne();
                                                res.status(500).send({message: err});
                                                return;
                                            } else {
                                                acc.role = role._id;
                                                acc.save(err => {
                                                    if (err) {
                                                        acc.deleteOne();
                                                        usr.deleteOne()
                                                        contact.deleteOne();
                                                        prof.deleteOne();
                                                        res.status(500).send({message: err});
                                                        return;
                                                    }
                                                    res.send({ message: "User was registered successfully!" });
                                                });
                                            }
                                        });
                                    }

                                }
                            });
                        }
                    });
                }
            });
        }

    });
});

router.post('/signin', (req, res) => {
    Account.findOne({
        username: req.body.username
    }).exec((err, account) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if(!account) {
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

        res.status(200).send({name: acc.role.name});
    })
})

const AccountController = router;
export { AccountController }