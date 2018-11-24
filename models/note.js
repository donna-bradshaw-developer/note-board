const mongoose = require ('mongoose')

const noteSchema = new mongoose.Schema({
    noteInfo: {
        type: String,
        required: true
    },
    isCompleted:{
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Note', noteSchema)