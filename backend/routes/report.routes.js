module.exports = app => {
    const report = require('../controllers/report.controller');
    let router = require('express').Router();

    router.get('/ranking', report.ranking);

    router.get('/region', report.region);

    app.use('/api/report', router);

};