import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const EditFinancialParam = () => {
    const navigate = useNavigate();
    const userid = useSelector((state) => state?.user?.currentUser?.userid);
    const { id } = useParams();
    //console.log(id);
    const now = moment().format("YYYY-MM-DD HH:mm");

    const [formData, setFormData] = useState({
        plantid: null,
        capex: null,
        opex: null,
        lcoe: null,
        paybackperiod: null,
        roi: "",
        revenuestreams: userid,
        modifiedat: now,
        createdby: userid
    });

    const [powerplantDetails, setPowerplantDetails] = useState([]);
    const [financialParams, setFinancialParams] = useState([]);
    
    const fetchPowerplant = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/powerplant/getdetails`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            //console.log(data);
            setPowerplantDetails(data.data);
        } catch (err) {
            console.log(err);
        }
    };
    
    const fetchFinancialParams = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/financialparams/getdetails`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            //console.log(data.data);
            const matchedData = data?.data?.find((item) => item.financialparametersid == id);
            //console.log(matchedData);
            if (matchedData) {
                setFormData({
                    plantid: matchedData.plantid || "",
                    capex: matchedData.capex || "",
                    opex: matchedData.opex || "",
                    lcoe: matchedData.lcoe || "",
                    paybackperiod: matchedData.paybackperiod || "",
                    roi: matchedData.roi || "",
                    revenuestreams: matchedData.revenuestreams || "",
                    modifiedat: now,
                    createdby: userid,
                    financialparametersid: id
                });
            } else {
                toast.error("No matching Financial Parameters found", { duration: 3000 });
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPowerplant();
        fetchFinancialParams();
    }, []);
    
    const handleChange = (e) => {
        if (e.target.id === 'capex' || e.target.id === 'opex' || e.target.id === 'lcoe' || e.target.id === 'paybackperiod' || e.target.id === 'roi' || e.target.id === 'plantid') {
            setFormData({
                ...formData,
                [e.target.id]: parseInt(e.target.value, 10)
            });
            return;
        }
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/financialparams/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.status === 'true') {
                toast.success("Financial Parameters Updated Successfully", { duration: 3000 });
                navigate("/");
            } else if (data.status === 'false') {
                toast.error("Error updating Financial Parameters", { duration: 3000 });
            }
        } catch (err) {
            console.log(err);
            toast.error("Error updating Financial Parameters", { duration: 3000 });
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
                <form onSubmit={handleSubmit} className="w-11/12 md:w-4/12 absolute p-8 mt-3 bg-black bg-opacity-80 rounded-sm mx-auto right-0 left-0 text-white">
                    <h1 className="m-2 font-bold text-3xl text-center py-4">Edit Finanical details</h1>
                    <select id="plantid" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-black border border-white text-white" value={formData.plantid}>
                        <option value="">Select Powerplant</option>
                        {powerplantDetails.map((powerplant) => {
                            return <option key={powerplant.powerplantid} value={powerplant.powerplantid}>{powerplant.name}</option>
                        })}
                    </select>
                    <input type="number" placeholder="capex" id="capex" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.capex}/>
                    <input type="number" placeholder="opex" id="opex" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.opex}/>
                    <input type="number" placeholder="lcoe" id="lcoe" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.lcoe}/>
                    <input type="number" placeholder="paybackperiod" id="paybackperiod" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.paybackperiod}/>
                    <input type="number" placeholder="roi" id="roi" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.roi}/>
                    <input type="text" placeholder="revenuestreams" id="revenuestreams" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" value={formData.revenuestreams}/>

                    <button type="submit" className="p-4 mb-5 m-2 rounded-md bg-dark_green w-full">Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditFinancialParam;