const db = require('../models')
const Route = db.route;
let { DateTime } = require('luxon');

exports.create = (req, res) => {
    // Validate request
    if (!req.body.date_hour_start || !req.body.to_address || !req.body.from_address || !req.body.user_id) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a route instance
    const route = new Route({
        date_hour_start: DateTime.fromFormat(req.body.date_hour_start, 'dd/MM/yyyy HH:mm').setZone('America/Sao_Paulo'),
        to_address: req.body.to_address,
        from_address: req.body.from_address,
        user_id: req.body.user_id
    });

    // Save route in the database
    route
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the route."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Route
        .findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found Route with id " + id
                });
            else 
                res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving Route with id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const user_id = req.body.user_id;
    let condition = user_id ? { user_id: user_id } : {};

    Route
        .find(condition)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving routes."
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
    
    Route
        .findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Route with id=${id}. Maybe route was not found!`
                });
            } else {
                res.send({
                    message: "Route was updated successfully."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Route with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Route
        .findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Route with id=${id}. Maybe route was not found!`
                });
            } else {
                res.send({
                    message: "Route was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete route with id=" + id
            });
        });
};