module.exports = app => {
    const panicButton = require('../controllers/panicButton.controller');
    let router = require('express').Router();

    router.post('/', panicButton.create);
    
    router.get('/:id', panicButton.findOne);

    router.get('/', panicButton.findAll);

    router.put('/:id', panicButton.update);

    router.delete('/:id', panicButton.delete);

    app.use('/api/panic_button', router);

};