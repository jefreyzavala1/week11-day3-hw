const Todo = require('../models/todo')

exports.getTodos = async(req,res)=>{
    try {
        const todos = await Todo.find({})
        res.json(todos)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.createTodo = async(req,res)=>{
    try {
        const todo = new Todo(req.body)
        await todo.save()
    res.json(todo)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    
}

exports.getTodo = async(req,res)=>{
    try {
        const todo = await Todo.findOne({_id:req.params.id})
        res.json(todo)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.updateTodo = async(req,res)=>{
try {
    const todo = await Todo.findOne({_id:req.params.id})

    const properties =  Object.keys(req.body)

    properties.forEach(property=>todo[property]=req.body[property])
    await todo.save()
    res.json(todo)
} catch (error) {
    res.status(400).json({message:error.message})
}
}