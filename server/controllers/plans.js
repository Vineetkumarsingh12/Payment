import {User} from "../models/user.js";
import { Plan } from "../models/plan.js";
//dotenv
import dotenv from "dotenv";
import Stripe from "stripe"; // Import Stripe directly

dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// get all plans

export const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        console.log("planscontor",plans);
        res.status(200).json({
            success: true,
            data: plans,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  update plan
export const updatePlan = async (req, res) => {
    try{

    
  const {id,name,description,duration,amount} = req.body;
  const userId=req.user;
  const user = await User.findById(userId);
  if( !user || user.role !== 'admin'){
    return res.status(401).json({message:"You are not authorized to update plan"});
  }
  // if role is not admin
  const plan=await Plan.findByIdAndUpdate(id,{name,description,duration,amount},{new:true});

    res.status(200).json({
        success: true,
        data: plan,
    });
}catch(error){
    res.status(500).json({ message: error.message });
}
}


// add to cart
export const addToCart = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.user;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "You need to login first" });
        }
        const plan = await Plan.findById(planId);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        user.cart.push(planId);
        await user.save();
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get cart items
export const getCart = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId).populate("cart");
        if (!user) {
            return res.status(401).json({ message: "You need to login first" });
        }
        const cart = user.cart;
        res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// checkout pageout of plans using stripe payment gateway
export const checkout = async (req, res) => {
    try {
        console.log(process.env.STRIPE_SECRET_KEY);

        const userId = req.user;
        const user = await User.findById(userId).populate("cart");

        console.log("user", user);
        if (!user) {
            return res.status(401).json({ message: "You need to login first" });
        }

        const cart = user.cart;
        if (!cart.length) {
            return res.status(404).json({ message: "Your cart is empty" });
        }

        console.log("cart", cart);

        const amount = cart.reduce((acc, item) => acc + parseInt(item.amount), 0);
        console.log("amount", amount);

        const paymentIntent = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: cart.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: parseInt(item.amount) * 100, // Stripe expects amount in cents
                },
                quantity: 1,
            })),
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        user.cart = [];
        await user.save();
        console.log("paymentIntent",user.cart);

        res.status(200).json({
            success: true,
            data: paymentIntent,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ message: error.message });
    }
};