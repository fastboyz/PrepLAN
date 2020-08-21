import { Router } from 'express';
import mongoose from 'mongoose';
import { authJwt } from '../middlewares'
import { Event, Edition, Position, Volunteer, Preference, Availability } from '../models';
import moment from 'moment-timezone';
import axios from 'axios';
import { SCHEDULER } from '../config';

const router = Router();

const inscriptionStatus = {
    PENDING: 'PENDING ',
    CANCELLED: 'CANCELLED',
    APPROVED: 'APPROVED',
    DISAPPROVED: 'DISAPPROVED'
};

router.post('/event', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    new Event({
        title: req.body.title,
        description: req.body.description,
    }).save((err, evt) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        const evtPicked = (({ id, title, description }) => ({ id, title, description }))(evt);
        res.status(200).json(evtPicked);
    });
});

router.get('/events', [authJwt.verifyToken, authJwt.isVolunteer], (req, res) => {
    Event.find({}).exec((err, evts) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        var events = [];
        evts.forEach((evt) => {
            const event = (({ title, description }) => ({ title, description }))(evt);
            event['id'] = evt['_id'];
            events.push(event);
        });
        res.status(200).json(events);
    });
});

router.put('/event/:id', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    const event = req.body;
    Event.findById(event.id).exec((err, evt) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        evt.title = event.title;
        evt.description = event.description;
        evt.save((err, event) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            res.status(200).json(event);
        });
    });
});

router.get('/event/:id', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    var id = req.params.id;
    Event.findById(id).exec((err, evt) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        const event = (({ title, description }) => ({ title, description }))(evt);
        event['id'] = evt['_id'];
        res.status(200).json(event);
    });
});

router.post('/edition', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    var tenant = createTenantInScheduler(req.body);
    if (tenant) {
        new Edition({
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            name: req.body.name,
            isActive: req.body.isActive,
            isRegistering: req.body.isRegistering,
            location: req.body.location,
            event: req.body.event.id,
            tenantId: tenant.id,
        }).save((err, edition) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            const picked = (({ startDate, endDate, name, isRegistering, isActive, location, event, tenantId }) => ({ startDate, endDate, name, isRegistering, isActive, location, event, tenantId }))(edition);
            picked['id'] = edition['_id'];
            res.status(200).json(picked);
        });
    } else {
        res.status(500).send({ message: `Error Creating the Edition ${edition.name} for the event  ${edition.event.title}` });
    }
});

router.get('/editions', [authJwt.verifyToken, authJwt.isVolunteer], (req, res) => {
    Edition.find({})
        .populate('event')
        .exec((err, edts) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            var editions = [];
            edts.forEach((edt) => {
                const picked = (({ startDate, endDate, name, isRegistering, isActive, location, event, tenantId }) => ({ startDate, endDate, name, isRegistering, isActive, location, event, tenantId }))(edt);
                picked['id'] = edt['_id'];

                var evt = picked.event;
                const event = (({ title, description }) => ({ title, description }))(evt);
                event['id'] = evt['_id'];

                picked.event = event;
                editions.push(picked);
            });
            res.status(200).json(editions);
        });
});

router.put('/edition/:id', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    const edition = req.body;
    Edition.findById(edition.id).exec((err, edt) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        edt.startDate = edition.startDate;
        edt.endDate = edition.endDate;
        edt.name = edition.name;
        edt.isActive = edition.isActive;
        edt.isRegistering = edition.isRegistering;
        edt.event = edition.event.id;
        edt.location = edition.location
        edt.save((err, saved) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            const picked = (({ startDate, endDate, name, isRegistering, isActive, location, event, tenantId }) => ({ startDate, endDate, name, isRegistering, isActive, location, event, tenantId }))(saved);
            picked['id'] = edt['_id'];
            Event.findById(saved.event).exec((err, evt) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return
                }
                const event = (({ title, description }) => ({ title, description }))(evt);
                event['id'] = evt['_id'];
                picked.event = event;
                res.status(200).json(picked);
            })

        });
    });
});

