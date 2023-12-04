const router = require("express").Router();
const setting = require("../controllers/setting");
const verifyRole = require("../middlewares/verify-role");
const verifyToken = require("../middlewares/verify-token");

router.use(verifyToken)

router.get('/', setting.getSetting)

router.use(verifyRole.verifyRoleAdmin)

// router.get('/list_car', car.getListCar)
// router.get('/:id', car.getCar)
// router.post('/create', car.createCar)

module.exports = router;