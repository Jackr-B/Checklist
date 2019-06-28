var db = require("../models");

exports.getTasks = function(req, res){
    db.Task.find()
    .then(function(tasks){
        res.json(tasks);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.createTask = function(req, res){
    db.Task.create(req.body)
    .then(function(newTask){
        res.status(201).json(newTask);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.getTask = function(req, res){
    db.Task.findById(req.params.taskId)
    .then(function(viewedTask){
        res.json(viewedTask);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.updateTask = function(req, res){
    db.Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true})
    .then(function(task){
        res.json(task);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.deleteTask = function(req, res){
    db.Task.remove({_id: req.params.taskId})
    .then(function(){
        res.json({message: "Task deleted"})
    })
    .catch(function(err){
        res.send(err);
    })
}

module.exports = exports;