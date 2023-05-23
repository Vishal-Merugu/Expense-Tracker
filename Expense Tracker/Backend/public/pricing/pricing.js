const url = "http://localhost:3000";

async function premiumOrNot(){
    const response = await axios.get(`${url}/user/isPremium`,config)
    const isPremium = response.data.isPremium;
    if(isPremium){
        document.querySelector('.alert').style.display = ""
        document.querySelector('#rzp-button1').disabled = true;
    }
}

//always run
premiumOrNot()

document.addEventListener("DOMContentLoaded", async() =>{

    document.querySelector('#rzp-button1').onclick = async (e) => {
        const response = await axios.get(`${url}/purchase/premiumMembership`, config)

        // const order = response.data.order
        const key_id = response.data.key_id
        const order_id = response.data.order_id

        var options =  {
            "key" : key_id,
            "order_id" : order_id,
            "handler" : async function (response){
                const {razorpay_order_id, razorpay_payment_id } = response
                await axios.post(`${url}/purchase/updateTransaction`,{
                    //order_id is same
                    order_id : razorpay_order_id,
                    payment_id : razorpay_payment_id
                }, config)
                await premiumOrNot()
                alert("you are a premiums user now");
            }
        }
        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault()

        rzp1.on("payment.failed" , async (response) => {
            await axios.post(`${url}/purchase/updateTransaction`,{
                order_id : order_id
            }, config)
            alert("Payment Failed");
        })
    }
    

    
})

