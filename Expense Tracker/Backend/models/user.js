
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    expenses : [{
        amount : {
            type : Number,
            required : true
        },
        expense : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        category : {
            type : String,
            required : true
        }
    }]
    ,
    isPremium : {
        type : Schema.Types.Boolean,
        default : false,
        required : true
    },
    totalExpenses : {
        type : Number,
        required : false,
        default : 0
    }

})

userSchema.methods.getExpenses = function(page,count){
    const offset = ((page-1)*count);
    const limit  = offset + count 
    console.log(offset, limit);
    const expenses = this.expenses.slice(offset,limit)
    const totalExpenses = this.expenses.length;
    return {expenses : expenses, totalExpenses : totalExpenses}
}



module.exports = mongoose.model('User', userSchema);