const db = require('../models')
var { DateTime } = require('luxon');
const Accident = db.accident;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.date_hour || !req.body.coordinates || !req.body.region || !req.body.type || !req.body.shift) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Accident instance
    const accident = new Accident({
        date_hour: DateTime.fromFormat(req.body.date_hour, 'dd/MM/yyyy HH:mm').setZone('America/Sao_Paulo'),
        involved_number: req.body.involved_number,
        location: {
            type: 'Point',
            coordinates: req.body.coordinates
        },
        region: req.body.region,
        type: req.body.type,
        shift: req.body.shift,
        event_id: req.body.event_id,
        user_id: req.body.user_id
    });

    // Save Accident in the database
    accident
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the accident."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Accident
        .findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found Accident with id " + id
                });
            else 
                res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving Accident with id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const limit = req.query && (req.query.limit) > 0 ? req.query.limit : 6
    const offset = req.query && (req.query.offset) > 0 ? req.query.offset : 1

    Accident
        .find({})
        .then(data => {
            res.status(200).send(data.slice(offset - 1,limit*offset));
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving accidents."
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
    
    Accident
        .findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Accident with id=${id}. Maybe Accident was not found!`
                });
            } else {
                res.send({
                    message: "Accident was updated successfully."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Accident to accident with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Accident
        .findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Accident with id=${id}. Maybe Accident was not found!`
                });
            } else {
                res.send({
                    message: "Accident was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Accident with id=" + id
            });
        });
};