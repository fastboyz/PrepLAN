import { Router } from 'express';
import { User, Profile, Account, EmergencyContact, Role } from '../models';
import bcrypt from 'bcryptjs';
import { authJwt } from '../middlewares'
import { Mongoose } from 'mongoose';

const router = Router();

router.get('/profile/:id', [authJwt.verifyToken], (req, res) => {
    let id = req.params.id
    User.findOne({
        account: id
    }).populate({
        path: 'account',
        model: 'Account',
        populate: {
            path: 'role',
            model: 'Role'
        }
    }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
            }
            let accountBD = user.account;
            const accountPicked = (({ email, username, password }) => ({ email, username, password }))(accountBD);
            accountPicked['id'] = accountBD._id;
            accountPicked['role'] = accountBD.role.name;
            const pickedUser = (({ firstName, lastName, birthday, phoneNumber, discord, pronoun }) => ({ firstName, lastName, birthday, phoneNumber, discord, pronoun }))(user);
            pickedUser['account'] = accountPicked;
            pickedUser['id'] = user._id;
            Profile.findOne({
                user: user.id
            }).populate("emergencyContact", "-__v")
                .exec((err, profile) => {
                    if (err) {
                        res.status(500).send({ message: err });
                    }
                    const picked = (({ tshirtSize, allergy, certification }) => ({ tshirtSize, allergy, certification }))(profile);
                    picked['id'] = profile._id;

                    var eContact = profile.emergencyContact;
                    const eContactPicked = (({ firstName, lastName, phoneNumber, relationship }) => ({ firstName, lastName, phoneNumber, relationship }))(eContact)
                    eContactPicked['id'] = eContact._id;
                    picked['emergencyContact'] = eContactPicked

                    picked['canEdit'] = id === req.accountId;
                    picked['user'] = pickedUser;
                    res.status(200).json(picked);
                })
        });
});

router.put('/account', [authJwt.verifyToken], (req, res) => {
    var account = req.body;
    Account.findById(account.id).exec((err, acc) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        acc.username = account.username;
        acc.password = bcrypt.hashSync(account.password, 8);
        acc.email = account.email;
        Role.findOne({ name: account.role }).exec((err, r) => {
            acc.role = r.id;
        });

        acc.save((err, account) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            res.status(200).json(account);
        });
    });
});

router.put('/profile', [authJwt.verifyToken], (req, res) => {
    var profile = req.body;
    var user = profile.user;
    User.findById(user.id).exec((err, usr) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        usr.firstName = user.firstName;
        usr.lastName = user.lastName;
        usr.pronoun = user.pronoun;
        usr.birthday = user.birthday;
        usr.phoneNumber = user.phoneNumber;
        usr.discord = user.discord;

        usr.save((err, updatedUsr) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            Profile.findById(profile.id).exec((err, prof) => {
                prof.tshirtSize = profile.tshirtSize
                prof.allergy = profile.allergy
                prof.certification = profile.certification
                prof.save((err, updatedProfile) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(200).send();
                })
            })
        })
    })
});

router.put('/contact', [authJwt.verifyToken], (req, res) => {
    let contact = req.body;

    EmergencyContact.findById(contact.id).exec((err, cont) => {
        cont.firstName = contact.firstName;
        cont.lastName = contact.lastName;
        cont.relationship = contact.relationship;
        cont.phoneNumber = contact.phoneNumber;
        cont.save((err, updatedContact) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send();
        })
    });
});
/*
router.put('/profile', (req, res) => {
    var cUser = req.body;

    var account = { 'username': cUser.username, 'password': bcrypt.hashSync(cUser.password, 8), 'email': cUser.email };
    var user = { 'account': cUser.idAccount, 'firstName': cUser.firstName, 'lastName': cUser.lastName, 'pronoun': cUser.pronoun, 'birthday': cUser.birthday, 'phoneNumber': cUser.phoneNumber, 'discord': cUser.discord };
    var profile = { 'tshirtSize': cUser.tshirtSize, 'allergy': cUser.allergy, 'certification': cUser.certification, 'user': cUser.idUser };
    var emergencyContact = { 'firstName': cUser.firstNameEmergency, 'lastName': cUser.lastNameEmergency, 'phoneNumber': cUser.emergencyNumber, 'relationship': cUser.relationshipEmergency };
    Account.findById(cUser.idAccount).exec((err, acc) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        acc.email = account.email;
        acc.username = account.username;
        acc.password = account.password;

        acc.save((err, updateAcc) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            User.findById(cUser.idUser).exec((err, usr) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                usr.firstName = user.firstName;
                usr.lastName = user.lastName;
                usr.pronoun = user.pronoun;
                usr.birthday = user.birthday;
                usr.phoneNumber = user.phoneNumber;
                usr.discord = user.discord;

                usr.save((err, updatedUsr) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    Profile.findById(cUser.idProfile).exec((err, prof) => {
                        prof.tshirtSize = profile.tshirtSize
                        prof.allergy = profile.allergy
                        prof.certification = profile.certification
                        prof.save((err, updatedProfile) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                            EmergencyContact.findById(cUser.idEmergencyContact).exec((err, eContact) => {
                                eContact.firstName = emergencyContact.firstName;
                                eContact.lastName = emergencyContact.lastName;
                                eContact.phoneNumber = emergencyContact.phoneNumber;
                                eContact.relationship = emergencyContact.relationship;

                                eContact.save((err, updatedECon) => {
                                    if (err) {
                                        res.status(500).send({ message: err });
                                        return;
                                    }
                                    res.status(200).send();
                                })
                            })
                        })
                    })
                })
            })
        })
    })
});
*/

const UserController = router;
export { UserController }