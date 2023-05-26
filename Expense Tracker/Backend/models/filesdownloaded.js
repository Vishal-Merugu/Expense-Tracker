
const { mongoose, Schema }  = require('mongoose')

const filesDownloadedSchema = new Schema({
    fileUrl : {
        type : String
    },
    userId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    date : {
        type : Date,
        default : new Date()
    }
})

module.exports = mongoose.model('FilesDownloaded', filesDownloadedSchema)
