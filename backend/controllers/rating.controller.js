const db = require("../models");
const Rating = db.rating;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.rate || !req.body.accident_id || !req.body.user_id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a rating instance
  const rating = new Rating({
    rate: req.body.rate,
    accident_id: req.body.accident_id,
    user_id: req.body.user_id,
  });

  // Save rating in the database
  rating
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the reating.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Rating.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "Not found Rating with id " + id,
        });
      else {
        const { _id, rate, accident_id, user_id } = data;
        res.send({ id: _id, rate, accident_id, user_id });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error retrieving Rating with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  const user_id = req.body.user_id;
  let condition = user_id ? { user_id: user_id } : {};

  Rating.find(condition)
    .then((data) => {
      res.status(200).send(
        data.map(({ _id, rate, accident_id, user_id }) => {
          return { id: _id, rate, accident_id, user_id };
        })
      );
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ratings.",
      });
      user_id;
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

  Rating.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Rating with id=${id}. Maybe rating was not found!`,
        });
      } else {
        res.send({
          message: "Rating was updated successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error updating Rating to panic button with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Rating.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Rating with id=${id}. Maybe rating was not found!`,
        });
      } else {
        res.send({
          message: "Rating was deleted successfully!",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete rating with id=" + id,
      });
    });
};
