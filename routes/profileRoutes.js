const express = require('express')
const profileRouter = express.Router()
const User = require('../models/user')

//Administrative Privileges

profileRouter.get("/", (req, res)=>{
   User.find((err, users)=>{
       if(err){
           return res.status(500).send(err)
       }
       return res.status(200).send(users)
   })
})

profileRouter.post("/", (req, res)=>{
    const newUser = new User(req.body)
    newUser.save((err, newSavedUser)=>{
        if(err){
            return res.status(500).send(err)
        }
        return res.status(201).send(newSavedUser)
    })
})

//Routes Individual User

profileRouter.get("/:id", (req, res)=>{
    User.findOne({_id: req.user.id}, (err, foundUser)=>{
        if(err){
            return res.status(500).send(err)
        }
        return res.status(200).send(foundUser)
    })
})

profileRouter.put("/:id", (req, res)=>{
    User.findOneAndUpdate(
        {_id: req.user.id}, req.body, ({new: true}), (err, updatedUser)=>{
            if(err){
                return res.status(500).send(err)
            }
        return res.status(201).send(updatedUser)
    })
})

profileRouter.delete("/:id", (req, res)=>{
    User.findByIdAndDelete(req.user.id, (err, deletedUser)=>{
        if(err){
            return res.status(500).send(err)
        }
        return res.status(200).send({message: "User successfully deleted", id: deletedUser._id})
    })
})

module.exports = profileRouter