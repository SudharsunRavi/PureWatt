import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const now = moment().format("YYYY-MM-DD HH:mm");
  const navigate = useNavigate();

  const [passwordValidation, setPasswordValidation] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    city: "",
    pincode: "",
    role: "user",
    password: "",
    createdat: now,
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(formData.phonenumber.length !== 10) {
      toast.error("Phone number should be 10 digits", {duration: 3000});
      return;
    }

    if(formData.password !== passwordValidation) {
      toast.error("Passwords do not match", {duration: 3000});
      return;
    }

    try {
      const res=await fetch(`${import.meta.env.VITE_BASE_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if(data.status === 'true') toast.success("Registration Successful. Login to continue", {duration: 3000});
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error, {duration: 3000});
    }
  }

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
          className="w-11/12 md:w-4/12 absolute p-4 bg-black bg-opacity-80 rounded-sm mx-auto right-0 left-0 text-white"
        >
          <h1 className="m-2 font-bold text-3xl py-4">{"Register"}</h1>

            <input 
              type="text"
              placeholder="Name"
              className="p-4 m-2 w-11/12 rounded-md bg-transparent border border-white" 
              required
              autoComplete="off"
              id="name"
              onChange={handleChange}
            />
            <input 
              type="text" 
              placeholder="Email Address" 
              className="p-4 m-2 w-11/12 rounded-md bg-transparent border border-white"
              required
              autoComplete="off"
              id="email"
              onChange={handleChange}
            />
            <input 
              type="text" 
              placeholder="Phone Number" 
              className="p-4 m-2 w-11/12 rounded-md bg-transparent border border-white"
              required
              autoComplete="off"
              id="phonenumber"
              onChange={handleChange}
            />
            <input 
              type="text" 
              placeholder="City" 
              className="p-4 m-2 w-11/12 rounded-md bg-transparent border border-white"
              autoComplete="off"
              id="city"
              onChange={handleChange}
            />
            <input 
              type="text" 
              placeholder="Pincode" 
              className="p-4 m-2 w-11/12 rounded-md bg-transparent border border-white"
              autoComplete="off"
              id="pincode"
              onChange={handleChange}
            />
            <input 
              type="password"
              placeholder="Password"
              className="p-4 m-2 w-11/12 rounded-md bg-transparent border border-white"
              autoComplete="off"
              required
              onChange={(e)=>setPasswordValidation(e.target.value)}
            />
            <input 
              type="password"
              placeholder="Confirm Password"
              className="p-4 m-2 w-11/12 rounded-md bg-transparent border border-white"
              autoComplete="off"
              required
              id="password"
              onChange={handleChange}
            />
            <button 
              className="p-4 mb-5 m-2 rounded-md bg-green w-11/12" 
            >
                {"Register"}
            </button>

            <span className="m-2">{"Already Registered? "}</span>
            <span className="cursor-pointer text-sm md:text-lg font-bold"><Link to="/login" className="underline">{"Login"}</Link></span>

        </form>
    </div>
  );
};

export default Register;
