const url = "http://localhost:3000"

axios
    .get(`${url}/user/ispremium`,config)
    .then(res => {
        if(!res.data.isPremium){
            document.querySelector("#download").disabled = true
        }
    })