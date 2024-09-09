import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Powerplant=()=>{

    const navigate=useNavigate();
    const userid=useSelector((state)=>state?.user?.currentUser?.userid);
    //console.log(userid);

    const now=moment().format("YYYY-MM-DD HH:mm");

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        type: "",
        installedcapacitymw: null,
        startdate: "",
        ownedby: "",
        createdby:userid,
        modifiedat: now,
        plantmanagerid:userid
    });

    const handleChange = (e) => {
        if(e.target.id==="installedcapacitymw") {
            setFormData({
                ...formData,
                [e.target.id]: parseInt(e.target.value)
            });
        }
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try{
            const res=await fetch("http://localhost:5000/api/powerplant/create",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(formData)
            });

            const data=await res.json();
            if(data.status==='true') {
                toast.success("Powerplant Created Successfully", {duration: 3000});
                navigate("/")
            } else if(data.status==='false') {
                toast.error("Error Creating Powerplant", {duration: 3000});
            }
        }
        catch(err){
            console.log(err);
            toast.error("Error Creating Powerplant", {duration: 3000});
        }
    }

    return(
        <div>
            <div className="absolute inset-0 bg-black">
            <img 
              src={'https://firebasestorage.googleapis.com/v0/b/purewatt-62253.appspot.com/o/purewatt.png?alt=media&token=079def2f-5115-452d-aef2-035a58556eb3'}
              className="h-screen w-screen object-cover opacity-40"
              alt = "Background" />   
            </div>
            <div>
                <form onSubmit={handleSubmit} className="w-11/12 md:w-4/12 absolute p-8 mt-10 bg-black bg-opacity-80 rounded-sm my-auto mx-auto right-0 left-0 text-white">
                    <h1 className="m-2 font-bold text-3xl text-center py-4">Powerplant</h1>
                    <input type="text" placeholder="Powerplant Name" id="name" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white"/>
                    <input type="text" placeholder="Powerplant Location" id="location" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white"/>
                    <select id="type" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-black border border-white text-white">
                        <option value="solar">Solar</option>
                        <option value="wind">Wind</option>
                        <option value="hydro">Hydro</option>
                        <option value="geothermal">Geo-thermal</option>
                    </select>
                    <input type="text" placeholder="Installed Capacity (in MW)" id="installedcapacitymw" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white"/>
                    <input type="text" placeholder="Start Date" id="startdate" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white"/>
                    <input type="text" placeholder="Owned By" id="ownedby" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white"/>

                    <button type="submit" className="p-4 mb-5 m-2 rounded-md bg-dark_green w-full">Create</button>
                </form>
            </div>
        </div>
    )
}

export default Powerplant;