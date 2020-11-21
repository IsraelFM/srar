const db = require("../models");
var { DateTime } = require("luxon");
const Accident = db.accident;

exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.date_hour ||
    !req.body.coordinates ||
    !req.body.region ||
    !req.body.type ||
    !req.body.shift
  ) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  let coordinates = req.body.coordinates;
  if (typeof req.body.coordinates === "string") {
    coordinates = JSON.parse(req.body.coordinates);
  }
  // Create a Accident instance
  const accident = new Accident({
    date_hour: DateTime.fromFormat(
      req.body.date_hour,
      "dd/MM/yyyy HH:mm"
    ).setZone("America/Sao_Paulo"),
    involved_number: req.body.involved_number,
    location: {
      type: "Point",
      coordinates: coordinates,
    },
    region: req.body.region,
    type: req.body.type,
    shift: req.body.shift,
    event_id: req.body.event_id,
    user_id: req.body.user_id,
  });

  // Save Accident in the database
  accident
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the accident.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Accident.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "Not found Accident with id " + id,
        });
      else {
        const {
          _id,
          date_hour,
          involved_number,
          location,
          region,
          type,
          shift,
          event_id,
          user_id,
        } = data;

        res.status(200).send({
          id: _id,
          date_hour,
          involved_number,
          location,
          region,
          type,
          shift,
          event_id,
          user_id,
        });
      }
    })
    .catch(() => {
      console.log(err);

      res.status(500).send({
        message: "Error retrieving Accident with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  const limit = req.query && req.query.limit > 0 ? req.query.limit : 6;
  const offset = req.query && req.query.offset > 0 ? req.query.offset : 1;

  const all = req.query && req.query.all;

  Accident.find({})
    .then((data) => {
      let i = 0;

      res.status(200).send(
        data
          .map(({ _id, location, date_hour, region, type, shift, user_id }) => {
            return {
              id: _id,
              location,
              date_hour,
              region,
              type,
              shift,
              user_id,
            };
          })
          .slice(
            !all
              ? req.query && req.query.range
                ? parseInt(
                    req.query.range
                      .substring(1, req.query.range.length - 1)
                      .split(",")[0]
                  )
                : offset - 1
              : 0,
            req.query && req.query.range
              ? parseInt(
                  req.query.range
                    .substring(1, req.query.range.length - 1)
                    .split(",")[1]
                ) + 1
              : !all
              ? limit * offset
              : data.length
          )
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving accidents.",
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

  Accident.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Accident with id=${id}. Maybe Accident was not found!`,
        });
      } else {
        res.send({
          message: "Accident was updated successfully.",
        });
      }
    })
    .catch((err) => {
      console.log(err);

      res.status(500).send({
        message:
          err.message || "Error updating Accident to accident with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Accident.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Accident with id=${id}. Maybe Accident was not found!`,
        });
      } else {
        res.send({
          message: "Accident was deleted successfully!",
        });
      }
    })
    .catch(() => {
      console.log(err);

      res.status(500).send({
        message: "Could not delete Accident with id=" + id,
      });
    });
};
