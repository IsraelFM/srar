const db = require("../models");
const PannicButton = db.panicButton;
let { DateTime } = require("luxon");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.date_hour || !req.body.coordinates || !req.body.user_id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  let coordinates = req.body.coordinates;
  if (typeof req.body.coordinates === "string") {
    coordinates = JSON.parse(req.body.coordinates);
  }
  // Create a pannic button instance
  const panicButton = new PannicButton({
    date_hour: DateTime.fromFormat(
      req.body.date_hour,
      "dd/MM/yyyy HH:mm"
    ).setZone("America/Sao_Paulo"),
    location: {
      type: "Point",
      coordinates: coordinates,
    },
    status: req.body.status,
    user_id: req.body.user_id,
  });

  // Save pannic button in the database
  panicButton
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the panic button.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  PannicButton.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "Not found PannicButton with id " + id,
        });
      else {
        const { _id, date_hour, location, status, user_id } = data;
        res.send({ id: _id, date_hour, location, status, user_id });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error retrieving PannicButton with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  const user_id = req.body.user_id;
  let condition = user_id ? { user_id: user_id } : {};

  PannicButton.find(condition)
    .then((data) => {
      res.status(200).send(
        data.map(({ _id, date_hour, location, status, user_id }) => {
          return {
            id: _id,
            date_hour,
            location: JSON.stringify(location.coordinates),
            status,
            user_id,
          };
        })
      );
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving pannic button cases.",
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

  PannicButton.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update PannicButton with id=${id}. Maybe pannic button was not found!`,
        });
      } else {
        res.send({
          message: "PannicButton was updated successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error updating PannicButton to panic button with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  PannicButton.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete PannicButton with id=${id}. Maybe pannic button was not found!`,
        });
      } else {
        res.send({
          message: "PannicButton was deleted successfully!",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete pannic button with id=" + id,
      });
    });
};
