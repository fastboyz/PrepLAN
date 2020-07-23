import e, { Router } from 'express';
import { authJwt } from '../middlewares'
import { Event, Edition, Position } from '../models';

const router = Router();

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

router.get('/events', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
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
    new Edition({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        name: req.body.name,
        isActive: req.body.isActive,
        isRegistering: req.body.isRegistering,
        location: req.body.location,
        event: req.body.event.id
    }).save((err, edition) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        const picked = (({ startDate, endDate, name, isRegistering, isActive, location, event }) => ({ startDate, endDate, name, isRegistering, isActive, location, event }))(edition);
        picked['id'] = edition['_id'];
        res.status(200).json(picked);
    })
});

router.get('/editions', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    Edition.find({})
        .populate('event')
        .exec((err, edts) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            var editions = [];
            edts.forEach((edt) => {
                const picked = (({ startDate, endDate, name, isRegistering, isActive, location, event }) => ({ startDate, endDate, name, isRegistering, isActive, location, event }))(edt);
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
            const picked = (({ startDate, endDate, name, isRegistering, isActive, location, event }) => ({ startDate, endDate, name, isRegistering, isActive, location, event }))(saved);
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

router.get('/edition/:id', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    var id = req.params.id;
    Edition.findById(id)
        .populate('event')
        .exec((err, edt) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            const picked = (({ startDate, endDate, name, isRegistering, isActive, location, event }) => ({ startDate, endDate, name, isRegistering, isActive, location, event }))(edt);
            picked['id'] = edt['_id'];

            var evt = picked.event;
            const event = (({ title, description }) => ({ title, description }))(evt);
            event['id'] = evt['_id'];

            picked.event = event;
            res.status(200).json(picked);
        });
});

router.post('/position', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    new Position({
        title: req.body.title,
        description: req.body.description,
        edition: req.body.edition.id
    }).save((err, pos) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        const picked = (({ title, description, edition }) => ({ title, description, edition }))(pos);
        picked['id'] = pos['_id'];
        res.status(200).json(picked);
    });
});

router.post('/positions', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    var elements = req.body;
    var data = [];
    elements.forEach(element => {
        new Position({
            title: element.title,
            description: element.description,
            edition: element.edition.id
        }).save((err, pos) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            const picked = (({ title, description, edition }) => ({ title, description, edition }))(pos);
            picked['id'] = pos['_id'];
            data.push(picked);
        });
    });
});

router.put('/positions', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    var elements = req.body;
    var data = [];
    console.log(elements);
    elements.forEach(element => {
        Position.findById(element.id).exec((err, pos) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            pos.title = element.title;
            pos.description = element.description;
            pos.edition = element.edition;
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
                    data.push(picked);

                });
            });
        });
    });
    res.status(200).json(data);
});


router.delete('/positions', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    var elements = req.body;
    elements.forEach(element => {
        Position.findById(element.id).exec((err, pos) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            pos.deleteOne();
            res.status(200).send();
        })
    });
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


router.get('/:editionId/positions', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
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

router.post('/create/timeSlot', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {

});

const EventController = router;
export { EventController };