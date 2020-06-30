import { Router } from 'express';
import { User, Profile, Account } from '../models';
import { authJwt } from '../middlewares'



const router = Router();

router.get('/profile', [authJwt.verifyToken], (req, res) => {
    User.findOne({
        account: req.body.id
    }).populate("account", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
            }
            let accountBD = user.account;
            const accountPicked = (({ _id, email, username }) => ({ _id, email, username }))(accountBD);
            const pickedUser = (({ _id, firstName, lastName, birthday, phoneNumber, discord, pronoun }) => ({ _id, firstName, lastName, birthday, phoneNumber, discord, pronoun }))(user);
            pickedUser['account'] = accountPicked;
            Profile.findOne({
                user: user.id
            }).populate("emergencyContact", "-__v")
                .exec((err, profile) => {
                    if (err) {
                        res.status(500).send({ message: err });
                    }
                    const picked = (({ _id, tshirtSize, allergy, certification, emergencyContact }) => ({ _id, tshirtSize, allergy, certification, emergencyContact }))(profile);
                    picked['canEdit'] = true;
                    picked['user'] = pickedUser;
                    console.log();
                    res.status(200).json(picked);
                })
        });
});

const UserController = router;
export { UserController }