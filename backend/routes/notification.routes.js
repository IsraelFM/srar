module.exports = app => {
    const notification = require('../controllers/notification.controller');
    let router = require('express').Router();

    router.post('/', notification.create);
    
    router.get('/:id', notification.findOne);

    router.get('/', notification.findAll);

    router.put('/:id', notification.update);

    router.delete('/:id', notification.delete);

    app.use('/api/notification', router);

};