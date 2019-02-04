const
    express = require('express'),
    breweriesRouter = new express.Router(),
    breweriesCtrl = require('../controllers/breweries.js');
    verifyToken = require('../serverAuth').verifyToken;


breweriesRouter.use(verifyToken);    
    
// INDEX
breweriesRouter.get('/', breweriesCtrl.index);

// CREATE
breweriesRouter.post('/', breweriesCtrl.create);

// SHOW
breweriesRouter.get('/:id', breweriesCtrl.show);

// UPDATE
breweriesRouter.patch('/:id', breweriesCtrl.update);

// DELETE
breweriesRouter.delete('/:id', breweriesCtrl.destroy);




module.exports = breweriesRouter;