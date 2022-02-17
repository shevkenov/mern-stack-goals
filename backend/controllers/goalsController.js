const Goal = require("../model/goalsModel");

//@desc     get goals
//@route    GET /api/goals
//@access   Private
const getGoals = async(req, res, next) => {
    const id = req.user;
    try {
        const goals = await Goal.find({user: id});
        res.status(200).json(goals)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//@desc     add new goal
//@route    POST /api/goals
//@access   Private
const setGoal = async (req, res, next) => {
    const { text } = req.body;
    const id = req.user;
    if(!text){
        res.status(400);
        throw new Error("Please add a goal");
    }
    
    try {
        const newGoal = await Goal.create({
            text,
            user: id
        })
        res.status(200).json(newGoal);
    } catch (error) {
        console.log(error);
        next(error)
    }

}

//@desc     update goal
//@route    PUT /api/goals/:id
//@access   Private
const updateGoal = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const userId = req.user;

        const goal = await Goal.findById(id);

        if(!goal){
            res.status(400);
            throw new Error('Goal not found');
        }

        if(goal.user.toString() !== userId){
            res.status(401);
            throw new Error("User not authorised")
        }
        
        const updatedGoal = await Goal.findByIdAndUpdate(id, {
            text
        }, {new: true})
        res.status(200).json(updatedGoal)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//@desc     remove goal
//@route    POST /api/goals/:id
//@access   Private
const removeGoal = async (req, res, next) => {
    const userId = req.user;
    const { id } = req.params;
    try {
        const goal = await Goal.findById(id);

        if(!goal){
            res.status(400);
            throw new Error('Goal not found');
        }

        if(goal.user.toString() !== userId){
            res.status(401);
            throw new Error("User not authorised")
        }

        await goal.remove();
        res.status(200).json({id});
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    removeGoal
}