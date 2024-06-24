import React from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {userExists} from '../reduxslice/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';




const Navbar = () => {
   
    const isSmallScreen = useMediaQuery('(max-width:640px)');
    const isUser= useSelector(state => state.auth.user);
    console.log(isUser);
    console.log(isSmallScreen);
    const naviagte=useNavigate();
    const dispatch=useDispatch();


    const logoutHandler=()=>{
          dispatch(userExists(null));
          naviagte('/login');
          localStorage.removeItem('rocket-data');
    }

return (
    <div className=' bg-blue-500  items-center h-[4rem]  p-5'>
        <div className=' flex  justify-between'>
            <Link to="/">
                EVETUALS
            </Link>
<div className=' flex gap-4  items-center'>
               {isUser && <img src={`${isUser?.avatar.url}`} alt="instagram" className="h-10 w-10  rounded "/>
}
            <p>{isUser?.name}</p>

            {
    isUser &&
    <Link to="/cart">
        <p className=' bg-blue-900 rounded-md p-1 text-white'>cart</p></Link>
}
             {
                isUser ?<button onClick={logoutHandler}>Logout</button> : <Link to="/login">Login</Link>
             }
            
            </div>
        </div>

    </div>
)

    
    //create a navbar using tailwind
   
};

export default Navbar;
