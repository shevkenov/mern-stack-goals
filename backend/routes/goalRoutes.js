const router = require('express').Router();
const { getGoals, setGoal, updateGoal, removeGoal } = require('../controllers/goalsController');
const auth = require("../middleware/authMiddleware");

router.route("/").get(auth, getGoals).post(auth, setGoal)
router.route("/:id").put(auth, updateGoal).delete(auth, removeGoal)

module.exports = router;
