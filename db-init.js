db.createUser({
    user: "preplan",
    pwd: "secretPassword",
    roles: [ { role: "dbOwner", db: "preplan" } ]
  })
  
  db.users.insert({
    name: "user"
  })