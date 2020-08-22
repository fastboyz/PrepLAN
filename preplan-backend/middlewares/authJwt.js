import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { Account, Role } from '../models';

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

const isAdmin = (req, res, next) => {
  Account.findById(req.accountId).exec((err, account) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.findById(account.role).exec((err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (role.name === 'admin') {
        next();
        return;
      }
      res.status(403).send({ message: "Unauthorized" });
      return;
    })
  });
}

const isOrganizer = (req, res, next) => {
  Account.findById(req.accountId).exec((err, account) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.findById(account.role).exec((err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (role.name === 'organizer' || role.name === 'admin') {
        next();
        return;
      }
      res.status(403).send({ message: "Unauthorized" });
      return;
    })
  });
}

const isVolunteer = (req, res, next) => {
  Account.findById(req.accountId).exec((err, account) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.findById(account.role).exec((err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (role.name === 'organizer' || role.name === 'admin' || role.name === 'volunteer') {
        next();
        return;
      }
      res.status(403).send({ message: "Unauthorized" });
      return;
    })
  });
}

const authJwt = { verifyToken, isAdmin, isOrganizer, isVolunteer };

export { authJwt }