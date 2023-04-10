const Sib = require("sib-api-v3-sdk");

const dotenv =  require("dotenv");
dotenv.config()



exports.postForgotPassword = async (req,res,next) => {
   try {
    const client =  Sib.ApiClient.instance;

    const apiKey =   client.authentications['api-key']

    apiKey.apiKey =  process.env.SIB_API_KEY

        const email = req.body.email
        const tranEmailApi = new Sib.TransactionalEmailsApi()

        const sender = {
            email : "buntymerugu0@gamil.com",
            name : "Expense Tracker"
        }

        const recievers = [{
                email : `${email}`
            }]
        await tranEmailApi.sendTransacEmail({
            sender,
            to : recievers,
            subject : "Reset Your Password",
            textContent : "this is test mail"
        })

        res.status(200).json({ success : true, message : "you chose to reset your password" })

    }
    catch(err){
        console.log(err);
    }

}
