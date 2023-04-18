const url = 'http://18.212.3.80:3000';

localStorage.setItem('rowsPerPage', 3);

const CurrentPage = document.querySelector('#current-page')

document.querySelector('#rowsperpage').onchange = ()=> {
    const currentPage = document.querySelector('#current-page').textContent;
    const rowsPerPage = document.querySelector('#rowsperpage').value;
    localStorage.setItem('rowsPerPage', rowsPerPage);
    getExpenses(+currentPage, +rowsPerPage)
}


const Amount = document.querySelector('#amount');
const Expense = document.querySelector('#expense');
const Description = document.querySelector('#description');
const Category  = document.querySelector('#category');

async function getExpense(id){
    try{
        const token = localStorage.getItem("token")
        const response = await axios.get(`${url}/expenses/${id}`,{headers : { Authorization : token}});
        const expense = response.data;
        return expense
    }
    catch(err){ 
        console.log(err);
    }
}

async function postExpense(obj){
    try{
        const token = localStorage.getItem("token")
        const response = await axios.post(`${url}/expenses/expense`, obj,{headers : { Authorization : token}})
        // showOutput(response.data)
        const currentPage = CurrentPage.textContent;
        const rowsPerPage = localStorage.getItem('rowsPerPage')
        getExpenses( +currentPage, +rowsPerPage);a
    }
    catch(err){
        console.log(err);
    }
}

async function deleteExpense(id){
    try{
        const token = localStorage.getItem("token")
        document.getElementById(id).remove()
        const response = await axios.delete(`${url}/expenses/${id}`,{headers : { "Authorization" : token}});
    }
    catch(err){
        console.log(err);
    }
}

async function editExpense(expenseId, newExpense){
    try{
        const token = localStorage.getItem("token")
        const response = await axios.put(`${url}/expenses/${expenseId}`,newExpense, {headers : { Authorization : token}})
        const expense = response.data;
        document.getElementById('expenseId').value = ''
        // showOutput(expense)
        const currentPage = CurrentPage.textContent;
        const rowsPerPage = localStorage.getItem('rowsPerPage')
        getExpenses( +currentPage, +rowsPerPage);
    }
    catch(err){
        console.log(err);
    }
}

function showOutput(obj){
    const tr = document.createElement('tr');
    tr.title = obj.description;
    tr.id = obj.id

    tr.innerHTML = `<td class = "text-center">${obj.expense}</td>
    <td class = "text-center">${obj.category}</td>
    <td >
      ${obj.amount}
      <div class="btn-group float-end me-3">
        <button type="button" class="btn btn-primary btn-sm" id = "edit">edit</button>
        <button type="button" class="btn btn-danger btn-sm" id = "delete">X</button>
      </div>
    </td>`
    document.querySelector('tbody').append(tr)
}

async function getExpenses(page = 1, limit = 3){
    const token = localStorage.getItem("token")
    const response = await axios.get(`${url}/expenses`,{ headers : { "Authorization" : token, page : page, limit : limit }})

    const expenses = response.data.expenses;
    const totalExpenses = response.data.totalExpenses

    document.querySelector('tbody').innerHTML = ''

    expenses.forEach(expense => {
        showOutput(expense)
    });
    if((+page + 1) > Math.ceil(totalExpenses/limit)){
        document.querySelector('#next-page').classList.add('disabled')
    }else{
        document.querySelector('#next-page').classList.remove('disabled')
    }

}

document.addEventListener("DOMContentLoaded", async ()=> {

    getExpenses();
    document.querySelector('.pagination').onclick = (e) => {
        if(e.target.id == 'next-page'){

            const CurrentPage = document.querySelector('#current-page')
            const currentPage = CurrentPage.textContent;
            const rowsPerPage = localStorage.getItem('rowsPerPage')
            getExpenses( +currentPage + 1, +rowsPerPage);
            CurrentPage.innerHTML = +currentPage + 1
            document.querySelector('#prev-page').parentNode.classList.remove('disabled')
        }
        if(e.target.id == 'prev-page'){
            const CurrentPage = document.querySelector("#current-page")
            const currentPage = +CurrentPage.textContent 
            CurrentPage.textContent = +currentPage - 1;
            if((+CurrentPage.textContent - 1) == 0){
                document.querySelector('#prev-page').parentNode.classList.add('disabled')
            }
            // console.log(+CurrentPage.textContent);
            const rowsPerPage = localStorage.getItem('rowsPerPage')
            getExpenses(+CurrentPage.textContent, +rowsPerPage);
        }
    }
    document.querySelector('form').onsubmit = async (e) => {
        e.preventDefault()
        const amount =  Amount.value;
        const expense = Expense.value;
        const description = Description.value;
        const category = Category.value;
        const newExpense = {
            amount : amount,
            expense : expense,
            description : description,
            category : category
        }
        const expenseId = document.querySelector('#expenseId').value
        if(expenseId == ''){
            postExpense(newExpense)
        }else{
            editExpense(expenseId, newExpense)
        }
        Amount.value = ""
        Expense.value = ""
        Description.value = ""
        Category.value = ""
    }

    document.querySelector("tbody").onclick = async (e) => {
        if(e.target.id == 'delete'){
            const expenseId = e.target.parentNode.parentNode.parentNode.id;
            deleteExpense(expenseId)
        }
        else if (e.target.id == "edit"){
            const expenseId = e.target.parentNode.parentNode.parentNode.id;
            const expense = await getExpense(expenseId)
            Amount.value = expense.amount;
            Expense.value = expense.expense;
            Description.value = expense.description;
            Category.value = expense.category
            document.querySelector('#expenseId').value = expense.id
            document.getElementById(expenseId).remove()
        }
    }



})