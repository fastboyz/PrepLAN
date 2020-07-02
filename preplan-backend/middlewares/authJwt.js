import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { Account } from '../models';

const verifyToken = (req, res, next) => {
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

const getId = (req) => {
    let token = req.headers["x-access-token"];
    return jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
       return decoded.id;
    });
}

const authJwt = { verifyToken, getId };

export { authJwt }