router.get('/edition/:id', [authJwt.verifyToken], (req, res) => {
    var id = req.params.id;
    Edition.findById(id)
        .populate('event')
        .exec((err, edt) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            const picked = (({ startDate, endDate, name, isRegistering, isActive, location, event, tenantId }) => ({ startDate, endDate, name, isRegistering, isActive, location, event, tenantId }))(edt);
            picked['id'] = edt['_id'];

            var evt = picked.event;
            const event = (({ title, description }) => ({ title, description }))(evt);
            event['id'] = evt['_id'];

            picked.event = event;
            res.status(200).json(picked);
        });
});

router.post('/position', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    const createdSkillAndSpot = createSkillAndSpot(req.body);
    if (createdSkillAndSpot) {
        new Position({
            title: req.body.title,
            description: req.body.description,
            edition: req.body.edition.id,
            skillId: createdSkillAndSpot.skill.id,
            spotId: createdSkillAndSpot.spot.id,
        }).save((err, pos) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            const picked = (({ title, description, edition, skillId, spotId }) => ({ title, description, edition, skillId, spotId }))(pos);
            picked['id'] = pos['_id'];
            res.status(200).json(picked);
        });
    } else {
        res.status(500).send({ message: `Error Creating position` });
    }
});

router.post('/positions', [authJwt.verifyToken, authJwt.isOrganizer], async (req, res) => {
    var elements = req.body;
    var data = [];
    var BreakException = {};
    try {
        var i;
        for (i = 0; i < elements.length; i++) {
            const createdSkillAndSpot = createSkillAndSpot(elements[i]);
            if (createdSkillAndSpot) {
                await new Position({
                    title: element.title,
                    description: element.description,
                    edition: element.edition.id,
                    skillId: createdSkillAndSpot.skill.id,
                    spotId: createdSkillAndSpot.spot.id,
                }).save((err, pos) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        throw BreakException;
                    }
                    const picked = (({ title, description, edition, skillId, spotId }) => ({ title, description, edition, skillId, spotId }))(pos);
                    picked['id'] = pos['_id'];
                    data.push(picked);
                });
            } else {
                break;
            }
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).send({ message: err });
    }
});

router.put('/positions', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    var elements = req.body;
    var data = [];
    var BreakException = {};
    try {
        elements.forEach(element => {
            Position.findById(element.id).exec((err, pos) => {
                if (err) {
                    res.status(500).send({ message: err });
                    throw BreakException;
                }
                pos.title = element.title;
                pos.description = element.description;
                pos.save((err, saved) => {
                    if (err) {
                        res.status(500).send({ message: err });
                    }
                    const picked = (({ title, description, edition, skillId, spotId }) => ({ title, description, edition, skillId, spotId }))(saved);
                    picked['id'] = pos['_id'];
                    Edition.findById(saved.edition).exec((err, edt) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            throw BreakException;
                        }
                        const pickedEdt = (({ startDate, endDate, name, isRegistering, isActive, event }) => ({ startDate, endDate, name, isRegistering, isActive, event }))(edt);
                        pickedEdt['id'] = edt['_id'];

                        var evt = pickedEdt.event;
                        const event = (({ title, description }) => ({ title, description }))(evt);
                        event['id'] = evt['_id'];

                        pickedEdt.event = event;
                        picked.edition = pickedEdt;
                        data.push(picked);
                    });
                });
            });
        });
    } catch (e) { }
});

router.delete('/positions', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    var elements = req.body;
    var BreakException = {};
    try {
        elements.forEach(element => {
            Position.findById(element.id).exec((err, pos) => {
                if (err) {
                    res.status(500).send({ message: err });
                    throw BreakException;
                }
                pos.deleteOne();

            })
        });
    } catch (error) { }

});

router.get('/positions', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    Position.find({})
        .populate('edition')
        .exec((err, positions) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            var poses = [];
            positions.forEach((pos) => {
                const picked = (({ title, description, edition }) => ({ title, description, edition }))(pos);
                picked['id'] = pos['_id'];

                var edt = picked.edition;
                const edition = (({ startDate, endDate, name, isRegistering, isActive, location, event }) => ({ startDate, endDate, name, isRegistering, isActive, location, event }))(edt);
                edition['id'] = edt['_id'];

                picked.edition = edition;
                poses.push(picked);
            });
            res.status(200).json(poses);
        });
});

