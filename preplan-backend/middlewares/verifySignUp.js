import { Account } from '../models';

const checkUserNameOrEmailDuplicate = (req, res, next) => {
    // Username
    Account.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }

        // Email
        Account.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }

            next();
        });
    });
};

const verifySignUp = { checkUserNameOrEmailDuplicate }

export { verifySignUp };