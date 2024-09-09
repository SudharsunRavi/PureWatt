import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Typography, Card, Tabs } from "antd";
import moment from "moment";

const { Title } = Typography;
const { TabPane } = Tabs;

const UserDashboard = () => {
    const userid = useSelector(state => state.user.currentUser.userid); // Get userid from Redux
    const [funding, setFunding] = useState([]);
    const [powerPlants, setPowerPlants] = useState([]);
    const [proposals, setProposals] = useState([]);

    // Fetch funding received data
    const fetchFunding = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/financialparams/getDetails`);
            const data = await res.json();
            const filteredFunding = data.data.filter(f => f.userid === userid);
            setFunding(filteredFunding);
        } catch (err) {
            console.log("Error fetching funding data", err);
        }
    };

    // Fetch power plant data
    const fetchPowerPlants = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/powerplant/getDetails`);
            const data = await res.json();
            const filteredPowerPlants = data.data.filter(p => p.ownedby === userid);
            setPowerPlants(filteredPowerPlants);
        } catch (err) {
            console.log("Error fetching power plant data", err);
        }
    };

    // Fetch proposal data
    const fetchProposals = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/proposal/getDetails`);
            const data = await res.json();
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

    // Define columns for the Ant Design Table
    const fundingColumns = [
        { title: 'Return On Investment', dataIndex: 'roi', key: 'roi' },
        { title: 'Revenue Streams', dataIndex: 'revenuestreams', key: 'revenuestreams' },
        { title: 'Invested Date', dataIndex: 'modifiedat', key: 'modifiedat', render: text => moment(text).format('YYYY-MM-DD') }
    ];

    const powerPlantColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Capacity (MW)', dataIndex: 'installedcapacitymw', key: 'installedcapacitymw' },
        { title: 'Type', dataIndex: 'type', key: 'type' }
    ];

    const proposalColumns = [
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Created At', dataIndex: 'createdat', key: 'createdat', render: text => moment(text).format('YYYY-MM-DD') }
    ];

    return (
        <div className="p-8">
            <Title level={1} className="mb-8">User Dashboard</Title>

            <Tabs defaultActiveKey="1" className="ant-tabs-card">
                {/* Funding Tab */}
                <TabPane tab="Funding" key="1">
                    <Card>
                        {funding.length > 0 ? (
                            <Table
                                columns={fundingColumns}
                                dataSource={funding}
                                rowKey="fundingreceivedid"
                                pagination={false}
                            />
                        ) : (
                            <p>No funding received data available.</p>
                        )}
                    </Card>
                </TabPane>

                {/* Power Plants Tab */}
                <TabPane tab="Power Plants" key="2">
                    <Card>
                        {powerPlants.length > 0 ? (
                            <Table
                                columns={powerPlantColumns}
                                dataSource={powerPlants}
                                rowKey="powerplantid"
                                pagination={false}
                            />
                        ) : (
                            <p>No power plant data available.</p>
                        )}
                    </Card>
                </TabPane>

                {/* Proposals Tab */}
                <TabPane tab="Proposals" key="3">
                    <Card>
                        {proposals.length > 0 ? (
                            <Table
                                columns={proposalColumns}
                                dataSource={proposals}
                                rowKey="proposalid"
                                pagination={false}
                            />
                        ) : (
                            <p>No proposal data available.</p>
                        )}
                    </Card>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default UserDashboard;
