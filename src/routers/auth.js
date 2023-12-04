const router = require("express").Router();
const auth = require("../controllers/auth");
// const verifyRole = require("../middlewares/verify-role");
// const verifyToken = require("../middlewares/verify-token");

router.post('/login', auth.login)

// router.use(verifyToken)
// router.use(verifyRole.verifyRoleAdmin)

router.post('/register', auth.register)

module.exports = router;