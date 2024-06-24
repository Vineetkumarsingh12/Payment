import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../constants/config';
import Card from './Card';
import {useNavigate} from 'react-router-dom';

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
    // Fetch cart
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${server}/api/v1/plan/cart`, { withCredentials: true });
                console.log(response.data.data);
                setCart(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCart();
    }, []);

    // Calculate total amount whenever cart changes
    useEffect(() => {
        const totalAmount = cart.reduce((acc, plan) => acc + parseInt(plan.amount, 10), 0);
        setAmount(totalAmount);
    }, [cart]);

    console.log("amount", amount);

    return (
        <div className='flex flex-row p-3 gap-1'>
            <div className=' flex flex-row  gap-2 flex-wrap'>
                {cart.map((plan) => (
                    <Card key={plan._id} plan={plan} checkout={true} />
                ))}
            </div>

            {/* Checkout */}
            <div className='bg-blue-500 p-5 rounded-lg shadow-lg max-w-sm h-fit mx-auto'>
                <div className='mb-4'>
                    <label className='block text-white mb-2' htmlFor='plan'>Plan</label>
                    <input
                        id='plan'
                        type='text'
                        readOnly={true}
                        value={`Total Amount: ${amount}`}
                        name='name'
                        className='w-full p-2 rounded bg-gray-200 text-gray-500 border border-gray-300'
                    />
                </div>
                <button className='bg-white text-blue-500 px-4 py-2 rounded' onClick={async (e) => {
                    e.preventDefault();
                    try {
                        const response = await axios.post(`${server}/api/v1/plan/checkout`, {}, { withCredentials: true });
                        console.log(response.data.data);

                        // Redirect to stripe checkout
                        window.location.href = response.data.data.url;

                    } catch (error) {
                        console.log(error);
                    }
                }}>Checkout</button>
            </div>
        </div>
    );
};

export default Checkout;
