module.exports = app => {
    const report = require('../controllers/report.controller');
    let router = require('express').Router();

    router.get('/ranking', report.ranking);

    router.get('/region', report.region);

    // router.get('/live', report.live);

    app.use('/api/report', router);

};