//@desc     get goals
//@route    GET /api/goals
//@access   Private
const getGoals = (req, res) => {
    res.status(200).json({message: "home get response"})
}

//@desc     add new goal
//@route    POST /api/goals
//@access   Private
const setGoal = (req, res) => {
    const { text } = req.body;
    if(!text){
        res.status(400);
        throw new Error("Please add a goal");
    }

    res.status(200).json({goal: text})
}

//@desc     update goal
//@route    PUT /api/goals/:id
//@access   Private
const updateGoal = (req, res) => {
    res.status(200).json({update: req.params.id})
}

//@desc     remove goal
//@route    POST /api/goals/:id
//@access   Private
const removeGoal = (req, res) => {
    res.status(200).json({update: req.params.id})
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    removeGoal
}