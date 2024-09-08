import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/userslice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/login`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      //console.log(data);
      dispatch(login(data.userInfo));
      navigate("/");
      if(data.status === 'true') toast.success("Login Successful", {duration: 3000});
    } catch (error) {
      console.log(error);
      toast.error("Login Failed", {duration: 3000});
    }
  };

  return (
    <div>
      <Toaster/>
        <div className="absolute inset-0 bg-black">
            <img 
              src={'https://firebasestorage.googleapis.com/v0/b/purewatt-62253.appspot.com/o/purewatt.png?alt=media&token=079def2f-5115-452d-aef2-035a58556eb3'}
              className="h-screen w-screen object-cover opacity-40"
              alt = "Background" />   
        </div>
        <form
          onSubmit={handleSubmit}
          className=" w-11/12 md:w-4/12 absolute p-12 bg-black bg-opacity-80 rounded-sm my-[200px] mx-auto right-0 left-0 text-white"
        >
          <h1 className="m-2 font-bold text-3xl py-4">{"Login"}</h1>

            <input 
              type="text" 
              id="email"
              placeholder="Email Address" 
              className="p-4 m-2 w-full rounded-md bg-transparent border border-white"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
            />
            <input 
              type="password"
              id="password"
              placeholder="Password"
              className="p-4 m-2 w-full rounded-md bg-transparent border border-white"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
            />
            <button 
              className="p-4 mb-5 m-2 rounded-md bg-green-600 w-full" 
            >
                {"Login"}
            </button>

            <span className="m-2">{"New to PureWatt? "}</span>
            <span className="cursor-pointer text-sm md:text-lg font-bold"><Link to="/register" className="underline">{"Register"}</Link></span>

        </form>
    </div>
  );
};

export default Login;
