const url  = 'http://localhost:3000'

const Email = document.querySelector('#email')

document.addEventListener("DOMContentLoaded",()=> {
    document.querySelector('form').onsubmit = async (e) => {
        e.preventDefault()
        const email = Email.value;
        await axios.post(`${url}/password/forgotpassword`, {
            email : email
        })

    }
})