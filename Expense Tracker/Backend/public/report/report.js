const url = "http://18.212.3.80:3000"


document.querySelectorAll('#year').forEach(year => {
    year.innerHTML = new Date().getFullYear()
})
document.querySelector('#month').innerHTML =getMonthName( new Date().getMonth()+1);

document.querySelector('#download').onclick = downloadReport ;

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

async function downloadReport(e){
    const response = await axios.get(`${url}/expenses/user/downloadreport`, config)
    // console.log(response);
    if(response.status == 200){
        var a = document.createElement('a');
        a.href = response.data.fileUrl;
        a.download = "temp.csv"
        await a.click();
        
    }else{
        alert("Some Error Occured Try After Some time")
    }
}

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }

showDownloadedFiles()
async function showDownloadedFiles(){
    const response = await axios.get(`${url}/user/filesdownloaded`, config);
    response.data.forEach((file,index) => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <th scope="row">${index+1}</th>
                  <td>${file.createdAt.slice(0,10)}</td>
                  <td>
                    <div class="button" id = ${file.fileurl}>
                    <button class = "btn btn-dark btn-sm" type = "submit" id = "oldfiledownload">download</button>
                    </div>
                  </td>
        `
        document.querySelector('#downloadedfiles').appendChild(tr)
    })
}

document.querySelector('#downloadedfiles').onclick = async(e) => {
    if(e.target.id == 'oldfiledownload'){
        const fileUrl = e.target.parentNode.id
        var a = document.createElement('a');
        a.href = fileUrl;
        a.download = "temp.csv"
        a.click()
    } 
}