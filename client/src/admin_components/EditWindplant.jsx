import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const EditWindplant = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const userid = useSelector((state) => state?.user?.currentUser?.userid);

    const now = moment().format("YYYY-MM-DD HH:mm");

    const [formData, setFormData] = useState({
        plantid:null,
        windspeed: null,
        turbineefficiency: null,
        capacityfactor: null,
        turbinerotordiameter: null,
        hubheight: null,
        turbineavailability: null,
        modifiedat: now,
        createdby: userid
    });
    const [powerplant, setPowerplant] = useState([]);

    const fetchPowerplant = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/powerplant/getDetails`);
            const data = await res.json();

            const matchedPlant = data.data.filter((plant) => plant.type == "wind");
            console.log("matchedPlant", matchedPlant);
            setPowerplant(matchedPlant);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchWindplant = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/wind/getdetails`);
            const data = await res.json();
            
            console.log("Fetched data:", data); // Log the entire data object
            
            // Ensure data.data is an array
            const dataArray = Array.isArray(data.data) ? data.data : [data.data];
    
            const matchedPlant = dataArray.find((plant) => plant.windpowerplantid == id);
            console.log("Matched Plant:", matchedPlant);
            
            if (matchedPlant) {
                setFormData({
                    windpowerplantid: matchedPlant.windpowerplantid,
                    plantid: matchedPlant.plantid,
                    windspeed: matchedPlant.windspeed,
                    turbineefficiency: matchedPlant.turbineefficiency,
                    capacityfactor: matchedPlant.capacityfactor,
                    turbinerotordiameter: matchedPlant.turbinerotordiameter,
                    hubheight: matchedPlant.hubheight,
                    turbineavailability: matchedPlant.turbineavailability,
                    modifiedat: now,
                    createdby: userid
                });
            }
        } catch (err) {
            console.error("Error fetching wind plant details:", err);
        }
    };       

    useEffect(() => {
        fetchPowerplant();
        fetchWindplant();
    }, []);

    const handleChange = (e) => {
        if(e.target.id == 'plantid' || e.target.id == 'windspeed' || e.target.id == 'turbineefficiency' || e.target.id == 'capacityfactor' || e.target.id == 'turbinerotordiameter' || e.target.id == 'hubheight' || e.target.id == 'turbineavailability') {
            setFormData({
                ...formData,
                [e.target.id]: parseInt(e.target.value, 10)
            });
            return
        }

        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/wind/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.status === 'true') {
                toast.success("Details updated Successfully", { duration: 3000 });
                navigate("/");
            } else if (data.status === 'false') {
                toast.error("Error updated details", { duration: 3000 });
            }
        } catch (err) {
            console.log(err);
            toast.error("Error updated details", { duration: 3000 });
        }
    };

    return (
        <div>
            <Toaster />
            <div className="absolute inset-0 bg-black">
            <img 
              src={'https://firebasestorage.googleapis.com/v0/b/purewatt-62253.appspot.com/o/purewatt.png?alt=media&token=079def2f-5115-452d-aef2-035a58556eb3'}
              className="h-screen w-screen object-cover opacity-40"
              alt = "Background" />   
            </div>
            <div>
                <form onSubmit={handleSubmit} className="w-11/12 md:w-4/12 absolute p-8 mt-3 text-center bg-black bg-opacity-80 rounded-sm my-auto mx-auto right-0 left-0 text-white">
                    <h1 className="m-2 font-bold text-3xl py-4">Update data for wind plant</h1>
                    <select id="plantid" onChange={handleChange} required className="p-4 m-2 w-full rounded-md bg-black border border-white text-white" value={formData.plantid}>
                        <option value="">Select Powerplant</option>
                        {powerplant.map((plant) => (
                            <option key={plant.powerplantid} value={plant.powerplantid}>{plant.name}</option>
                        ))}
                    </select>
                    <input type="text" placeholder="windspeed" id="windspeed" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.windspeed}/>
                    <input type="text" placeholder="turbineefficiency" id="turbineefficiency"  onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.turbineefficiency} />
                    <input type="text" placeholder="capacityfactor" id="capacityfactor" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.capacityfactor} />
                    <input type="text" placeholder="turbinerotordiameter" id="turbinerotordiameter" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.turbinerotordiameter} />
                    <input type="text" placeholder="hubheight" id="hubheight"  onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.hubheight} />
                    <input type="text" placeholder="turbineavailability" id="turbineavailability"  onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.turbineavailability} />
            
                    <button type="submit" className="p-4 mb-5 m-2 rounded-md bg-dark_green w-full">Create</button>
                </form>
            </div>
        </div>
    );
};

export default EditWindplant;