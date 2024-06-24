import mongoose, { Schema, model } from "mongoose";


const schema = new Schema(
  {
   name:{
  type:String,
  required:true,
   },
amount:{
  type:String,
  required:true,
   },
   duration:{
    type:String,
    required:true,
   }, 
   descripition:{
    type:String,
    required:true,
   },
  },
  {
    timestamps: true,
  }
);

export const Plan = mongoose.models.Plan || model("Plan", schema);
