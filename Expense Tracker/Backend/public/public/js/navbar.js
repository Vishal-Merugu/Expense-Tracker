const token = localStorage.getItem('token')
const config = {
    headers : {
        Authorization : token
    }
}
//login or logout  and signup in nav bar

if(!token){
    document.querySelector('main').innerHTML = "<h1 class = 'text-center'>Login First<h1>"
}else{

}

const login = document.querySelector('#login')
const logout = document.querySelector('#logout')
const signUp = document.querySelector('#signup')

if(token){
    login.style.display = 'none'
    signUp.style.display = "none"
}else{
    logout.style.display = "none"
}

// end of login or logout signup in nav-bar


//logout

document.querySelector('#logout').onclick = () => {
    localStorage.removeItem('token')
    window.location.href = "../login/login.html"
}

//logout


