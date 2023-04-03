
const url = "http://localhost:3000/"

document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector(".login").onsubmit = (e) => {
        e.preventDefault();
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const user = {
            email : email,
            password : password
        }

        axios.
        post(`${url}user/login`,user)
        .then(res => {
            alert("User Logged in successfully")
        })
        .catch(err => {
            const message = err.response.data;
            document.querySelector('.alertu').innerHTML = `<div class="alert alert-danger alert-dismissible fade in">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>${message}
            </div>`
   
           })
    }
})