import landingPage from "../assets/Landing.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
            <img src={landingPage} alt="landing page" className="h-full w-full  object-cover" />
            {/* button to view plan */}
            <button
                onClick={() => navigate("/plans")}
                className="absolute top-25 p-2   bg-blue-700 text-white rounded hover:bg-blue-600 transition"
            >
                View Plans
            </button>
        </div>
    );
};

export default Home;
