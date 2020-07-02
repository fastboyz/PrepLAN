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
                    picked['canEdit'] = id === authJwt.getId(req);
                    picked['user'] = pickedUser;
                    console.log();
                    res.status(200).json(picked);
                })
        });
});

const UserController = router;
export { UserController }