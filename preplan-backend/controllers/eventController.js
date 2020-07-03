import { Router } from 'express';
import { authJwt } from '../middlewares'
import { Event, Edition, Position } from '../models';

const router = Router();

router.post('/create/event', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    new Event({
        title: req.body.title,
        description: req.body.description,
    }).save((err, evt) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        const evtPicked = (({ _id, title, description }) => ({ id, title, description }))(evt);
        res.status(200).json(evtPicked);
    });
});

router.post('/create/edition', [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    new Edition({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        name: req.body.name,
        event: req.body.event
    }).save((err, edition) => {
        if(err) {
            res.status(500).send({ message: err });
            return
        }
        Event.findById(edition.event).exec((err, evt) => {
            if(err) {
                edition.deleteOne();
                res.status(500).send({ message: err });
                return
            }
            evt.editions.push(edition._id);
            evt.save((err, event) => {
                if(err){
                    edition.deleteOne();
                    res.status(500).send({ message: err });
                    return
                }
                res.status(200).json(edition);
            });
        });
    })
});

router.post('/create/position',  [authJwt.verifyToken, authJwt.isOrganizer], (req, res) => {
    new Position({
        title: req.body.title,
        description: req.body.description,
        edition: req.body.edition
    }).save((err, pos) => {
        if(err) {
            res.status(500).send({ message: err });
            return
        }
        Edition.findById(pos.edition).exec((err, edition) => {
            if(err) {
                pos.deleteOne();
                res.status(500).send({ message: err });
                return
            }
            edition.positions.push(pos._id);
            edition.save((err, edt) => {
                if(err){
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
    
})

const EventController = router;
export { EventController };