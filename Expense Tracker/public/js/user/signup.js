const url = "http://localhost:3000/"

document.addEventListener("DOMContentLoaded",()=>{
    document.querySelector('.signup').onsubmit = (e) =>{
        e.preventDefault();
        const name = document.querySelector("#name").value;        
        const email = document.querySelector("#email").value;
        const phone = document.querySelector("#phone").value;
        const password = document.querySelector("#password").value;
        const newUser = {
            name : name,
            email : email,
            phone : phone,
            password:password
        }

        axios
        .post(`${url}user/signup`,newUser)
        .then(res => {
            const path = res.data;
            document.location.pathname = path
           
        })
        .catch(err => {
         document.querySelector('.alertu').innerHTML = `<div class="alert alert-danger alert-dismissible fade in">
         <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>User Already Exists
         </div>`

        })
    }
})