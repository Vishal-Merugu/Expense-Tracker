
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
        },
        date : {
            type : Date,
            default : new Date()
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
    const expenses = this.expenses.slice(offset,limit)
    const totalExpenses = this.expenses.length;
    return {expenses : expenses, totalExpenses : totalExpenses}
}

userSchema.methods.deleteExpense = function (expenseId) {
    this.expenses = this.expenses.filter(expense => {
        if(expense._id != expenseId){
            return expense
        }else{
            this.totalExpenses -= expense.amount
        }  
    })
    return this.save()
}

userSchema.methods.getReport = async function (){
    currentYear = new Date().getFullYear()

    const yearlyExpenses = {}
    const expenses = await this.expenses;
    expenses.map(expense => {
        let month = expense.date.getMonth() + 1 
        if(!yearlyExpenses[month]){
            yearlyExpenses[month] = { expenses : [expense] }
            yearlyExpenses[month].totalExpense = expense.amount
        }else {
            yearlyExpenses[month].expenses.push(expense)
            yearlyExpenses[month].totalExpense += expense.amount
        }
    })
    
    return yearlyExpenses
}


module.exports = mongoose.model('User', userSchema);