const url = "http://localhost:3000"


const leaderboard = async () => {
    const response = await  axios.get(`${url}/user/isPremium`, config);

    const isPremium = response.data.isPremium

    if(!isPremium){
        document.querySelector('main').innerHTML = `<h1 class = "text-center col-8 m-auto">Please Buy Premium to access this feature</h1>`
    }else{
        const response = await axios.get(`${url}/premium/leaderboard`, config);
        const usersLeaderboard = response.data
        usersLeaderboard.forEach((user,index) => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
            <th >${index+1}</th>
                <td>${user.name}</td>
                <td>${user.totalExpenses}</td>`    
            document.querySelector('tbody').appendChild(tr)

        });
    }
}
leaderboard();
