import { Router } from 'express';
import { authJwt } from '../middlewares'
import { Event, Edition, Position } from '../models';

const router = Router();

router.post('/create/event', [authJwt.verifyToken/*, authJwt.isOrganizer*/], (req, res) => {
    console.log("Create Event Body: " + req.body.title + ", " +  req.body.description)
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
    Event.find({})
        .populate([{
            path: 'editions',
            populate: {
                path: 'event',
                model: 'Event'
            },
            populate: {
                path: 'event.positions',
                model: 'Position'
            },
        }]).exec((err, evts) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            var events = [];
            evts.forEach((evt) => {
                const event = (({ editions, title, description }) => ({ editions, title, description }))(evt);
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
        evt.editions = event.editions;
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
    Event.findById(id)
    .populate([{
        path: 'editions',
        populate: {
            path: 'event',
            model: 'Event'
        },
        populate: {
            path: 'event.positions',
            model: 'Position'
        },
    }])
    .exec((err, evt) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        evt.title = req.body.title;
    });
})

router.post('/create/edition', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    new Edition({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        name: req.body.name,
        event: req.body.event.id
    }).save((err, edition) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        Event.findById(edition.event).exec((err, evt) => {
            if (err) {
                edition.deleteOne();
                res.status(500).send({ message: err });
                return
            }
            evt.editions.push(edition._id);
            evt.save((err, event) => {
                if (err) {
                    edition.deleteOne();
                    res.status(500).send({ message: err });
                    return
                }
                res.status(200).json(edition);
            });
        });
    })
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
        Edition.findById(pos.edition).exec((err, edition) => {
            if (err) {
                pos.deleteOne();
                res.status(500).send({ message: err });
                return
            }
            edition.positions.push(pos._id);
            edition.save((err, edt) => {
                if (err) {
                    pos.deleteOne();
                    res.status(500).send({ message: err });
                    return
                }
                res.status(200).json(pos);
            })
        });
    });
});

router.post('/create/timeSlot', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {

});

const EventController = router;
export { EventController };