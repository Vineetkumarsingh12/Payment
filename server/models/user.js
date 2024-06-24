import mongoose, { Schema, model } from "mongoose";


const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required:true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    //enum for role admin and user
    role:{
      type:String,
      default:'user',
      enum:['user','admin']
    },
    
      gender: {
        type: String,
        required: true,
      },
  
    cart : [
      {
        type: Schema.Types.ObjectId,
        ref: "Plan",
      }
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || model("User", schema);
