import { Role } from '../models';

const initDB = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "volunteer"
      }).save(err => {
        if (err) {
          console.log("Error creating role", err);
        }
      });

      new Role({
        name: "organizer"
      }).save(err => {
        if (err) {
          console.log("Error creating role", err);
        }
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("Error creating role", err);
        }
      });
    }
  });
}

const dbConfig = { initDB };
export { dbConfig };