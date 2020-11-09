module.exports = app => {
    const vehicle = require('../controllers/vehicle.controller');
    let router = require('express').Router();

    router.post('/', vehicle.create);
    
    router.get('/:id', vehicle.findOne);

    router.get('/', vehicle.findAll);

    router.put('/:id', vehicle.update);

    router.delete('/:id', vehicle.delete);

    app.use('/api/vehicle', router);

};