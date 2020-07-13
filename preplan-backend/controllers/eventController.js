import { Router } from 'express';
import { authJwt } from '../middlewares'
import { Event, Edition, Position } from '../models';

const router = Router();

router.post('/create/event', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    console.log("Create Event Body: " + req.body.title + ", " + req.body.description)
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

router.post('/create/edition', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    new Edition({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        name: req.body.name,
        isActive: req.body.isActive,
        isRegistering: req.body.isRegistering,
        event: req.body.event.id
    }).save((err, edition) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        const picked = (({ startDate, endDate, name, isRegistering, isActive, event }) => ({ startDate, endDate, name, isRegistering, isActive, event }))(edition);
        picked['id'] = edition['_id'];
        res.status(200).json(picked);
    })
});

router.get('/editions', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    Edition.find({}).exec((err, edts) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        var editions = [];
        edts.forEach((edt) => {
            const picked = (({ startDate, endDate, name, isRegistering, isActive, event }) => ({ startDate, endDate, name, isRegistering, isActive, event }))(edt);
            picked['id'] = edt['_id'];
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
        edt.startDate = req.body.startDate;
        edt.endDate = req.body.endDate;
        edt.name = req.body.name;
        edt.isActive = req.body.isActive;
        edt.isRegistering = req.body.isRegistering;
        edt.event = req.body.event.id;
        edt.save((err, saved) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            const picked = (({ startDate, endDate, name, isRegistering, isActive, event }) => ({ startDate, endDate, name, isRegistering, isActive, event }))(saved);
            picked['id'] = edt['_id'];
            res.status(200).json(picked);
        });
    });
});

router.get('/edition/:id', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    var id = req.params.id;
    Edition.findById(id).exec((err, edt) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        const picked = (({ startDate, endDate, name, isRegistering, isActive, event }) => ({ startDate, endDate, name, isRegistering, isActive, event }))(edt);
        picked['id'] = edt['_id'];
        res.status(200).json(picked);
    });
});

router.post('/create/position', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    new Position({
        title: req.body.title,
        description: req.body.description,
        edition: req.body.edition
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

router.post('/create/timeSlot', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {

});

const EventController = router;
export { EventController };