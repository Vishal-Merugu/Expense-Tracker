const RazorPay = require("razorpay")

const dotenv =  require("dotenv");
dotenv.config()

const Order = require("../models/order")

exports.purchasePremium = async (req,res,next) => {
    try{
        const user = req.user
        var rzp = await  new RazorPay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret : process.env.RAZORPAY_KEY_SECRET
        })     
    
        const amount = 20000;

        const order = await rzp.orders.create({
            amount : amount,
            currency : "INR"
        })
        const newOrder = new Order({
            orderId : order.id,
            status : "PENDING",
            userId : user._id
        })
        newOrder.save()
        return res.status(201).json({order_id : order.id, key_id : rzp.key_id}) 
    }
    catch(err){
        console.log(err);
    }
}

exports.updateTransaction =  async (req,res,next) => {
    try{
        const user = req.user;
        let status;
        let isPremium ;
        const { order_id, payment_id } = req.body ;
        if(!payment_id){
            status = "FAILED"
            isPremium = false
        }else{
            status = "SUCCESSFUL"
            isPremium = true
        }

        const order = await Order.findOne({  orderId : order_id } )

        //update order
        order.paymentId = payment_id;
        order.status = status;
        await order.save()

        //update isPremium of
        user.isPremium = isPremium;
        await user.save()

        return res.status(202).json({ success : true, message : "Transaction Successful"})
    }
    catch(err){
        console.log(err);
    }
    
}