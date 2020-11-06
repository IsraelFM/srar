module.exports = app => {
    const event = require('../controllers/event.controller');
    let router = require('express').Router();

    router.post('/', event.create);
    
    router.get('/:id', event.findOne);

    router.get('/', event.findAll);

    router.put('/:id', event.update);

    router.delete('/:id', event.delete);

    app.use('/api/event', router);

};