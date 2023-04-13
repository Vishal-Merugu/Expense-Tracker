const url = "http://localhost:3000"


document.querySelectorAll('#year').forEach(year => {
    year.innerHTML = new Date().getFullYear()
})
document.querySelector('#month').innerHTML =getMonthName( new Date().getMonth()+1);


handler();
 async function handler() {

    const isPremium = await axios.get(`${url}/user/ispremium`, config)
    if(!isPremium.data.isPremium){
        document.querySelector('#download').disabled = true
    }


    const report = await axios.get(`${url}/expenses/user/report`, config)
    
    yearExpenses = report.data

    yearExpenses.forEach((monthExpense, index) => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
            <td>${getMonthName(index+1)}</td>
            <td>${monthExpense.monthTotalExpense}</td>`
            document.querySelector('#yearlyreport').appendChild(tr)
    });

    yearExpenses.forEach((expenses, index) => {
        if(index == new Date().getMonth()){
            const currentMonthExpense = expenses.expenses
            currentMonthExpense.forEach((expense, i) => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                <th>${i+1}</th>
                <td>${expense.expense}</td>
                <td>${expense.category}</td>
                <td>${expense.amount}</td>
                `
                document.querySelector('#monthlyreport').appendChild(tr)
            })
            
        }
    })
}


function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }


