import { Link } from "react-router-dom";

const Register = () => {

  return (
    <div>
        <div className="absolute inset-0 bg-black">
            <img 
              src={'https://firebasestorage.googleapis.com/v0/b/purewatt-62253.appspot.com/o/purewatt.png?alt=media&token=079def2f-5115-452d-aef2-035a58556eb3'}
              className="h-screen w-screen object-cover opacity-40"
              alt = "Background" />   
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" w-11/12 md:w-4/12 absolute p-12 bg-black bg-opacity-80 rounded-sm my-[35px] mx-auto right-0 left-0 text-white"
        >
          <h1 className="m-2 font-bold text-3xl py-4">{"Register"}</h1>

            <input 
              type="text"
              placeholder="Name"
              className="p-4 m-2 w-full rounded-md bg-transparent border border-white" 
              required
              autoComplete="off"
            />
            <input 
              type="text" 
              placeholder="Email Address" 
              className="p-4 m-2 w-full rounded-md bg-transparent border border-white"
              required
              autoComplete="off"
            />
            <input 
              type="text" 
              placeholder="Phone Number" 
              className="p-4 m-2 w-full rounded-md bg-transparent border border-white"
              required
              autoComplete="off"
            />
            <input 
              type="text" 
              placeholder="City" 
              className="p-4 m-2 w-full rounded-md bg-transparent border border-white"
              autoComplete="off"
            />
            <input 
              type="text" 
              placeholder="Pincode" 
              className="p-4 m-2 w-full rounded-md bg-transparent border border-white"
              autoComplete="off"
            />
            <input 
              type="password"
              placeholder="Password"
              className="p-4 m-2 w-full rounded-md bg-transparent border border-white"
              autoComplete="off"
            />
            <input 
              type="password"
              placeholder="Confirm Password"
              className="p-4 m-2 w-full rounded-md bg-transparent border border-white"
              autoComplete="off"
            />
            <button 
              className="p-4 mb-5 m-2 rounded-md bg-green-600 w-full" 
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
