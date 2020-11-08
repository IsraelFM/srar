module.exports = app => {
    const route = require('../controllers/route.controller');
    let router = require('express').Router();

    router.post('/', route.create);
    
    router.get('/:id', route.findOne);

    router.get('/', route.findAll);

    router.put('/:id', route.update);

    router.delete('/:id', route.delete);

    app.use('/api/route', router);

};