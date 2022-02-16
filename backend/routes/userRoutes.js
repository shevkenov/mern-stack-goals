const router = require("express").Router();
const userAuth = require("../middleware/authMiddleware");

const { setNewUser, loginUser, getMe } = require("../controllers/usersControler");

router.post('/', setNewUser);
router.post('/login', loginUser);
router.get('/me', userAuth, getMe);

module.exports = router