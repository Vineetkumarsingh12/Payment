import express from "express";
import {  getPlans,checkout,getCart,updatePlan,addToCart} from "../controllers/plans.js";
import { isAuthenticated } from "../middlewares/auth.js";
const route = express.Router();
route.get("/",isAuthenticated,getPlans);
route.post("/checkout",isAuthenticated,checkout);
route.get("/cart",isAuthenticated,getCart);
route.patch("/updatePlan",isAuthenticated,updatePlan);
route.post("/add-to-cart",isAuthenticated,addToCart);


export default route;