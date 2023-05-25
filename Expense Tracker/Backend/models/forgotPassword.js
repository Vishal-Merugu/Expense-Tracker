
const { mongoose, Schema} = require('mongoose')

const forgotPasswordRequestSchema = new Schema({
    
    isActive : {
        type : Schema.Types.Boolean,
        required : true,
        default : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"
    }
})

module.exports = mongoose.model('ForgotPasswordRequest',forgotPasswordRequestSchema )
