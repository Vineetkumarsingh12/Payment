import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import {server} from  "../constants/config"
const Card = ({plan ,checkout=false}) => {
    console.log("plan2212",plan);
    const [editable, setEditable] = useState(false);
    const user = useSelector(state => state.auth.user);
    console.log(user);
    const [name,setName]=useState(plan.name);
    const [description,setDescription]=useState(plan.description);
    const [duration,setDuration]=useState(plan.duration);
    const [amount,setAmount]=useState(plan.amount);

    //update plan

    const handleUpdatePlan = async (e) => {
        e.preventDefault();
        const form = e.target;
        console.log(form);  
        const id = plan._id;
      
        console.log(id, name, description, duration);
  if(editable){
        try {
            const response = await axios.patch(`${server}/api/v1/plan/updatePlan`, {
                id,
                name,
                description,
                duration,
                amount
            }, { withCredentials: true });
            console.log(response.data);
            toast.success("Plan updated successfully");
        } catch (error) {
            console.log(error);
        }
    }
    setEditable(!editable);
    };

    //add to cart
    const handleAddToCart = async (e) => {
        console.log("add to cart");
        e.preventDefault();

        const planId = plan._id;
        console.log(planId);    
        try {
            const response = await axios.post(`${server}/api/v1/plan/add-to-cart`, {
                planId
            }, { withCredentials: true });
            toast.success("Plan added to cart");   
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
   

    return (
        <div className='bg-blue-500 p-5 rounded-lg shadow-lg max-w-sm mx-auto h-fit'>
            <div className='mb-4'>
                <label className='block text-white mb-2' htmlFor='plan'>Plan</label>
                <input 
                    id='plan' 
                    type='text' 
                    readOnly={!editable} 
                    value={name}
               onChange={(e)=>setName(e.target.value)}
                    name='name'
                    className={`w-full p-2 rounded ${editable ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'} border border-gray-300`}
                />
            </div>
            <div className='mb-4'>
                <label className='block text-white mb-2' htmlFor='amount'>Price</label>
                <input 
                    id='amount' 
                    type='text' 
                    value={amount}
                    readOnly={!editable} 
                   onChange={(e)=>setAmount(e.target.value)}
                    name='amount'
                    className={`w-full p-2 rounded ${editable ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'} border border-gray-300`}
                />
            </div>
            <div className='mb-4'>
                <label className='block text-white mb-2' htmlFor='duration'>Duration</label>
                <input 
                    id='duration' 
                    type='text' 
                    value={duration}
                    readOnly={!editable} 
                    name='duration'
                    onChange={(e)=>setDuration(e.target.value)}
                    className={`w-full p-2 rounded ${editable ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'} border border-gray-300`}
                />
            </div>
            <div className='mb-4'>
                <label className='block text-white mb-2' htmlFor='description'>Description</label>
                <input 
                    id='description' 
                    type='text' 
                    value={description}
                    readOnly={!editable} 
                    name='description'
                    onChange={(e)=>setDescription(e.target.value)}
                    className={`w-full p-2 rounded ${editable ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'} border border-gray-300`}
                />
            </div>
            {
            !checkout && <div className=' flex '>
            {
           user.role=='admin' && <button 
                onClick={handleUpdatePlan} 
                className='mt-2 p-2 bg-blue-700 text-white rounded hover:bg-blue-600 transition'
            >
                {editable ? 'Save' : 'Edit'}
            </button>
            
}
      {
        user.role=='user' && <button 
             onClick={handleAddToCart} 
             className='mt-2 p-2 bg-blue-700 text-white rounded hover:bg-blue-600 transition'
         >
             add to cart
         </button>
         
}

</div>
}
        </div>
    );
};

export default Card;
