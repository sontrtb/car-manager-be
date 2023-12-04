const router = require("express").Router();
const car = require("../controllers/car");
const verifyRole = require("../middlewares/verify-role");
const verifyToken = require("../middlewares/verify-token");

router.use(verifyToken)

router.patch('/update/:id', car.updateCar)

router.use(verifyRole.verifyRoleAdmin)

router.get('/list_car', car.getListCar)
router.get('/:id', car.getCar)
router.post('/create', car.createCar)

module.exports = router;
