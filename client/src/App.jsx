import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Plans from "./component/Plans";
import Checkout from "./component/Checkout";



function App() {
  return <div className="  w-full ">
  {/* navbar */}
  <Navbar/>

{/* routes */}

<Routes>
  
  <Route path="/login" element={<Login/>}/>
 <Route path="/" element={<Home/>}/>
 <Route path="/plans" element={<Plans/>}/>
  <Route path="/cart" element={<Checkout/>}/>

<Route path="/success" element={<p>Payment successful</p>}/>
<Route path="/cancel" element={<p>Payment cancelled</p>}/>
   <Route path="*" element={<p>Page not found</p>}/>        
      
</Routes>
 </div>
;
}

export default App;
