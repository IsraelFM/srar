module.exports = app => {
    const accident = require('../controllers/accident.controller');
    let router = require('express').Router();

    router.post('/', accident.create);
    
    router.get('/:id', accident.findOne);

    router.get('/', accident.findAll);

    router.put('/:id', accident.update);

    router.delete('/:id', accident.delete);

    app.use('/api/accident', router);

};