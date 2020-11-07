const db = require('../models')
const User = db.user;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.cpf || !req.body.email || !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a User instance
    const user = new User({
        name: req.body.name,
        cpf: req.body.cpf,
        email: req.body.email,
        status: req.body.status,
        type: req.body.type
    });
    user.password = User.generateHash(req.body.password);

    // Save User in the database
    user
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User
        .findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found User with id " + id
                });
            else 
                res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    User
        .find({})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.login = (req, res) => {
    User
        .findOne({ email: req.body.email })
        .then(user => {
            
            if (!user) {
                return res.status(404).send({
                    message: "User not found!"
                });
            }

            if (!user.validatePassword(req.body.password)) {
                res.status(400).send({
                    message: "Invalid password."
                });
            } else {
                res.status(200).send({
                    message: "Authenticated login!"
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while trying authenticate."
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

    // Check and treats if password exists
    if (req.body.password) {
        const password = User.generateHash(req.body.password);
        
        if (!password) {
            return res.status(500).send({
                message: "Invalid password!"
            });
        }
        req.body.password = password;
    }

    const id = req.params.id;
    
    User
        .findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was updated successfully."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating User to user with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User
        .findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};