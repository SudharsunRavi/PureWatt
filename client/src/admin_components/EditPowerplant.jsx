import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const EditPowerplant=()=>{

    const navigate=useNavigate();
    const userid=useSelector((state)=>state?.user?.currentUser?.userid);
    //console.log(userid);

    const now=moment().format("YYYY-MM-DD HH:mm");
    const {id}=useParams();

    const [formData, setFormData] = useState({
        powerplantid: id,
        name: "",
        location: "",
        type: "",
        installedcapacitymw: "",
        startdate: "",
        ownedby: "",
        createdby:userid,
        modifiedat: now,
        plantmanagerid:userid
    });

    const fetchPowerplantDetails = async() => {
        try{
            const res=await fetch("http://localhost:5000/api/powerplant/getdetails", {
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                }
            });
            const data = await res.json();
            //console.log("Fetched Data:", data.data);
    
            const matchedData = data?.data?.find((item) => item.powerplantid == id);
            //console.log("Matched Powerplant Data:", matchedData);
    
            if (matchedData) {
                setFormData({
                    name: matchedData.name || "",
                    location: matchedData.location || "",
                    type: matchedData.type || "",
                    installedcapacitymw: matchedData.installedcapacitymw || "",
                    startdate: matchedData.startdate || "",
                    ownedby: matchedData.ownedby || "",
                    createdby: userid,
                    modifiedat: now,
                    plantmanagerid: userid,
                    powerplantid: id
                });
            } else {
                toast.error("No matching Powerplant found", { duration: 3000 });
            }
        }
        catch(err){
            console.log(err);
            toast.error("Error Fetching Powerplant Details", {duration: 3000});
        }
    };
    
    useEffect(() => {
        fetchPowerplantDetails();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try{
            const res=await fetch("http://localhost:5000/api/powerplant/update",{
                method: "PUT",
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
            <h1 className="m-2 font-bold text-3xl py-4">Powerplant</h1>
            <div>
                <form onSubmit={handleSubmit} className="w-11/12 md:w-4/12 absolute p-12 bg-black bg-opacity-80 rounded-sm my-auto mx-auto right-0 left-0 text-white">
                    <input type="text" placeholder="Powerplant Name" id="name" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.name}/>
                    <input type="text" placeholder="Powerplant Location" id="location" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.location}/>
                    <select id="type" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white text-black" value={formData.type}>
                        <option value="solar">Solar</option>
                        <option value="wind">Wind</option>
                        <option value="hydro">Hydro</option>
                        <option value="geothermal">Geo-thermal</option>
                    </select>
                    <input type="text" placeholder="Installed Capacity (in MW)" id="installedcapacitymw" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.installedcapacitymw}/>
                    <input type="text" placeholder="Start Date" id="startdate" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.startdate}/>
                    <input type="text" placeholder="Owned By" id="ownedby" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.ownedby}/>

                    <button type="submit" className="p-4 mb-5 m-2 rounded-md bg-green-600 w-full">Create</button>
                </form>
            </div>
        </div>
    )
}

export default EditPowerplant;