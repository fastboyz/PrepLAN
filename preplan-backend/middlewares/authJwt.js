import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { Account } from '../models';

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No Token provided!" });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.accountId = decoded.id;
        next();
    });
};

const authJwt = { verifyToken };

export { authJwt }