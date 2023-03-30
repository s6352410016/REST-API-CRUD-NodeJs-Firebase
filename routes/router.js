const router = require('express').Router();
const travelControllers = require('../controller/travelControllers');

router.get('/getAllTravelData' , travelControllers.getAllTravelData);
router.get('/getTravelDataById/:id' , travelControllers.getTravelDataById);
router.post('/createTravel' , travelControllers.createTravel);
router.put('/updateTravel/:id' , travelControllers.updateTravel);
router.delete('/deleteTravel/:id' , travelControllers.deleteTravel);

module.exports = router;