router.get('/:editionId/positions', [authJwt.verifyToken, authJwt.isVolunteer], (req, res) => {
    var editionId = req.params.editionId;
    Position.find({ edition: editionId })
        .populate('edition')
        .exec((err, positions) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            var poses = [];
            positions.forEach((pos) => {
                const picked = (({ title, description, edition }) => ({ title, description, edition }))(pos);
                picked['id'] = pos['_id'];

                var edt = picked.edition;
                const edition = (({ startDate, endDate, name, isRegistering, isActive, location, event }) => ({ startDate, endDate, name, isRegistering, isActive, location, event }))(edt);
                edition['id'] = edt['_id'];

                picked.edition = edition;
                poses.push(picked);
            });
            res.status(200).json(poses);
        });
});

router.put('/position/:id', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    const position = req.body;
    Position.findById(position.id).exec((err, pos) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        pos.title = req.body.title;
        pos.description = req.body.description;
        pos.edition = req.body.edition;
        pos.save((err, saved) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            const picked = (({ title, description, edition }) => ({ title, description, edition }))(saved);
            picked['id'] = pos['_id'];
            Edition.findById(saved.edition).exec((err, edt) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return
                }
                const pickedEdt = (({ startDate, endDate, name, isRegistering, isActive, event }) => ({ startDate, endDate, name, isRegistering, isActive, event }))(edt);
                pickedEdt['id'] = edt['_id'];

                var evt = pickedEdt.event;
                const event = (({ title, description }) => ({ title, description }))(evt);
                event['id'] = evt['_id'];

                pickedEdt.event = event;
                picked.edition = pickedEdt;
                res.status(200).json(picked);
            });
        });
    });
});

router.get('/position/:id', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    var id = req.params.id;
    Position.findById(id)
        .populate('edition')
        .exec((err, pos) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            const picked = (({ title, description, edition }) => ({ title, description, edition }))(pos);
            picked['id'] = pos['_id'];

            var edt = picked.edition;
            const edition = (({ startDate, endDate, name, isRegistering, isActive, location, event }) => ({ startDate, endDate, name, isRegistering, isActive, location, event }))(edt);
            edition['id'] = edt['_id'];
            picked.edition = edition;
            res.status(200).json(picked);
        });
})

router.get('/edition/:id/registered', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    const editionId = req.params.id;
    Volunteer.findOne({ edition: editionId })
        .populate([
            {
                path: 'profile',
                model: 'Profile',
                populate: [
                    {
                        path: 'user',
                        model: 'User'
                    },
                    {
                        path: 'emergencyContact',
                        model: 'EmergencyContact'
                    }
                ]
            },
            {
                path: 'edition',
                model: 'Edition',
                populate: {
                    path: 'event',
                    model: 'Event'
                }
            },
            {
                path: 'availabilities',
                model: 'Availability'
            },
        ])
        .exec((err, vol) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            const picked = (({ inscriptionDate, status, plannerId }) => ({ inscriptionDate, status, plannerId }))(vol);
            picked['profile'] = sanitizeProfile(vol.profile);
            picked['edition'] = sanitizeEdition(vol.edition);
            picked['availabilities']
            picked['id'] = vol['_id'];
            res.status(200).json(picked);
        })
});

