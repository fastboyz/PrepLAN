import { Role, Skill } from '../models';

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

    Skill.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {

            new Skill({
                name: "Cashier",
                value: 1
            }).save(err => {
                if (err) {
                    console.log("Error creating skill", err);
                }
            });

            new Skill({
                name: "Patrol",
                value: 2
            }).save(err => {
                if (err) {
                    console.log("Error creating skill", err);
                }
            });

            new Skill({
                name: "Logistic",
                value: 3
            }).save(err => {
                if (err) {
                    console.log("Error creating skill", err);
                }
            });

            new Skill({
                name: "Construction",
                value: 4
            }).save(err => {
                if (err) {
                    console.log("Error creating skill", err);
                }
            });

            new Skill({
                name: "Tech Support",
                value: 5
            }).save(err => {
                if (err) {
                    console.log("Error creating skill", err);
                }
            });

            new Skill({
                name: "Vendor",
                value: 6
            }).save(err => {
                if (err) {
                    console.log("Error creating skill", err);
                }
            });
        }
    })
}

const dbConfig = { initDB };
export { dbConfig };