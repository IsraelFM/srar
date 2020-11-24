const db = require("../models");
const Vehicle = db.vehicle;

exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.year ||
    !req.body.license_plate ||
    !req.body.renavam ||
    !req.body.brand ||
    !req.body.user_id
  ) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Vehicle instance
  const vehicle = new Vehicle({
    year: req.body.year,
    license_plate: req.body.license_plate,
    renavam: req.body.renavam,
    brand: req.body.brand,
    user_id: req.body.user_id,
  });

  // Save Vehicle in the database
  vehicle
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the vehicle.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Vehicle.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "Not found Vehicle with id " + id,
        });
      else res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: "Error retrieving Vehicle with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  const user_id = req.body.user_id;
  let condition = user_id ? { user_id: user_id } : {};

  Vehicle.find(condition)
    .then((data) => {
      res.status(200).send(
        data.map(({ _id, year, license_plate, renavam, brand, user_id }) => {
          return {
            year,
            id: _id,
            license_plate,
            renavam,
            brand,
            user_id,
          };
        })
      );
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vehicles.",
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

  Vehicle.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Vehicle with id=${id}. Maybe Vehicle was not found!`,
        });
      } else {
        res.send({
          message: "Vehicle was updated successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error updating Vehicle to vehicle with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Vehicle.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Vehicle with id=${id}. Maybe Vehicle was not found!`,
        });
      } else {
        res.send({
          message: "Vehicle was deleted successfully!",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete Vehicle with id=" + id,
      });
    });
};
