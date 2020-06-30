const { use } = require("./preplan-backend/routes");

db = db.getSiblingDB('preplan');
db.createUser({
    user: "preplan",
    pwd: "preplan",
    roles: [ { role: "dbOwner", db: "preplan" } ]
  });