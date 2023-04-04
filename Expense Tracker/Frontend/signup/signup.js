const url = "http://localhost:3000/"

const Name = document.querySelector("#name");
const Email = document.querySelector("#email");
const Phone = document.querySelector("#phone");
const Password = document.querySelector("#password");
const alertu = document.querySelector('.alertu')

document.addEventListener("DOMContentLoaded",()=>{
    document.querySelector('.signup').onsubmit = async (e) =>{
        e.preventDefault();
        try{

            const name = Name.value;        
            const email = Email.value;
            const phone = Phone.value;
            const password = Password.value;
            const newUser = {
                name : name,
                email : email,
                phone : phone,
                password:password
            }
         
            const response =await axios.post(`${url}user/signup`,newUser)
            if(response.status == 200){
                alert("Account Created Successfully")
                window.location.href = '../login/login.html'
            }
            else{
                throw new Error("User Already Exists")
            }
        }
        catch(err){
            alertu.innerHTML = `<div class="alert alert-danger alert-dismissible fade in">
             <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>${err.response.data}
             </div>`
             setTimeout(()=> document.querySelector('.alert').remove(),3000)
        }
    }
})