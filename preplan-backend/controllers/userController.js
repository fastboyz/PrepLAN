import { Router } from 'express';
import { User, Profile, Account } from '../models';
import { authJwt } from '../middlewares'

const router = Router();

router.get('/profile/:id', [authJwt.verifyToken], (req, res) => {
    let id = req.params.id
    User.findOne({
        account: id
    }).populate("account", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
            }
            let accountBD = user.account;
            const accountPicked = (({ _id, email, username, password }) => ({ id, email, username, password }))(accountBD);
            const pickedUser = (({ _id, firstName, lastName, birthday, phoneNumber, discord, pronoun }) => ({ id, firstName, lastName, birthday, phoneNumber, discord, pronoun }))(user);
            pickedUser['account'] = accountPicked;
            Profile.findOne({
                user: user.id
            }).populate("emergencyContact", "-__v")
                .exec((err, profile) => {
                    if (err) {
                        res.status(500).send({ message: err });
                    }
                    const picked = (({ _id, tshirtSize, allergy, certification, emergencyContact }) => ({ id, tshirtSize, allergy, certification, emergencyContact }))(profile);
                    picked['canEdit'] = id ===  req.accountId;
                    picked['user'] = pickedUser;
                    res.status(200).json(picked);
                })
        });
});

router.put('/profile/:id', (req, res) => {
     let userId = req.params.id
    User.findById(userId)

    
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

const UserController = router;
export { UserController }