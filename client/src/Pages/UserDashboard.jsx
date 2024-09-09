import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const UserDashboard = () => {
    const userid = useSelector(state => state.user.currentUser.userid); // Get userid from Redux
    const [funding, setFunding] = useState([]);
    const [powerPlants, setPowerPlants] = useState([]);
    const [proposals, setProposals] = useState([]);

    // Fetch fundingreceived data
    const fetchFunding = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/financialparams/getDetails`);
            const data = await res.json();
            // Filter by userid to get only the current user's funding details
            const filteredFunding = data.data.filter(f => f.userid === userid);
            setFunding(filteredFunding);
        } catch (err) {
            console.log("Error fetching funding data", err);
        }
    };

    // Fetch powerplant data
    const fetchPowerPlants = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/powerplant/getDetails`);
            const data = await res.json();
            // Filter by userid to get only the current user's power plants
            const filteredPowerPlants = data.data.filter(p => p.ownedby === userid);
            setPowerPlants(filteredPowerPlants);
        } catch (err) {
            console.log("Error fetching powerplant data", err);
        }
    };

    // Fetch proposal data
    const fetchProposals = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/proposal/getDetails`);
            const data = await res.json();
            // Filter by userid to get only the current user's proposals
            const filteredProposals = data.data.filter(pr => pr.createdby === userid);
            setProposals(filteredProposals);
        } catch (err) {
            console.log("Error fetching proposal data", err);
        }
    };

    useEffect(() => {
        fetchFunding();
        fetchPowerPlants();
        fetchProposals();
    }, [userid]);

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-8">User Dashboard</h1>
            
            {/* Funding Received Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Funded by you</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {funding.length > 0 ? (
                        funding.map(f => (
                            <div key={f.fundingreceivedid} className="bg-white p-4 shadow-lg rounded-md">
                                <h3>Return On Investment: ₹{f.roi}</h3>
                                <p>Revenue Streams: {f.revenuestreams}</p>
                                <p>Invested Date: {f.modifiedat}</p>
                            </div>
                        ))
                    ) : (
                        <p>No funding received data available.</p>
                    )}
                </div>
            </section>

            {/* Powerplants Section */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Power Plants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {powerPlants.length > 0 ? (
                        powerPlants.map(p => (
                            <div key={p.powerplantid} className="bg-white p-4 shadow-lg rounded-md">
                                <h3 className="text-xl font-bold">{p.name}</h3>
                                <p>Location: {p.location}</p>
                                <p>Capacity: {p.installedcapacitymw} MW</p>
                                <p>Type: {p.type}</p>
                            </div>
                        ))
                    ) : (
                        <p>No power plant data available.</p>
                    )}
                </div>
            </section>

            {/* Proposals Section */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Proposals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {proposals.length > 0 ? (
                        proposals.map(pr => (
                            <div key={pr.proposalid} className="bg-white p-4 shadow-lg rounded-md">
                                <h3 className="text-xl font-bold">Location: {pr.location}</h3>
                                <p>Description: {pr.description}</p>
                                <p>Created At: {pr.createdat}</p>
                            </div>
                        ))
                    ) : (
                        <p>No proposal data available.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default UserDashboard;