router.post('/event/inscription', [authJwt.verifyToken], async (req, res) => {
    var vol = req.body;
    var { edition, profile, availabilities, preference } = vol;
    delete vol.edition;
    delete vol.profile;
    delete vol.availabilities;
    delete vol.preference;

    vol['edition'] = edition.id;
    vol['profile'] = profile.id;

    const session = await mongoose.startSession();

    session.startTransaction();
    try {
        var createdAvs = [];
        var i;
        for (i = 0; i < availabilities.length; i++) {
            var element = availabilities[i];
            console.log(element);
            await Availability.create([element], { session: session });
            const created = await Availability.findOne(element).session(session);
            createdAvs.push(created._id);
        }

        await Preference.create([preference], { session: session });
        const createdPref = await Preference.findOne({ Preference }).session(session);

        vol['availabilities'] = createdAvs;
        vol['preference'] = createdPref._id;
        console.log(createdAvs);
        await Volunteer.create([vol], { session: session });

        await session.commitTransaction();
        session.endSession();
        res.status(200).send({ message: "Registration sucessful" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).send({ message: error });
    }

    // session.endSession();
});


router.post('/event/updateStatus', [authJwt.verifyToken, authJwt.isOrganizer], async (req, res) => {
    var vol = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        var found = await Volunteer.findById(vol.id);
        if (vol.status === inscriptionStatus.APPROVED) {
            // sent requuest toopta planer to create
        }

        if (found.status === inscriptionStatus.APPROVED) {
            // send reques to optaplaner to delete
        }
        found.status = vol.status;
        found.save();
        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).send({ message: error });
    }
});

const sanitizeProfile = (profile) => {

    const picked = (({ tshirtSize, allergy, certification }) => ({ tshirtSize, allergy, certification }))(profile);
    picked['id'] = profile._id;

    const pickedUser = (({ firstName, lastName, birthday, phoneNumber, discord, pronoun }) => ({ firstName, lastName, birthday, phoneNumber, discord, pronoun }))(profile.user);
    pickedUser['id'] = profile.user;
    picked['user'] = pickedUser;

    const eContactPicked = (({ firstName, lastName, phoneNumber, relationship }) => ({ firstName, lastName, phoneNumber, relationship }))(profile.emergencyContact)
    eContactPicked['id'] = profile.emergencyContact._id;
    picked['emergencyContact'] = eContactPicked;

    return picked;
}

const sanitizeEdition = (edition) => {
    const picked = (({ startDate, endDate, name, isRegistering, isActive, location, event }) => ({ startDate, endDate, name, isRegistering, isActive, location, event }))(edition);
    picked['id'] = edition['_id'];
}

const createTenantInScheduler = async (edition) => {
    var tenant = {};
    tenant['publishLength'] = 7;
    tenant['unplannedRotationOffset'] = 0;
    tenant['tenant'] = { name: `${edition.event.title}_${edition.name}` };
    tenant['publishNotice'] = 1;

    var startDate = moment(edition.startDate);
    var endDate = moment(edition.endDate);
    startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    endDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    tenant['draftLength'] = endDate.diff(startDate, 'days') + 1;
    tenant['rotationLength'] = endDate.diff(startDate, 'days') + 1;

    var offset = startDate.utcOffset();
    moment.tz.names().forEach(element => {
        if (moment.tz(element).utcOffset() === offset && element.startsWith('Etc')) {
            tenant['timeZone'] = element;
        }
    });

    tenant['firstDraftDate'] = startDate.toISOString();
    var lastHistoricDate = startDate.subtract(1, "days");
    tenant['lastHistoricDate'] = lastHistoricDate.toISOString();
    console.log(JSON.stringify(tenant));

    try {
        const response = await axios.post(`${SCHEDULER}/tenant/add`, tenant);
        return response.data;
    }
    catch (error) {
        return false;
    }
}

const createSkillAndSpot = (position) => {
    var skill = {};
    var spot = {};
    var tenantId = position.edition.tenantId;

    skill['name'] = position.title;
    skill['tenantId'] = tenantId;
    const createdSKill = axios.post(`${SCHEDULER}/tenant/${tenantId}/skill/add`, skill).then((res) => {
        return res;
    }).catch((error) => {
        return false;
    });

    spot['name'] = position.title;
    spot['tenantId'] = tenantId;
    spot['requiredSkillSet'] = [createdSKill];
    const createdSpot = axios.post(`${SCHEDULER}/tenant/${tenantId}/spot/add`, spot).then((res) => {
        return res;
    }).catch((error) => {
        return false;
    });

    return { skill: createdSKill, spot: createdSpot };
}

const EventController = router;
export { EventController };