const url = "http://localhost:3000/"

document.addEventListener("DOMContentLoaded",()=>{
    document.querySelector('.signup').onsubmit = (e) =>{
        e.preventDefault();
        const name = document.querySelector("#name").value;        const email = document.querySelector("#email").value;
        const phone = document.querySelector("#phone").value;
        const password = document.querySelector("#password").value;
        const newUser = {
            name : name,
            email : email,
            phone : phone,
            password:password
        }

        axios
        .post(`${url}user/signup`)
        .then(user => {
            console.log("user account has been created");
        })
        .catch(err => {
            console.log(err)
        })

    }
})