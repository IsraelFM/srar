const db = require('../models')
const Event = db.event;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.track_situation || !req.body.track_type) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Event instance
    const event = new Event({
        track_situation: req.body.track_situation,
        track_type: req.body.track_type,
        measures_taken: req.body.measures_taken,
    });

    // Save Event in the database
    event
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the event."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Event
        .findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found Event with id " + id
                });
            else 
                res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving Event with id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    Event
        .find({})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving events."
            });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
        return;
    }

    const id = req.params.id;
    
    Event
        .findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Event with id=${id}. Maybe Event was not found!`
                });
            } else {
                res.send({
                    message: "Event was updated successfully."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Event to event with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Event
        .findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
                });
            } else {
                res.send({
                    message: "Event was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Event with id=" + id
            });
        });
};