const express = require('express')
const noteRouter = express.Router()
const Note = require("../models/note")

noteRouter.get('/', (req,res)=>{
    Note.find({ user: req.user._id }, (err, notes) =>{
        if(err){
            return res.status(500).send(err);
        }
        return res.send(notes)
    })
})

noteRouter.post("/", (req, res)=>{
    const note = new Note(req.body);
    note.user = req.user._id;
    note.save(function(err, newNote){
        if(err){
            return res.status(500).send(err);
        }
        return res.status(201).send(newNote)
    })
})

noteRouter.get("/:noteID", (req, res)=>{
    Note.findOne({_id: req.params.noteID, user: req.user._id}, (err, note) =>{
        if(err){
            return res.status(500).send(err)
        }
        if (!note){
            return res.status(404).send("No note found.");
        }
        return res.send(note) 
    })
})

noteRouter.put('/:noteID', (req, res) =>{
    Note.findOneAndUpdate({_id: req.params.noteID, user: req.user._id}, 
        req.body, {new: true},
        (err, note) =>{
        if(err){
            return res.status(500).send(err)
        }
        return res.send(note)
    })
})

noteRouter.delete("/:noteID", (req, res) =>{
    Note.findOneAndRemove({_id: req.params.noteID, user: req.user._id}, (err, note) =>{
        if(err){
            return res.status(500).send(err)
        }
        return res.send({message: "Note successfully deleted", note})
    })
})

module.exports = noteRouter;