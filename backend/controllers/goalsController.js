const Goal = require("../model/goalsModel");

//@desc     get goals
//@route    GET /api/goals
//@access   Private
const getGoals = async(req, res) => {
    try {
        const goals = await Goal.find();
        res.status(200).json(goals)
    } catch (error) {
        console.log(error);
    }
}

//@desc     add new goal
//@route    POST /api/goals
//@access   Private
const setGoal = async (req, res) => {
    const { text } = req.body;
    if(!text){
        res.status(400);
        throw new Error("Please add a goal");
    }
    
    try {
        const newGoal = await Goal.create({
            text
        })
        res.status(200).json(newGoal);
    } catch (error) {
        console.log(error)
    }

}

//@desc     update goal
//@route    PUT /api/goals/:id
//@access   Private
const updateGoal = async(req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const goal = await Goal.findById(id);

        if(!goal){
            res.status(400);
            throw new Error('Goal not found');
        }
        
        const updatedGoal = await Goal.findByIdAndUpdate(id, {
            text
        }, {new: true})
        res.status(200).json(updatedGoal)
    } catch (error) {
        console.log(error)
    }
}

//@desc     remove goal
//@route    POST /api/goals/:id
//@access   Private
const removeGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const goal = await Goal.findById(id);

        if(!goal){
            res.status(400);
            throw new Error('Goal not found');
        }

        await goal.remove();
        res.status(200).json({id});
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    removeGoal
}