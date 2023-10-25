import Stripe from 'stripe'
import donenv from 'dotenv'
donenv.config()
const stripe = new Stripe(process.env.SK_TEST)

export const PaymentShop = async (req ,res ,next) => {
     const myPayment = await stripe.paymentIntents.create({
       amount: req.body.amount,
       currency:'thb',
       metadata:{
         company:"namgami_novel"
       }
     })
     res.status(201).json({
      success:true,
      client_secret: myPayment.client_secret,
     })
}

export const stripeAPIKey = async (req , res ,next) =>{
   res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY})
} 