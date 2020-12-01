const db = require("../models");
const Notification = db.notification;

exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.name ||
    !req.body.resource ||
    !req.body.resource_specification ||
    !req.body.user_id
  ) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a notification instance
  const notification = new Notification({
    name: req.body.name,
    description: req.body.description,
    resource: req.body.resource,
    resource_specification: req.body.resource_specification,
    status: req.body.status,
    user_id: req.body.user_id,
  });

  // Save notification in the database
  notification
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the notification.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Notification.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "Not found Notification with id " + id,
        });
      else {
        const {
          _id,
          name,
          description,
          resource,
          resource_specification,
          status,
          user_id,
        } = data;
        res.send({
          id: _id,
          name,
          description,
          resource,
          resource_specification,
          status,
          user_id,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error retrieving Notification with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  const user_id = req.body.user_id;
  let condition = user_id ? { user_id: user_id } : {};

  Notification.find(condition)
    .then((data) => {
      res.status(200).send(
        data.map(
          ({
            _id,
            name,
            description,
            resource,
            resource_specification,
            status,
            user_id,
          }) => {
            return {
              id: _id,
              name,
              description,
              resource,
              resource_specification,
              status,
              user_id,
            };
          }
        )
      );
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notifications.",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
    return;
  }

  const id = req.params.id;

  Notification.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Notification with id=${id}. Maybe notification was not found!`,
        });
      } else {
        res.send({
          message: "Notification was updated successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Notification with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Notification.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Notification with id=${id}. Maybe notification was not found!`,
        });
      } else {
        res.send({
          message: "Notification was deleted successfully!",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete notification with id=" + id,
      });
    });
};
