import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import { server } from '../constants/config';

const Plans = () => {
    const [plans, setPlans] = useState([]);

    // Fetch all plans
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                //credentials: 'include' is used to send cookies
                const response = await axios.get(`${server}/api/v1/plan`
                , { withCredentials: true }
                );
                console.log("response",response.data.data);
                setPlans(response.data.data);
                console.log("plansusse",plans.length);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPlans();
    }, []);

    return (
        <div className=' flex flex-row flex-wrap gap-2  justify-center p-3'>
            { plans?.map((plan) => (
                <Card key={plan._id} plan={plan} />
            ))}
        </div>
    );
};

export default Plans;
