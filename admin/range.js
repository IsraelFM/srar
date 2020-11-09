module.exports = (req, res, next) => {
  res.header("Content-Range", "Accidents 0-20/20");
  next();
};
