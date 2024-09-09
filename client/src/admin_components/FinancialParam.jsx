import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const FinancialParam = () => {
    const navigate = useNavigate();
    const userid = useSelector((state) => state?.user?.currentUser?.userid);

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

    const fetchPowerplant = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/powerplant/getdetails`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            console.log(data);
            setPowerplantDetails(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPowerplant();
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
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/financialparams/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.status === 'true') {
                toast.success("Financial Parameters Created Successfully", { duration: 3000 });
                navigate("/");
            } else if (data.status === 'false') {
                toast.error("Error Creating Financial Parameters", { duration: 3000 });
            }
        } catch (err) {
            console.log(err);
            toast.error("Error Creating Financial Parameters", { duration: 3000 });
        }
    };

    return (
        <div>
            <Toaster />
            <h1 className="m-2 font-bold text-3xl py-4">Enter Finanical details</h1>
            <div>
                <form onSubmit={handleSubmit} className="w-11/12 md:w-4/12 absolute p-12 bg-black bg-opacity-80 rounded-sm my-auto mx-auto right-0 left-0 text-white">
                    <select id="plantid" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white text-black">
                        <option value="">Select Powerplant</option>
                        {powerplantDetails.map((powerplant) => {
                            return <option key={powerplant.powerplantid} value={powerplant.powerplantid}>{powerplant.name}</option>
                        })}
                    </select>
                    <input type="number" placeholder="capex" id="capex" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />
                    <input type="number" placeholder="opex" id="opex" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />
                    <input type="number" placeholder="lcoe" id="lcoe" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />
                    <input type="number" placeholder="paybackperiod" id="paybackperiod" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />
                    <input type="number" placeholder="roi" id="roi" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />
                    <input type="text" placeholder="revenuestreams" id="revenuestreams" onChange={handleChange} required autoComplete="off" className="p-4 m-2 w-full rounded-md bg-transparent border border-white" />

                    <button type="submit" className="p-4 mb-5 m-2 rounded-md bg-green-600 w-full">Create</button>
                </form>
            </div>
        </div>
    );
};

export default FinancialParam;