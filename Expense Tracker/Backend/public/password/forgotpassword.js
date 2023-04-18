const url  = 'http://18.212.3.80:3000'

const Email = document.querySelector('#email')

document.addEventListener("DOMContentLoaded",()=> {
    document.querySelector('form').onsubmit = async (e) => {
        try{
            e.preventDefault()
            const email = Email.value;
            const response = await axios.post(`${url}/password/forgotpassword`, {
                email : email
            })
            if(response.data.success){
                document.querySelector('.alertu').innerHTML = `
                <div class="alert alert-warning">
                Check Your Email
            </div>
                `
            }
        }
        catch(err){
            console.log(err);
        }

    }
})