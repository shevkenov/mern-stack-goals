const router = require('express').Router();
const { getGoals, setGoal, updateGoal, removeGoal } = require('../controllers/goalsControllers')

router.route("/").get(getGoals).post(setGoal)
router.route("/:id").put(updateGoal).delete(removeGoal)

module.exports = router;
