import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Windplant = () => {
    const navigate = useNavigate();
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
            console.log(data.data);

            const matchedPlant = data.data.filter((plant) => plant.type == "wind");
            setPowerplant(matchedPlant);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPowerplant();
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
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/wind/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.status === 'true') {
                toast.success("Details Created Successfully", { duration: 3000 });
                navigate("/");
            } else if (data.status === 'false') {
                toast.error("Error Creating details", { duration: 3000 });
            }
        } catch (err) {
            console.log(err);
            toast.error("Error Creating details", { duration: 3000 });
        }
    };

    return (
        <div>
            <Toaster />
            <h1 className="m-2 font-bold text-3xl py-4">Add data for wind plant</h1>
            <div>
                <form onSubmit={handleSubmit} className="w-11/12 md:w-4/12 absolute p-12 bg-black bg-opacity-80 rounded-sm my-auto mx-auto right-0 left-0 text-white">
                    <select id="plantid" onChange={handleChange} required className="p-4 m-2 w-full rounded-md bg-transparent border border-white">
                        <option value="">Select Powerplant</option>
                        {powerplant.map((plant) => (
                            <option key={plant.powerplantid} value={plant.powerplantid}>{plant.name}</option>
                        ))}
                    </select>
                    <input type="text" placeholder="windspeed" id="windspeed" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />
                    <input type="text" placeholder="turbineefficiency" id="turbineefficiency"  onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />
                    <input type="text" placeholder="capacityfactor" id="capacityfactor" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />
                    <input type="text" placeholder="turbinerotordiameter" id="turbinerotordiameter" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />
                    <input type="text" placeholder="hubheight" id="hubheight"  onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />
                    <input type="text" placeholder="turbineavailability" id="turbineavailability"  onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />
            
                    <button type="submit" className="p-4 mb-5 m-2 rounded-md bg-green-600 w-full">Create</button>
                </form>
            </div>
        </div>
    );
};

export default Windplant;